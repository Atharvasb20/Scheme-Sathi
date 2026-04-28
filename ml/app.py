from flask import Flask, request, jsonify
import json
import re
import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# ✅ Supabase Setup
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# ✅ Determine base path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCHEMES_PATH = os.path.join(BASE_DIR, "..", "schemes.json")

if url and key and "your_supabase" not in url:
    try:
        supabase: Client = create_client(url, key)
        response = supabase.table("schemes").select("*").execute()
        schemes = response.data
    except Exception as e:
        print(f"Supabase failed: {e}. Falling back to local schemes.json if available.")

        if os.path.exists(SCHEMES_PATH):
            with open(SCHEMES_PATH, "r", encoding="utf-8") as f:
                schemes = json.load(f)
else:
    # Fallback for development
    if os.path.exists(SCHEMES_PATH):
        with open(SCHEMES_PATH, "r", encoding="utf-8") as f:
            schemes = json.load(f)
        print(f"Loaded {len(schemes)} schemes from LOCAL schemes.json.")
    else:
        print(f"Could not find {SCHEMES_PATH}")




# ─────────────────────────────────────────────────────────────
# KEYWORD MAPS
# ─────────────────────────────────────────────────────────────

OCC_KEYWORDS = {
    "Farmer / Agriculture": [
        "agricultur", "kisan", "farmer", "farming", "crop", "fisheries",
        "fisherman", "horticultur", "livestock", "irrigation",
        "soil", "grain", "paddy", "wheat", "pulses", "organic", "dairy",
        "cattle", "animal husbandry", "agri", "bamboo", "sericulture",
        "silk", "tea", "coffee", "spice", "flood", "drought",
        "micro irrigation", "land", "fertilizer", "pm kisan", "godown",
        "tractor", "farm machinery", "matsya", "aqua",
    ],
    "Student": [
        "education", "scholarship", "student", "school", "college",
        "skill", "training", "fellowship", "learning", "literat",
        "graduate", "higher education", "pre-matric", "post-matric",
        "coaching", "tuition", "university", "research", "phd",
        "stipend", "merit", "talent", "beti", "girl",
        "innovation", "atal tinker", "diksha", "academic", "study",
        "digital literacy", "apprentice", "mooc", "laptop", "tablet",
    ],
    "Business / Entrepreneur": [
        "msme", "business", "startup", "entrepreneur", "industry",
        "mudra", "stand-up india", "manufacturing", "gem", "market",
        "export", "trade", "commerce", "self-employ", "enterprise",
        "micro", "small", "medium", "artisan", "craft", "shop",
        "vendor", "street vendor", "svanidhi", "incubat", "production",
        "textile", "fund", "credit", "collateral",
        "technology upgrade", "one district one product", "pli",
        "ecommerce", "digital payment", "udyam", "coir",
    ],
    "Salaried Employee": [
        "pension", "provident", "epf", "esi", "insurance", "housing",
        "transport", "employee", "salaried", "salary",
        "income tax", "nps", "national pension", "gratuity",
        "medical", "hospital", "ayushman", "pmjay", "loan", "home loan",
        "credit link", "urban", "smart city", "bus", "metro",
        "public transport", "welfare", "social security",
    ],
    "Unemployed": [
        "employment", "job", "skill", "livelihood", "nrega", "mgnreg",
        "self-employ", "training", "rozgar", "placement", "wage",
        "rural employment", "urban employment", "kaushaly", "kaushal",
        "pmegp", "entrepreneurship", "income generation", "welfare",
        "social", "bpl", "poverty", "below poverty", "ration",
        "subsidized", "relief", "deen dayal", "ajeevika", "shg",
    ],
}

GENDER_KEYWORDS = {
    "Female": [
        "women", "mahila", "girl", "maternal", "beti", "shakti",
        "matritva", "pregnant", "widow", "female", "nari", "creche",
        "self help group", "shg", "single girl", "bride",
    ],
    "Male": [
        "farmer", "artisan", "vishwakarma", "soldier", "ex-servicemen",
        "defence", "agnipath", "sainik",
    ],
    "Other": ["transgender", "lgbt"],
}

EDUCATION_KEYWORDS = {
    "10th":         ["pre-matric", "10th", "class 10", "below matric", "primary", "elementary"],
    "12th":         ["post-matric", "12th", "class 12", "intermediate", "higher secondary", "matriculat"],
    "Graduate":     ["graduate", "degree", "bachelor", "undergraduate", "polytechnic", "diploma"],
    "Post-Graduate":["post-graduate", "master", "mba", "phd", "research", "fellowship", "mphil"],
}

