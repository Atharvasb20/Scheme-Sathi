import requests
import json

data = {
    "age": "25",
    "gender": "Male",
    "occupation": "Student",
    "income": "0-50000",
    "education": "Graduate",
    "state": "Maharashtra"
}

try:
    # Test ML Service directly
    response = requests.post("http://127.0.0.1:8000/predict", json=data)
    print(f"ML Service /predict: {response.status_code}")
    
    # Test Backend Recommendation
    response = requests.post("http://localhost:5000/recommend", json=data)
    print(f"Backend /recommend: {response.status_code}")
    if response.status_code == 200:
        print(f"Results Count: {len(response.json())}")
    else:
        print(f"Error: {response.text}")
except Exception as e:
    print(f"Error: {e}")
