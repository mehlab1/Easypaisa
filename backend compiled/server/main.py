from fastapi import FastAPI, UploadFile, File, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import uvicorn
import pandas as pd
import numpy as np
import joblib
import pickle
import json
import os
import io
import requests
from geopy.distance import geodesic
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline
import nest_asyncio

# Apply asyncio patch for Jupyter/interactive use
nest_asyncio.apply()

# Initialize the main FastAPI app
app = FastAPI(
    title="Easypaisa Backend API",
    description="Unified API for all Easypaisa backend services",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# SENTIMENT ANALYSIS MODULE
# ============================================================================

# Load sentiment analysis models
analyzer = SentimentIntensityAnalyzer()
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

# High-level categories and urgency mapping
categories = ["App Performance", "Payment Issue", "Customer Support", "Rewards", "General"]
urgency_map = {
    "Payment Issue": "High",
    "App Performance": "Medium",
    "Rewards": "Low",
    "Customer Support": "High",
    "General": "Low"
}

def analyze_feedback(file_bytes):
    df = pd.read_csv(io.BytesIO(file_bytes))
    df = df[df["Feedback"].notna() & df["Feedback"].str.strip().ne("")].copy()
    
    # Sentiment analysis
    df["Sentiment"] = df["Feedback"].apply(
        lambda text: "Positive" if analyzer.polarity_scores(str(text))["compound"] >= 0 else "Negative"
    )
    
    # Filter negative feedback
    negative_df = df[df["Sentiment"] == "Negative"].copy()
    
    # Classify into categories
    def classify(text):
        result = classifier(text, categories)
        return result["labels"][0]
    
    negative_df["Category"] = negative_df["Feedback"].apply(classify)
    negative_df["Urgency"] = negative_df["Category"].map(urgency_map)
    
    # Summary
    summary = (
        negative_df.groupby(["Urgency", "Category"])
        .size()
        .reset_index(name="Count")
        .to_dict(orient="records")
    )
    
    # Detailed feedbacks
    feedbacks = negative_df[["Feedback", "Category", "Urgency"]].to_dict(orient="records")
    
    return {"summary": summary, "negative_feedbacks": feedbacks}

@app.post("/api/sentiment/analyze-feedback")
async def upload_csv(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        return JSONResponse(content={"error": "Only CSV files are supported."}, status_code=400)
    try:
        content = await file.read()
        result = analyze_feedback(content)
        return result
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# ============================================================================
# NEXT BEST ACTION MODULE
# ============================================================================

# Load NBA models (with error handling)
try:
    nba_model = joblib.load("models/nextbestaction/nba_model.pkl")
    action_encoder = joblib.load("models/nextbestaction/action_encoder.pkl")
    feature_encoders = joblib.load("models/nextbestaction/feature_encoders.pkl")
    
    with open("models/nextbestaction/action_messages.json", "r") as f:
        action_templates = json.load(f)
except Exception as e:
    print(f"Warning: NBA models not loaded: {e}")
    nba_model = None
    action_encoder = None
    feature_encoders = None
    action_templates = {}

categorical_cols = ['preferred_language', 'region', 'device_type', 'day_of_week', 'recent_event']
feature_columns = [
    'age', 'days_since_last_login', 'session_time',
    'has_active_loan', 'loan_amount', 'clicked_offer_last_month',
    'loan_repayment_score', 'data_usage_last_month', 'calls_made_last_week',
    'is_frequent_recharger', 'is_data_heavy_user', 'days_until_bill_due',
    'preferred_language', 'region', 'device_type',
    'day_of_week', 'last_active_hour', 'recent_event',
]

class UserFeatures(BaseModel):
    age: int
    days_since_last_login: int
    session_time: int
    has_active_loan: int
    loan_amount: int
    clicked_offer_last_month: int
    loan_repayment_score: int
    data_usage_last_month: float
    calls_made_last_week: int
    is_frequent_recharger: int
    is_data_heavy_user: int
    preferred_language: str
    region: str
    device_type: str
    day_of_week: str
    last_active_hour: int
    recent_event: str
    days_until_bill_due: int

def generate_dynamic_message(action, user):
    reasoning = []
    msg = ""
    
    if action == "reminder":
        reasoning.append("User has been inactive")
        msg = f"You haven't used the app in {user['days_since_last_login']} days. We miss you!"
    elif action == "cashback_incentive":
        if user['clicked_offer_last_month']:
            reasoning.append("Engaged with previous offers")
            msg = "You unlocked cashback rewards. Redeem them on your next payment."
        else:
            reasoning.append("Potential for offer engagement")
            msg = "Try our latest offers and get instant cashback!"
    elif action == "survey":
        reasoning.append("Recently joined / short tenure")
        msg = f"As a new user, your feedback helps us improve. Fill a 1-min survey and earn 100 points!"
    elif action == "update_profile_prompt":
        reasoning.append("Profile information incomplete")
        msg = f"Keep your Easypaisa profile updated to receive personalized rewards."
    elif action == "preapproved_loan_prompt":
        reasoning.append("Eligible for pre-approved loan")
        msg = f"Based on your score of {user['loan_repayment_score']}, you're eligible for a pre-approved loan."
    elif action == "network_feedback_survey":
        reasoning.append("Recently active in app")
        msg = f"We'd love your feedback on your recent experience with Easypaisa."
    elif action == "winback_offer":
        reasoning.append("Dormant user segment")
        msg = f"Here's a special reactivation offer just for you! Top up now and get 10% bonus."
    elif action == "low_balance_alert":
        reasoning.append("Potential low balance user")
        msg = "Your account balance may run low soon. Top up now to avoid disruption."
    elif action == "bill_due_reminder":
        reasoning.append("Likely bill due based on usage patterns")
        msg = "You may have a bill due. Set a reminder or pay now to avoid late fees."
    elif action == "tailored_subscription_bundle":
        reasoning.append("Eligible for a bundle based on region/device")
        msg = f"Get a special bundle offer tailored for {user['device_type']} users in {user['region']}."
    elif action == "connect_to_customer_support":
        reasoning.append("Recent complaints or app issues detected")
        msg = "Need help? Our support team is available 24/7 to assist you."
    elif action == "show_loan_education":
        reasoning.append("Low loan repayment score or new borrower")
        msg = f"Your current score is {user['loan_repayment_score']}. Learn tips to build a stronger loan profile."
    elif action == "offer":
        reasoning.append("Responds well to promotions")
        msg = "Limited time offer! Recharge now and get up to 15% bonus."
    elif action == "upgrade":
        reasoning.append("Heavy session time or usage")
        msg = f"You've spent {user['session_time']} minutes in the app. Upgrade for enhanced features."
    elif action == "suggest_savings_plan":
        reasoning.append("Opportunity to save based on activity")
        msg = "Start a savings plan with as little as PKR 50/week. Automate and grow your money!"
    elif action == "data_pack_discount_offer":
        reasoning.append("Eligible for special discounted data pack")
        msg = "Enjoy 2GB extra on your next data pack recharge. Exclusive for your usage profile!"
    else:
        msg = "Here's something you might find useful."
        reasoning.append("Matched user behavior")
    
    return {
        "title": f"Personalized {action.replace('_', ' ').title()}",
        "message": msg,
        "reasoning": reasoning,
        "cta": {"button_text": "View Details"},
        "priority_score": 0.8
    }

@app.post("/api/nba/recommend")
def get_recommendation(user: UserFeatures) -> dict:
    if nba_model is None:
        raise HTTPException(status_code=500, detail="NBA models not loaded")
    
    try:
        df = pd.DataFrame([user.dict()])
        
        # Check for missing required columns
        missing_cols = [col for col in feature_columns if col not in df.columns]
        if missing_cols:
            raise ValueError(f"Missing input features: {missing_cols}")
        
        # Encode categorical features
        for col in categorical_cols:
            if col in df.columns and col in feature_encoders:
                encoder = feature_encoders[col]
                try:
                    df[col] = encoder.transform([df[col][0]])
                except ValueError:
                    df[col] = encoder.transform([encoder.classes_[0]])
        
        # Reorder DataFrame columns to match training
        df = df[feature_columns]
        
        # Predict
        action_code = nba_model.predict(df)[0]
        action = action_encoder.inverse_transform([action_code])[0]
        
        # Generate explanation
        response = {"recommended_action": action}
        response.update(generate_dynamic_message(action, user.dict()))
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# LIFE JOURNEY AUTOMATION MODULE
# ============================================================================

# Load lifecycle models
try:
    with open("models/lifejourney/nba_model.pkl", "rb") as f:
        lifecycle_model = pickle.load(f)
    
    with open("models/lifejourney/nba_features.pkl", "rb") as f:
        lifecycle_feature_columns = pickle.load(f)
    
    with open("models/lifejourney/nba_label_encoder.pkl", "rb") as f:
        lifecycle_label_encoder = pickle.load(f)
except Exception as e:
    print(f"Warning: Lifecycle models not loaded: {e}")
    lifecycle_model = None
    lifecycle_feature_columns = None
    lifecycle_label_encoder = None

class UserData(BaseModel):
    age: int
    income: str
    days_since_signup: int
    days_since_last_login: int
    total_app_sessions: int
    has_completed_profile: int
    has_active_loan: int
    loan_amount: int
    clicked_offer_last_month: int
    is_loyalty_member: int

def personalize_message(nba_label, user):
    if nba_label == "alert_unused_feature":
        if user['total_app_sessions'] < 20:
            return "Looks like you haven't explored many features yet. Let's help you get started!"
        else:
            return "You're missing out! Some features haven't been used recently. Come back and check them out."
    elif nba_label == "offer_loan_upgrade":
        if user['loan_amount'] > 250000:
            return "You're eligible for a premium loan upgrade. Get more with better terms today."
        else:
            return "Need a top-up? See if you're eligible for a higher loan limit."
    elif nba_label == "survey_feedback":
        if user['days_since_last_login'] > 40:
            return "We value your feedback! Help us understand how we can win you back."
        else:
            return "Got 30 seconds? Tell us how we're doing so we can serve you better."
    elif nba_label == "offer_cashback":
        if user['clicked_offer_last_month'] == 0:
            return "Cashback awaits! Try using your app now to earn rewards."
        else:
            return "Thanks for engaging! Continue using offers to unlock more cashback."
    elif nba_label == "send_welcome_email":
        return "Welcome aboard! Let's show you how to make the most of Easypaisa."
    elif nba_label == "remind_to_complete_profile":
        if user['has_completed_profile'] == 0:
            return "Complete your profile to unlock personalized offers and better service."
        else:
            return "Looks like your profile is ready — start exploring all features!"
    elif nba_label == "push_usage_tips":
        return "Quick tip! Did you know you can pay bills, send money, and earn rewards all in one app?"
    elif nba_label == "churn_recovery_discount":
        return "We miss you! Enjoy a special discount if you return today. Limited time only!"
    elif nba_label == "loyalty_reward":
        if user['is_loyalty_member'] == 1:
            return "You're a valued member — enjoy your loyalty rewards!"
        else:
            return "Join our loyalty program and earn exclusive perks every month."
    elif nba_label == "recommend_financial_product":
        if user['has_active_loan']:
            return "Based on your usage, we recommend exploring our insurance or savings plans."
        else:
            return "Looking to grow your money? Check out our tailored financial products."
    elif nba_label == "invite_to_webinar":
        return "You're invited to our next live session — learn tips on maximizing your Easypaisa benefits."
    elif nba_label == "congratulatory_message":
        return "Congrats! You've reached a new milestone — thank you for being with us."
    
    return "Here's something you might find useful."

@app.post("/api/lifecycle/predict")
def predict_nba(data: UserData):
    if lifecycle_model is None:
        raise HTTPException(status_code=500, detail="Lifecycle models not loaded")
    
    try:
        # Prepare input
        input_df = pd.DataFrame([data.dict()])
        input_encoded = pd.get_dummies(input_df)
        input_encoded = input_encoded.reindex(columns=lifecycle_feature_columns, fill_value=0)
        
        # Predict
        prediction = lifecycle_model.predict(input_encoded)[0]
        proba = lifecycle_model.predict_proba(input_encoded)[0]
        confidence = round(float(max(proba)), 4)
        nba_label = lifecycle_label_encoder.inverse_transform([prediction])[0]
        
        # Get dynamic message
        message = personalize_message(nba_label, data.dict())
        
        return {
            "next_best_action": nba_label,
            "confidence": confidence,
            "message": message
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# HYPERLOCAL SUGGESTIONS MODULE
# ============================================================================

OVERPASS_API_URL = "https://overpass-api.de/api/interpreter"

# Predefined promotions for specific agents
LOCAL_PROMOS = {
    "EasyPay Shop 1": "10% cashback on bill payments",
    "Unnamed Location": "Rs.50 bonus on mobile top-up",
    "EasyLoad Center G-9": "Free scratch card with transactions above Rs.500"
}

def get_nearby_data(lat: float, lon: float, radius: int = 2000):
    query = f"""
    [out:json][timeout:25];
    (
      node["shop"="convenience"](around:{radius},{lat},{lon});
      node["shop"="mobile_phone"](around:{radius},{lat},{lon});
    );
    out center;
    """
    try:
        response = requests.post(OVERPASS_API_URL, data=query.strip(), timeout=30)
        response.raise_for_status()
        data = response.json()
        
        agents = []
        local_promos = []
        
        for element in data.get("elements", []):
            tags = element.get("tags", {})
            name = tags.get("name", "Unnamed Location")
            agent_lat = element.get("lat")
            agent_lon = element.get("lon")
            
            distance_km = round(geodesic((lat, lon), (agent_lat, agent_lon)).km, 2)
            
            agents.append({
                "name": name,
                "distance_km": distance_km
            })
            
            if name in LOCAL_PROMOS:
                local_promos.append({
                    "name": name,
                    "promo": LOCAL_PROMOS[name]
                })
        
        agents = sorted(agents, key=lambda x: x["distance_km"])
        
        return {
            "agents": agents,
            "local_promos": local_promos
        }
    except Exception as e:
        return {"error": f"Request failed: {e}"}

@app.get("/api/hyperlocal/get-nearby-agents")
def get_agents(lat: float = Query(...), lon: float = Query(...), radius: Optional[int] = 2000):
    result = get_nearby_data(lat, lon, radius)
    return JSONResponse(content=result)

# ============================================================================
# FRAUD DETECTION MODULE
# ============================================================================

class Event(BaseModel):
    user_id: int
    is_known_device: bool
    is_known_location: bool
    hour_of_day: int
    transaction_amount: float
    recipient_flagged: bool
    frequent_user: bool

def predict_anomaly(event_data):
    # Simple rule-based fraud detection
    score = 0.0
    
    # Risk factors
    if not event_data['is_known_device']:
        score += 0.3
    if not event_data['is_known_location']:
        score += 0.3
    if event_data['hour_of_day'] < 6 or event_data['hour_of_day'] > 22:
        score += 0.2
    if event_data['transaction_amount'] > 15000:
        score += 0.4
    if event_data['recipient_flagged']:
        score += 0.5
    if not event_data['frequent_user']:
        score += 0.2
    
    is_anomaly = score > 0.5
    
    return {
        "anomaly_score": score,
        "is_anomaly": is_anomaly
    }

@app.post("/api/fraud/predict")
def detect_fraud(event: Event):
    result = predict_anomaly(event.dict())
    score = result["anomaly_score"]
    is_anomaly = result["is_anomaly"]
    
    # Default
    action = "none"
    message = "No suspicious activity detected. All clear."
    
    if is_anomaly:
        unknown_device = not event.is_known_device
        unknown_location = not event.is_known_location
        odd_hour = event.hour_of_day < 6 or event.hour_of_day > 22
        high_amount = event.transaction_amount > 15000
        flagged_recipient = event.recipient_flagged
        infrequent_user = not event.frequent_user
        
        if score > -0.20:
            action = "alert_user"
            message = "We noticed something unusual. Please confirm this activity."
        elif score > -0.35:
            action = "lock_wallet_temporarily"
            message = "Transaction from an unfamiliar location and device outside usual hours. Wallet temporarily locked for your safety."
        else:
            action = "lock_wallet_and_alert"
            message = "High-risk transaction from unknown device/location. Fraud team has been notified."
        
        # Enrich message
        details = []
        if unknown_device:
            details.append("unknown device")
        if unknown_location:
            details.append("unfamiliar location")
        if odd_hour:
            details.append("unusual time")
        if high_amount:
            details.append("large transaction")
        if flagged_recipient:
            details.append("recipient with prior complaints")
        
        if details:
            message += " Detected: " + ", ".join(details) + "."
    
    # Override: Infrequent user making large transaction
    if not event.frequent_user and event.transaction_amount > 15000:
        action = "lock_wallet_and_alert"
        message = "Infrequent user attempting unusually large transaction. High risk – flagged for manual review."
    
    return {**result, "action": action, "message": message}

# ============================================================================
# FINANCIAL INSIGHTS & BUDGETING MODULE
# ============================================================================

# Load financial data
try:
    financial_df = pd.read_csv("data/user_financial_data.csv")
    financial_df['Date'] = pd.to_datetime(financial_df['Date'])
    financial_df['Month'] = financial_df['Date'].dt.to_period('M')
except Exception as e:
    print(f"Warning: Financial data not loaded: {e}")
    financial_df = None

essential_cats = ['Education', 'Healthcare', 'Utilities']
non_essential_cats = ['Entertainment', 'Food', 'Shopping', 'Transport']

category_tips = {
    "Entertainment": [
        "🎬 Tip: Try free entertainment like community events or YouTube.",
        "🎭 Tip: Rotate only one streaming service per month.",
        "📚 Tip: Join a library or use free audiobooks/podcasts."
    ],
    "Food": [
        "🍽️ Tip: Cook meals in bulk and freeze leftovers.",
        "🛒 Tip: Make a list before grocery shopping to avoid impulse buys.",
        "🥗 Tip: Plan meals weekly to reduce food waste."
    ],
    "Shopping": [
        "🛍️ Tip: Use the 30-day rule before making non-essential purchases.",
        "💳 Tip: Unsubscribe from promotional emails.",
        "📦 Tip: Avoid online shopping during idle time."
    ],
    "Transport": [
        "🚗 Tip: Use carpooling or public transport when possible.",
        "🛠️ Tip: Maintain your vehicle regularly to save on fuel.",
        "🚶 Tip: Walk or bike for short trips."
    ]
}

savings_reminders = [
    "💡 Set an auto-transfer to savings right after payday.",
    "📱 Track your spending weekly using a budget app.",
    "🎯 Keep a photo of your goal to stay motivated.",
    "🔁 Review your expenses monthly to adjust your budget.",
    "📦 Delay big purchases by 30 days to reassess."
]

class BudgetRequest(BaseModel):
    user_id: str
    goal_item: str
    goal_amount: float
    cutdown_percent: float = 10.0

@app.post("/api/financial/budget-summary")
def budget_summary(request: BudgetRequest):
    if financial_df is None:
        raise HTTPException(status_code=500, detail="Financial data not loaded")
    
    user = request.user_id
    goal_item = request.goal_item
    goal_amount = request.goal_amount
    cutdown_percent = request.cutdown_percent / 100.0
    
    user_df = financial_df[financial_df['UserID'] == user]
    if user_df.empty:
        return {"error": "User not found"}
    
    monthly = user_df.groupby(['Month', 'Type'])['Amount (PKR)'].sum().unstack().fillna(0)
    monthly['Savings'] = monthly.get('Income', 0) - monthly.get('Spending', 0)
    actual_avg_savings = monthly['Savings'].mean()
    
    # Category-wise spending
    monthly_cat_spend = user_df[user_df['Type'] == 'Spending'].groupby(['Month', 'Category'])['Amount (PKR)'].sum().unstack().fillna(0)
    avg_spend = monthly_cat_spend.mean()
    latest_month = str(monthly_cat_spend.index.max())
    latest_spending = monthly_cat_spend.loc[monthly_cat_spend.index.max()].to_dict()
    
    # Case 1: Goal can already be met from current savings
    if actual_avg_savings >= goal_amount:
        months_needed = int(np.ceil(goal_amount / actual_avg_savings))
        remaining = goal_amount
        plan = []
        for i in range(1, months_needed + 1):
            this_month = min(actual_avg_savings, remaining)
            plan.append({
                "month": i,
                "save": round(this_month, 2),
                "remaining_after_saving": round(remaining - this_month, 2)
            })
            remaining -= this_month
        
        return {
            "user": user,
            "message": "🎉 Your current savings are already enough to achieve your goal. No need to cut down expenses!",
            "goal": {
                "item": goal_item,
                "amount": goal_amount,
                "actual_avg_savings": round(actual_avg_savings, 2),
                "months_needed": months_needed,
                "savings_plan": plan
            },
            "spending": {
                "average_spending": {cat: round(val, 2) for cat, val in avg_spend.items()},
                "latest_month_spending": {k: round(v, 2) for k, v in latest_spending.items()}
            },
            "reminders": np.random.choice(savings_reminders, 2).tolist()
        }
    
    # Case 2: Need to apply cutdown to meet goal
    reduced_spend = {}
    tips_given = {}
    current_nonessential = 0
    reduced_nonessential = 0
    
    for cat in avg_spend.index:
        orig_amt = avg_spend[cat]
        if cat in non_essential_cats:
            current_nonessential += orig_amt
            reduced_amt = orig_amt * (1 - cutdown_percent)
            reduced_nonessential += reduced_amt
            reduced_spend[cat] = round(reduced_amt, 2)
            tips_given[cat] = np.random.choice(category_tips.get(cat, []), 1).tolist()
        else:
            reduced_spend[cat] = round(orig_amt, 2)
    
    cutdown_savings = current_nonessential - reduced_nonessential
    estimated_total_savings = actual_avg_savings + cutdown_savings
    
    months_needed = int(np.ceil(goal_amount / estimated_total_savings))
    remaining = goal_amount
    savings_plan = []
    for i in range(1, months_needed + 1):
        this_month = min(estimated_total_savings, remaining)
        savings_plan.append({
            "month": i,
            "save": round(this_month, 2),
            "remaining_after_saving": round(remaining - this_month, 2)
        })
        remaining -= this_month
    
    return {
        "user": user,
        "message": "📉 Your current savings are not enough. We've applied a spending cutdown to help you reach your goal.",
        "goal": {
            "item": goal_item,
            "amount": goal_amount,
            "cutdown_percent": request.cutdown_percent,
            "actual_avg_savings": round(actual_avg_savings, 2),
            "new_savings_from_cutdown": round(cutdown_savings, 2),
            "total_estimated_monthly_savings": round(estimated_total_savings, 2),
            "months_needed": months_needed,
            "savings_plan": savings_plan
        },
        "spending": {
            "average_spending": {cat: round(val, 2) for cat, val in avg_spend.items()},
            "reduced_spending": reduced_spend,
            "latest_month_spending": {k: round(v, 2) for k, v in latest_spending.items()}
        },
        "tips": tips_given,
        "reminders": np.random.choice(savings_reminders, 2).tolist()
    }

# ============================================================================
# CREDIT SCORING MODULE
# ============================================================================

# Load credit scoring models
try:
    credit_model = joblib.load("models/credit/credit_score_model.pkl")
    loan_model = joblib.load("models/credit/loan_eligibility_model.pkl")
except Exception as e:
    print(f"Warning: Credit scoring models not loaded: {e}")
    credit_model = None
    loan_model = None

class UserFeatures(BaseModel):
    bill_payment_consistency: float
    mobile_loads_per_month: int
    avg_topup_amount: float
    location_stability_score: float
    daily_location_entropy: float
    device_change_frequency: int

def simulate_lending_decision(user_id: str, credit_score: int, loan_amount: int):
    return {
        "status": "approved",
        "loan_id": f"LN-{user_id[:4].upper()}-{np.random.randint(1000,9999)}",
        "amount": loan_amount
    }

@app.post("/api/credit/score")
def score_user(user: UserFeatures):
    if credit_model is None or loan_model is None:
        raise HTTPException(status_code=500, detail="Credit scoring models not loaded")
    
    try:
        input_data = np.array([[ 
            user.bill_payment_consistency,
            user.mobile_loads_per_month,
            user.avg_topup_amount,
            user.location_stability_score,
            user.daily_location_entropy,
            user.device_change_frequency
        ]])
        
        credit_score = int(credit_model.predict(input_data)[0])
        loan_amount = int(loan_model.predict(input_data)[0])
        
        # Rejection rule
        if credit_score < 600 or loan_amount < 1000:
            return {
                "credit_score": credit_score,
                "loan_eligibility": 0,
                "lending_decision": {
                    "status": "rejected",
                    "reason": "low credit score or insufficient eligibility"
                }
            }
        
        # Otherwise, approve
        decision = simulate_lending_decision("user123", credit_score, loan_amount)
        
        return {
            "credit_score": credit_score,
            "loan_eligibility": loan_amount,
            "lending_decision": decision
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================================
# BEHAVIORAL UI MODULE
# ============================================================================

# Load behavioral UI models
try:
    with open("models/behavioral/model_prioritized.pkl", "rb") as f:
        model_prioritized = pickle.load(f)
    
    with open("models/behavioral/model_ignored.pkl", "rb") as f:
        model_ignored = pickle.load(f)
    
    with open("models/behavioral/encoder_columns.pkl", "rb") as f:
        encoder_columns = pickle.load(f)
    
    with open("models/behavioral/mlb_prioritized.pkl", "rb") as f:
        mlb_prioritized = pickle.load(f)
    
    with open("models/behavioral/mlb_ignored.pkl", "rb") as f:
        mlb_ignored = pickle.load(f)
    
    user_data_df = pd.read_csv("data/mock_clicks.csv")
except Exception as e:
    print(f"Warning: Behavioral UI models not loaded: {e}")
    model_prioritized = None
    model_ignored = None
    encoder_columns = None
    mlb_prioritized = None
    mlb_ignored = None
    user_data_df = None

icons = ["loan_offers", "bill_payments", "qr_payments", "recharge", "donations"]

class UserRequest(BaseModel):
    user_id: str
    recent_action: str

@app.post("/api/behavioral/predict-ui-changes")
def predict_ui_changes(req: UserRequest):
    if model_prioritized is None or user_data_df is None:
        raise HTTPException(status_code=500, detail="Behavioral UI models not loaded")
    
    user_id = req.user_id
    recent_action = req.recent_action
    
    # Lookup user history
    user_row = user_data_df[user_data_df["user_id"] == user_id]
    if user_row.empty:
        raise HTTPException(status_code=404, detail="User not found in history.")
    
    # Append recent_action to the user's row
    user_row = user_row.copy()
    user_row["recent_action"] = recent_action
    
    # One-hot encode the recent action
    df_encoded = pd.get_dummies(user_row[icons + ["recent_action"]], columns=["recent_action"])
    
    # Add any missing encoded columns
    for col in encoder_columns:
        if col not in df_encoded.columns:
            df_encoded[col] = 0
    
    # Reorder columns to match training set
    df_encoded = df_encoded[encoder_columns]
    
    # Predict using models
    pred_p = model_prioritized.predict(df_encoded)
    pred_i = model_ignored.predict(df_encoded)
    
    prioritized_labels = list(mlb_prioritized.inverse_transform(pred_p)[0])
    ignored_labels = list(mlb_ignored.inverse_transform(pred_i)[0])
    
    # Handle overlaps and missing icons
    all_predicted = set(prioritized_labels + ignored_labels)
    missing_icons = [icon for icon in icons if icon not in all_predicted]
    ignored_labels += missing_icons
    prioritized_labels = [icon for icon in prioritized_labels if icon not in ignored_labels]
    
    return {
        "user_id": user_id,
        "behavior": {
            "ignored_sections": ignored_labels,
            "engaged_sections": prioritized_labels
        },
        "recommended_ui_changes": {
            "hide": ignored_labels,
            "prioritize": prioritized_labels,
            "reorder": True
        }
    }

# ============================================================================
# ATTRIBUTES & PERFORMANCE DASHBOARD MODULE
# ============================================================================

# Load dashboard models
try:
    churn_model = joblib.load("models/dashboard/churn_model.pkl")
    ctr_model = joblib.load("models/dashboard/ctr_model.pkl")
    cvr_model = joblib.load("models/dashboard/cvr_model.pkl")
    scaler = joblib.load("models/dashboard/scaler.pkl")
    dashboard_df = pd.read_csv("data/user_data.csv")
except Exception as e:
    print(f"Warning: Dashboard models not loaded: {e}")
    churn_model = None
    ctr_model = None
    cvr_model = None
    scaler = None
    dashboard_df = None

@app.get("/api/dashboard/admin")
def get_dashboard():
    if dashboard_df is None or churn_model is None:
        raise HTTPException(status_code=500, detail="Dashboard models not loaded")
    
    df = dashboard_df.copy()
    
    # Feature engineering
    df["ctr"] = df["clicks"] / df["impressions"]
    df["cvr"] = df["conversions"] / df["clicks"].replace(0, 1)
    
    # Preserve original segments
    original_segments = df["segment"].copy()
    
    # Encode segment
    df_encoded = pd.get_dummies(df, columns=["segment"])
    X = df_encoded.drop(columns=["user_id", "churned", "ctr", "cvr"])
    X_scaled = scaler.transform(X)
    
    # Predictions
    df["churn_risk_score"] = churn_model.predict_proba(X_scaled)[:, 1]
    df["churn_risk"] = df["churn_risk_score"].apply(lambda x: "High" if x > 0.5 else "Low")
    df["predicted_ctr_uplift"] = ctr_model.predict(X_scaled)
    df["predicted_cvr_uplift"] = cvr_model.predict(X_scaled)
    df["segment"] = original_segments  # Restore original segment labels
    
    # Suggestion logic
    def generate_suggestion(row):
        if row["churn_risk"] == "High" and row["predicted_cvr_uplift"] < 0.1:
            return "Push retention campaign"
        elif row["predicted_ctr_uplift"] > 0.3 and row["predicted_cvr_uplift"] > 0.2:
            return "Promote high-performing banner"
        elif row["churn_risk"] == "Low" and row["predicted_cvr_uplift"] < 0.1:
            return "Experiment with CTA wording"
        else:
            return "Maintain current setup"
    
    df["suggested_optimization"] = df.apply(generate_suggestion, axis=1)
    
    # Segment-wise aggregation
    segments_output = []
    for segment_name in df["segment"].unique():
        seg_df = df[df["segment"] == segment_name]
        segments_output.append({
            "name": segment_name,
            "total_users": int(len(seg_df)),
            "click_through_rate": round(seg_df["ctr"].mean(), 2),
            "conversion_rate": round(seg_df["cvr"].mean(), 2),
            "top_action": f"Top Action for {segment_name}",
            "churn_risk": seg_df["churn_risk"].mode()[0],
            "suggested_optimization": seg_df["suggested_optimization"].mode()[0],
            "predicted_ctr_uplift": round(seg_df["predicted_ctr_uplift"].mean(), 3),
            "predicted_cvr_uplift": round(seg_df["predicted_cvr_uplift"].mean(), 3)
        })
    
    # Overall uplift summary
    uplift = {
        "predicted_ctr_uplift": f"{round(df['predicted_ctr_uplift'].mean() * 100, 1)}%",
        "predicted_conversion_uplift": f"{round(df['predicted_cvr_uplift'].mean() * 100, 1)}%",
        "retention_boost": f"{round((1 - df['churn_risk_score'].mean()) * 100, 1)}%"
    }
    
    return {
        "segments": segments_output,
        "overall_personalization_uplift": uplift
    }

# ============================================================================
# HEALTH CHECK ENDPOINT
# ============================================================================

@app.get("/")
def root():
    return {
        "message": "Easypaisa Backend API is running",
        "version": "1.0.0",
        "endpoints": {
            "sentiment": "/api/sentiment/analyze-feedback",
            "nba": "/api/nba/recommend",
            "lifecycle": "/api/lifecycle/predict",
            "hyperlocal": "/api/hyperlocal/get-nearby-agents",
            "fraud": "/api/fraud/predict",
            "financial": "/api/financial/budget-summary",
            "credit": "/api/credit/score",
            "behavioral": "/api/behavioral/predict-ui-changes",
            "dashboard": "/api/dashboard/admin"
        }
    }

# ============================================================================
# RUN THE SERVER
# ============================================================================

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True) 