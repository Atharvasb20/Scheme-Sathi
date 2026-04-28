import requests
import json

# Test 1: 45-year-old Farmer from Punjab, Graduate
profile_farmer = {
    "age": "45",
    "gender": "Male",
    "occupation": "Farmer / Agriculture",
    "income": "50000-200000",
    "education": "Graduate",
    "state": "Punjab",
    "marital": "Married"
}

# Test 2: 30-year-old Female Entrepreneur from Karnataka, Post-Graduate
profile_biz = {
    "age": "30",
    "gender": "Female",
    "occupation": "Business / Entrepreneur",
    "income": "200000-800000",
    "education": "Post-Graduate",
    "state": "Karnataka",
    "marital": "Single"
}

def run_test(profile, label):
    r = requests.post("http://localhost:5000/recommend", json=profile)
    data = r.json()
    print(f"\n--- {label} (Total: {len(data)}) ---")
    for s in data[:5]:
        print(f"  {s['match']}% | {s['state']} | {s['occupation']} | {s['name']}")
    
    # Cross-checks
    wrong_occ = [s for s in data if "student" in s.get("occupation","").lower() and "all eligible" not in s.get("occupation","").lower()]
    print(f"  Student leaks found: {len(wrong_occ)}")
    
    wrong_state = [s for s in data if s["state"] not in ["All India", profile["state"]]]
    print(f"  Wrong state leaks: {len(wrong_state)}")

run_test(profile_farmer, "FARMER IN PUNJAB")
run_test(profile_biz, "BUSINESS WOMAN IN KARNATAKA")
