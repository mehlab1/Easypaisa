# 🚀 Easypaisa Backend Server - Quick Start

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Start Server
```bash
python main.py
```

### 3. Access APIs
- **API Documentation:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/

## Available Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/sentiment/analyze-feedback` | POST | Analyze customer feedback |
| `/api/nba/recommend` | POST | Next best action recommendation |
| `/api/lifecycle/predict` | POST | User lifecycle prediction |
| `/api/hyperlocal/get-nearby-agents` | GET | Find nearby agents |
| `/api/fraud/predict` | POST | Fraud detection |
| `/api/financial/budget-summary` | POST | Financial budgeting |
| `/api/credit/score` | POST | Credit scoring |
| `/api/behavioral/predict-ui-changes` | POST | UI behavior prediction |
| `/api/dashboard/admin` | GET | Admin dashboard |

## Frontend Integration

### JavaScript Example
```javascript
// Get next best action
const response = await fetch('http://localhost:8000/api/nba/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    age: 25,
    days_since_last_login: 5,
    // ... other user data
  })
});
const result = await response.json();
```

### Python Example
```python
import requests

# Fraud detection
response = requests.post('http://localhost:8000/api/fraud/predict', json={
    'user_id': 12345,
    'is_known_device': False,
    'transaction_amount': 5000.0,
    # ... other data
})
```

## Windows Users
Double-click `start_server.bat` to start the server automatically.

## Need Help?
Check the full documentation in `README.md` 