INCOME_RANGES = {
    "0-50000":       (0,      50000),
    "50000-200000":  (50000,  200000),
    "200000-800000": (200000, 800000),
    "800000+":       (800000, 99_999_999),
}

# ─────────────────────────────────────────────────────────────
# HARD EXCLUSION KEYWORD LISTS
# ─────────────────────────────────────────────────────────────

SCHOOL_CHILD_KEYWORDS = [
    "primary school", "secondary school", "class 1", "class 2", "class 3",
    "class 4", "class 5", "class 6", "class 7", "class 8", "class 9",
    "pre-school", "kindergarten", "children under 6",
    "mid-day meal", "midday meal", "primary level", "primary years",
    "anganwadi", "icds",
]

MATERNAL_KEYWORDS = [
    "pregnant", "maternal", "lactating", "maternity", "expectant mother",
]

WIDOW_KEYWORDS = [
    "widow pension", "widow",
]

WOMEN_ONLY_KEYWORDS = [
    "mahila", "women empowerment", "girl child", "beti bachao",
    "kanya", "nari shakti", "self help group women",
]

FARMING_EXCLUSIVE_KEYWORDS = [
    "kisan", "crop insurance", "paddy", "wheat", "soil health",
    "fertilizer", "yield", "seeds", "irrigation", "pm-kisan",
    "agriculture insurance", "farm machinery", "tractor", "godown",
    "livestock", "cattle", "dairy", "fisheries", "aqua", "matsya",
    "organic farming", "horticultur",
]

SENIOR_ONLY_KEYWORDS = [
    "senior citizen", "old age pension", "60 years and above",
    "60 years of age", "elderly", "vaya vandana", "retirement",
    "vridhjan",
]

STUDENT_EXCLUSIVE_KEYWORDS = [
    "scholarship", "pre-matric", "post-matric", "fellowship",
    "college student", "school student", "merit student",
    "laptop scheme", "tablet scheme",
]

BUSINESS_EXCLUSIVE_KEYWORDS = [
    "msme", "startup", "mudra", "stand-up india", "enterprise",
    "vendor", "svanidhi", "manufacturing", "pli scheme",
    "udyam", "coir unit",
]

# Occupation field exact-match mapping for strict filtering
OCC_FIELD_MAP = {
    "Farmer / Agriculture": ["farmer", "agriculture", "kisan", "fisherm", "dairy", "livestock"],
    "Student":              ["student", "scholar"],
    "Business / Entrepreneur": ["business", "entrepreneur", "artisan", "craftsmen", "vendor"],
    "Salaried Employee":    ["salaried", "employee"],
    "Unemployed":           ["unemployed", "all eligible"],
}


