"""
Clean schemes.json - remove non-scheme entries and fix data quality.
"""
import json, re

with open("schemes.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Keywords that indicate a REAL government scheme
SCHEME_INDICATORS = [
    "yojana", "mission", "scheme", "abhiyan", "programme", "program",
    "bima", "kendra", "vikas", "samman", "samridhi", "sathi", "seva",
    "nidhi", "pradhan mantri", "pm ", "national", "rashtriya", "mahatma",
    "atal", "indira", "sarkar", "bharat", "swachh", "digital", "mudra",
    "ayushman", "kaushal", "ujjwala", "awas", "kisan", "jeevan",
    "jan dhan", "sukanya", "fasal", "mnrega", "nrega", "nrlm", "msme",
    "stand up", "startup", "make in", "skill", "apprentice", "scholarship",
    "fellowship", "pension", "insurance", "sanitation", "solar",
    "sagarmala", "jal", "rera", "poshan", "mid-day", "midday",
    "anganwadi", "icds", "svanidhi", "orop", "pmay", "pmjdy",
    "credit", "subsid", "relief fund", "fund for", "welfare",
    "rural employment", "social assist", "livelihood",
]

def is_valid_scheme(s):
    name_lower = s["name"].lower()
    # Must contain a scheme-like keyword
    has_keyword = any(kw in name_lower or kw in s.get("benefit","").lower() for kw in SCHEME_INDICATORS)
    # Must not be a biography / political article
    bad_words = ["premiership of", "government of india", "ministry of india", "minister", "wikipedia"]
    is_bad = any(b in name_lower for b in bad_words)
    # Name must be reasonable
    too_short = len(s["name"].strip()) < 8
    return has_keyword and not is_bad and not too_short

cleaned = [s for s in data if is_valid_scheme(s)]

# Fix category: replace short codes like "MoE" with full names
MINISTRY_MAP = {
    "moe": "Ministry of Education",
    "momsme": "Ministry of MSME",
    "mohfw": "Ministry of Health & Family Welfare",
    "mohua": "Ministry of Housing & Urban Affairs",
    "mopr": "Ministry of Panchayati Raj",
    "mord": "Ministry of Rural Development",
    "mof": "Ministry of Finance",
    "moa": "Ministry of Agriculture",
    "mod": "Ministry of Defence",
    "mowcd": "Ministry of Women & Child Development",
    "mofahd": "Ministry of Fisheries",
    "—": "General",
    "": "General",
}

for s in cleaned:
    cat_lower = s["category"].strip().lower().replace(" ","").replace(".", "")
    if cat_lower in MINISTRY_MAP:
        s["category"] = MINISTRY_MAP[cat_lower]
    # Trim excessively long categories
    if len(s["category"]) > 60:
        s["category"] = s["category"][:60]

print(f"Before cleaning: {len(data)}")
print(f"After cleaning:  {len(cleaned)}")

with open("schemes.json", "w", encoding="utf-8") as f:
    json.dump(cleaned, f, indent=2, ensure_ascii=False)

print("✅ schemes.json cleaned and saved!")
