import sys
import os

# Mocking the environment to test the logic directly
# We'll import compute_match from app.py
sys.path.append(os.path.abspath('.'))
from app import compute_match

test_schemes = [
    {
        "name": "PM Kisan Samman Nidhi",
        "benefit": "Income support for small and marginal kisan families in India. Yield, crop insurance paddy.",
        "occupation": "Farmer"
    },
    {
        "name": "Midday Meal Scheme",
        "benefit": "Free lunch for children in government primary schools.",
        "occupation": "All Eligible"
    },
    {
        "name": "Prime Minister Research Fellowship",
        "benefit": "Scholarship for postgraduate students and PhD research.",
        "occupation": "Student"
    }
]

# Test Profile: 20 year old male student, 12th pass, <50k
profile = {
    "age": "20",
    "gender": "Male",
    "occupation": "Student",
    "income": "0-50000",
    "education": "12th",
    "marital": "Single",
}

print(f"🔍 Testing Profile: {profile}\n")

for s in test_schemes:
    score = compute_match(
        s,
        profile["occupation"],
        profile["gender"],
        profile["income"],
        profile["education"],
        profile["marital"],
        profile["age"]
    )
    print(f"📊 Scheme: {s['name']}")
    print(f"   Result: {score}% Match")
    
    # Assertions
    if "Kisan" in s["name"] and score > 40:
        print("❌ ERROR: Non-farmer matched too high with Farmer scheme.")
    elif "Midday Meal" in s["name"] and score > 30:
        print("❌ ERROR: 20-year-old matched too high with School scheme.")
    elif "Fellowship" in s["name"] and score < 60:
        print(f"❌ ERROR: Student matched too low with Fellowship scheme. ({score}%)")
    else:
        print("✅ Correct match level.")
    print("-" * 30)

print("\n🚀 Verification Complete.")