def compute_match(scheme, occupation, gender, income_range, education, marital, age_str, user_state):
    """
    Strict matching with hard demographic + geographic exclusions.
    """
    user_age = int(age_str) if str(age_str).isdigit() else 25

    scheme_text = " ".join([
        scheme.get("name", ""),
        scheme.get("category", ""),
        scheme.get("benefit", ""),
        scheme.get("occupation", ""),
        scheme.get("tags", ""),
    ]).lower()

    scheme_occ_field = scheme.get("occupation", "").lower()
    scheme_state = scheme.get("state", "All India").strip().lower()
    user_state_lower = user_state.strip().lower()

    # ══════════════════════════════════════════════════════════
    # LAYER 0: ABSOLUTE GEOGRAPHIC EXCLUSION
    # ══════════════════════════════════════════════════════════
    # If scheme is state-specific and doesn't match the user's state → KILL
    if scheme_state not in ["all india", "india", ""]:
        if scheme_state != user_state_lower:
            return 0

    # ══════════════════════════════════════════════════════════
    # LAYER 1: HARD DEMOGRAPHIC EXCLUSIONS
    # ══════════════════════════════════════════════════════════

    # 1a. School/Child schemes → exclude adults (>18)
    if user_age > 18:
        if any(kw in scheme_text for kw in SCHOOL_CHILD_KEYWORDS):
            return 0

    # 1b. Senior-only schemes → exclude non-seniors (<55)
    if user_age < 55:
        if any(kw in scheme_text for kw in SENIOR_ONLY_KEYWORDS):
            return 0

    # 1c. Males cannot match maternal/widow schemes
    if gender == "Male":
        if any(kw in scheme_text for kw in MATERNAL_KEYWORDS):
            return 0
        if any(kw in scheme_text for kw in WIDOW_KEYWORDS):
            return 0

    # 1d. Non-Farmers cannot match farmer-exclusive schemes
    if occupation != "Farmer / Agriculture":
        if any(kw in scheme_text for kw in FARMING_EXCLUSIVE_KEYWORDS):
            return 0

    # 1e. Non-Students cannot match student-only scholarships
    if occupation != "Student":
        if any(kw in scheme_text for kw in STUDENT_EXCLUSIVE_KEYWORDS):
            return 0

    # 1f. Non-Business users cannot match business-exclusive schemes
    if occupation != "Business / Entrepreneur":
        if any(kw in scheme_text for kw in BUSINESS_EXCLUSIVE_KEYWORDS):
            return 0

    # 1g. BPL schemes should not match high-income users
    income_min, income_max = INCOME_RANGES.get(income_range, (0, 99_999_999))
    income_limit_text = str(scheme.get("income_limit", "")).lower()
    if income_min >= 800000:
        if "bpl" in income_limit_text or "below poverty" in income_limit_text:
            return 0

    # 1h. STRICT OCCUPATION FIELD EXCLUSION
    # If the scheme's occupation field explicitly names a specific role, and
    # the user's occupation doesn't match, exclude it.
    if scheme_occ_field and "all eligible" not in scheme_occ_field:
        user_occ_lower = occupation.lower()
        # Check if user's occupation keywords match the scheme's occupation field
        user_occ_kws = OCC_FIELD_MAP.get(occupation, [])
        if not any(kw in scheme_occ_field for kw in user_occ_kws):
            return 0

    # ══════════════════════════════════════════════════════════
    # LAYER 2: POSITIVE SCORING
    # ══════════════════════════════════════════════════════════
    score = 20  # baseline for non-excluded schemes

    # --- Occupation keyword match (strong signal) ---
    occ_kws = OCC_KEYWORDS.get(occupation, [])
    occ_hits = sum(1 for kw in occ_kws if kw in scheme_text)
    if occ_hits >= 1:
        score += 30 + min((occ_hits - 1) * 4, 15)

    # --- Exact occupation field match ---
    occ_field_kws = OCC_FIELD_MAP.get(occupation, [])
    if any(kw in scheme_occ_field for kw in occ_field_kws):
        score += 15
    elif "all eligible" in scheme_occ_field:
        score += 10

    # --- Gender match ---
    g_kws = GENDER_KEYWORDS.get(gender, [])
    g_hits = sum(1 for kw in g_kws if kw in scheme_text)
    score += min(g_hits * 4, 8)

    # --- Education match ---
    edu_kws = EDUCATION_KEYWORDS.get(education, [])
    edu_hits = sum(1 for kw in edu_kws if kw in scheme_text)
    if edu_hits:
        score += min(edu_hits * 4, 8)

    # --- Income match ---
    nums = re.findall(r'\d+', income_limit_text.replace(",", ""))
    if nums:
        lim = int(nums[0])
        if income_max <= lim:
            score += 8
        elif income_min <= lim:
            score += 4
    elif "no limit" in income_limit_text or "refer" in income_limit_text:
        score += 5

    # --- State bonus (All India schemes always get a small bump) ---
    if scheme_state in ["all india", "india"]:
        score += 3

    # --- Age-specific boosts ---
    if user_age >= 55 and "senior" in scheme_text:
        score += 10
    if 14 <= user_age <= 28 and any(x in scheme_text for x in ["student", "college", "scholarship", "youth"]):
        score += 10
    if 18 <= user_age <= 45 and any(x in scheme_text for x in ["startup", "entrepreneur", "mudra", "enterprise"]):
        score += 8

    # ══════════════════════════════════════════════════════════
    # FINAL CLAMP
    # ══════════════════════════════════════════════════════════
    return max(0, min(int(score), 98))


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    occupation   = data.get("occupation", "")
    gender       = data.get("gender", "")
    income       = data.get("income", "")
    education    = data.get("education", "")
    state        = data.get("state", "All India")
    marital      = data.get("marital", "")
    age          = str(data.get("age", "25"))

    scores = []
    for scheme in schemes:
        s = compute_match(scheme, occupation, gender, income, education, marital, age, state)
        scores.append(float(s))

    return jsonify({"scores": scores})


if __name__ == "__main__":
    app.run(port=8000)