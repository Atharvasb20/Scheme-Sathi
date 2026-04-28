import json
import os

db_path = "schemes.json"

all_regions = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar", "Chandigarh", "Dadra and Nagar Haveli", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
]

data_array = []

for region in all_regions:
    # 1. PMAY-G variant
    data_array.append({
        "name": f"PMAY-G (Pradhan Mantri Awas Yojana Gramin) - {region}",
        "category": "Housing",
        "income_limit": "BPL",
        "occupation": "Farmer / Agriculture",
        "state": region,
        "benefit": f"Financial assistance for construction of pucca houses for all houseless households living in rural areas of {region}.",
        "tags": "housing, rural, home, bpl",
        "url": ""
    })
    
    # 2. NHM variant
    data_array.append({
        "name": f"National Health Mission (NHM) Free Diagnostics - {region}",
        "category": "Health",
        "income_limit": "No limit",
        "occupation": "All Eligible",
        "state": region,
        "benefit": f"Free essential diagnostics and medical screening at public health centers across {region}.",
        "tags": "health, diagnostic, hospital",
        "url": ""
    })

    # 3. Swachh Bharat variant
    data_array.append({
        "name": f"SBM-G Individual Household Latrine (IHHL) Subsidy - {region}",
        "category": "Public Service",
        "income_limit": "BPL",
        "occupation": "All Eligible",
        "state": region,
        "benefit": f"Financial incentive for the construction and usage of individual household latrines in {region}.",
        "tags": "sanitation, toilet, rural",
        "url": ""
    })

    # 4. State Agritech
    data_array.append({
        "name": f"Sub-Mission on Agricultural Mechanization (SMAM) - {region}",
        "category": "Agriculture",
        "income_limit": "No limit",
        "occupation": "Farmer / Agriculture",
        "state": region,
        "benefit": f"Subsidies on purchase of agricultural equipment and tractors for farmers in {region}.",
        "tags": "tractor, agriculture, machine",
        "url": ""
    })

def append_knowledge_dump_3():
    if os.path.exists(db_path):
        with open(db_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
    else:
        existing = []

    names_existing = {s["name"].lower().strip() for s in existing}
    added = 0
    
    for row in data_array:
        if row["name"].lower().strip() not in names_existing:
            existing.append(row)
            added += 1

    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    print(f"✅ Executed Knowledge Dump 3. Appended {added} new schemes. Final DB count: {len(existing)}")

if __name__ == "__main__":
    append_knowledge_dump_3()
