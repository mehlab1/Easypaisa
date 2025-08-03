# Easypaisa Unified Backend Server

This is a unified FastAPI server that consolidates all the backend modules from the Easypaisa project into a single, easy-to-use API.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Server
```bash
python main.py
```

The server will start on `http://localhost:8000`

### 3. Test the Server
```bash
python test_server.py
```

## 📋 Available API Endpoints

### 1. **Sentiment Analysis** - `/api/sentiment/analyze-feedback`
- **Method:** POST
- **Purpose:** Analyzes customer feedback from CSV files
- **Input:** CSV file with "Feedback" column
- **Output:** Categorized feedback with urgency levels

### 2. **Next Best Action** - `/api/nba/recommend`
- **Method:** POST
- **Purpose:** Recommends personalized actions for users
- **Input:** User features (age, behavior, etc.)
- **Output:** Recommended action with personalized message

### 3. **Lifecycle Prediction** - `/api/lifecycle/predict`
- **Method:** POST
- **Purpose:** Predicts user lifecycle stages
- **Input:** User data (age, income, behavior, etc.)
- **Output:** Next best action with confidence score

### 4. **Hyperlocal Suggestions** - `/api/hyperlocal/get-nearby-agents`
- **Method:** GET
- **Purpose:** Finds nearby agents and local promotions
- **Input:** Latitude, longitude, radius (optional)
- **Output:** List of nearby agents with distances

### 5. **Fraud Detection** - `/api/fraud/predict`
- **Method:** POST
- **Purpose:** Detects suspicious transactions
- **Input:** Transaction event data
- **Output:** Fraud risk assessment and action recommendation

### 6. **Financial Budgeting** - `/api/financial/budget-summary`
- **Method:** POST
- **Purpose:** Provides personalized budgeting advice
- **Input:** User ID, goal item, goal amount
- **Output:** Savings plan and spending tips

### 7. **Credit Scoring** - `/api/credit/score`
- **Method:** POST
- **Purpose:** Calculates credit scores and loan eligibility
- **Input:** User financial behavior data
- **Output:** Credit score and lending decision

### 8. **Behavioral UI** - `/api/behavioral/predict-ui-changes`
- **Method:** POST
- **Purpose:** Predicts UI elements users will engage with
- **Input:** User ID and recent action
- **Output:** Recommended UI changes

### 9. **Admin Dashboard** - `/api/dashboard/admin`
- **Method:** GET
- **Purpose:** Provides admin dashboard with user segmentation
- **Output:** Performance metrics and optimization suggestions

## 🔧 API Usage Examples

### Example 1: Get Next Best Action
```python
import requests

url = "http://localhost:8000/api/nba/recommend"
data = {
    "age": 25,
    "days_since_last_login": 5,
    "session_time": 30,
    "has_active_loan": 0,
    "loan_amount": 0,
    "clicked_offer_last_month": 1,
    "loan_repayment_score": 750,
    "data_usage_last_month": 2.5,
    "calls_made_last_week": 3,
    "is_frequent_recharger": 1,
    "is_data_heavy_user": 0,
    "preferred_language": "English",
    "region": "Karachi",
    "device_type": "Android",
    "day_of_week": "Monday",
    "last_active_hour": 14,
    "recent_event": "login",
    "days_until_bill_due": 15
}

response = requests.post(url, json=data)
print(response.json())
```

### Example 2: Fraud Detection
```python
import requests

url = "http://localhost:8000/api/fraud/predict"
data = {
    "user_id": 12345,
    "is_known_device": False,
    "is_known_location": True,
    "hour_of_day": 23,
    "transaction_amount": 5000.0,
    "recipient_flagged": False,
    "frequent_user": True
}

response = requests.post(url, json=data)
print(response.json())
```

### Example 3: Get Nearby Agents
```python
import requests

url = "http://localhost:8000/api/hyperlocal/get-nearby-agents"
params = {
    "lat": 24.8607,
    "lon": 67.0011,
    "radius": 2000
}

response = requests.get(url, params=params)
print(response.json())
```

## 📁 Directory Structure

```
server/
├── main.py                 # Main FastAPI application
├── requirements.txt        # Python dependencies
├── test_server.py         # Server test script
├── README.md              # This file
├── models/                # ML model files
│   ├── nextbestaction/    # Next best action models
│   ├── lifejourney/       # Lifecycle models
│   ├── credit/            # Credit scoring models
│   ├── behavioral/        # Behavioral UI models
│   └── dashboard/         # Dashboard models
└── data/                  # Data files
    ├── user_financial_data.csv
    ├── user_data.csv
    └── mock_clicks.csv
```

## 🛠️ Troubleshooting

### Common Issues:

1. **Models not loaded error:**
   - Check if all model files are in the correct directories
   - Ensure model files have correct permissions

2. **Import errors:**
   - Make sure all dependencies are installed: `pip install -r requirements.txt`
   - Check Python version (recommended: 3.8+)

3. **Port already in use:**
   - Change port in `main.py` line: `uvicorn.run(app, host="0.0.0.0", port=8001, reload=True)`

4. **Memory issues:**
   - Some models are large (30MB+). Ensure sufficient RAM
   - Consider running on a machine with 4GB+ RAM

## 🔒 Security Notes

- CORS is enabled for all origins (`*`) for development
- Change CORS settings in production
- Add authentication middleware for production use
- Validate all inputs properly

## 📊 Performance

- Server starts in ~10-15 seconds due to model loading
- API responses typically under 100ms
- Supports concurrent requests
- Memory usage: ~200MB with all models loaded

## 🚀 Production Deployment

1. **Using Docker:**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

2. **Using Gunicorn:**
```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Run `python test_server.py` to diagnose issues
3. Check the FastAPI docs at `http://localhost:8000/docs` when server is running 