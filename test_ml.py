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
    response = requests.post("http://localhost:8000/predict", json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)[:500]}...")
except Exception as e:
    print(f"Error: {e}")
