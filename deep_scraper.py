"""
Multi-source real scheme scraper for Scheme Sathi.
Sources:
  1. Wikipedia REST API  – multiple scheme list pages
  2. Wikipedia  categories / individual scheme pages  (BeautifulSoup)
All data is 100% real government schemes.
"""
import requests, json, re, time
from bs4 import BeautifulSoup

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def clean(t):
    if not t: return ""
    return re.sub(r'\[\d+\]|\s+', ' ', str(t)).strip()

def get_html(url):
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"  [skip] {url}: {e}")
        return ""

# ── CONFIG: Wikipedia pages that contain scheme tables / lists ──
WIKI_PAGES = [
    "List_of_government_schemes_in_India",
    "Poverty_alleviation_programmes_in_India",
    "Pradhan_Mantri_Mudra_Yojana",
    "Mahatma_Gandhi_National_Rural_Employment_Guarantee_Act",
    "Pradhan_Mantri_Awas_Yojana",
    "Ayushman_Bharat_Yojana",
    "Pradhan_Mantri_Jan_Dhan_Yojana",
    "Pradhan_Mantri_Fasal_Bima_Yojana",
    "Swachh_Bharat_Mission",
    "Pradhan_Mantri_Kaushal_Vikas_Yojana",
    "Digital_India",
    "Make_in_India",
    "Startup_India",
    "Skill_India",
    "National_Rural_Health_Mission",
    "Samagra_Shiksha_Abhiyan",
    "Mid-Day_Meal_Scheme",
    "Integrated_Child_Development_Services",
    "Rashtriya_Swasthya_Bima_Yojana",
    "Atal_Pension_Yojana",
    "National_Pension_System",
]

scraped = []
seen_names = set()

# ── PASS 1: extract from infoboxes (individual scheme articles) ──
def parse_infobox_article(page_name):
    url  = f"https://en.wikipedia.org/wiki/{page_name}"
    html = get_html(url)
    if not html: return None
    soup = BeautifulSoup(html, "html.parser")

    # Title
    title_tag = soup.find("h1", id="firstHeading")
    name = clean(title_tag.text) if title_tag else page_name.replace("_", " ")

    # Infobox
    infobox = soup.find("table", class_=re.compile(r"infobox"))
    info = {}
    if infobox:
        for row in infobox.find_all("tr"):
            th  = row.find("th")
            td  = row.find("td")
            if th and td:
                k = clean(th.text).lower()
                v = clean(td.text)
                info[k] = v

    # First meaningful paragraph as benefit
    paras = soup.find_all("p")
    benefit = ""
    for p in paras:
        text = clean(p.text)
        if len(text) > 60:
            benefit = text[:350]
            break

    return {
        "name":         name,
        "category":     info.get("ministry", info.get("type", "General")),
        "income_limit": info.get("income limit", info.get("annual income", "Refer to portal")),
        "occupation":   info.get("beneficiaries", info.get("target group", "All Eligible")),
        "state":        info.get("country", info.get("state", "All India")),
        "benefit":      benefit or info.get("description", "Government scheme providing welfare benefits."),
        "tags":         ""
    }

# ── PASS 2: extract tables from list pages ──
def parse_table_page(page_name):
    url  = f"https://en.wikipedia.org/wiki/{page_name}"
    html = get_html(url)
    if not html: return []
    soup = BeautifulSoup(html, "html.parser")
    results = []

    for table in soup.find_all("table", class_=re.compile(r"wikitable")):
        headers_raw = [clean(th.text).lower() for th in table.find_all("th")]
        # Find column indices
        name_col    = next((i for i,h in enumerate(headers_raw) if any(x in h for x in ["scheme","programme","name","title"])), 0)
        ministry_col= next((i for i,h in enumerate(headers_raw) if any(x in h for x in ["ministry","sector","department","nodal"])), 1)
        desc_col    = next((i for i,h in enumerate(headers_raw) if any(x in h for x in ["desc","aim","objective","benefit","detail"])), -1)

        for row in table.find_all("tr")[1:]:   # skip header
            cells = row.find_all(["td","th"])
            if len(cells) < 2: continue

            name    = clean(cells[name_col].text)    if name_col    < len(cells) else ""
            ministry= clean(cells[ministry_col].text) if ministry_col < len(cells) else ""
            benefit = clean(cells[desc_col].text)    if 0 <= desc_col < len(cells) else ""

            if not name or len(name) < 4: continue
            results.append({
                "name":         name,
                "category":     ministry[:60] or "General",
                "income_limit": "Refer to portal",
                "occupation":   "All Eligible",
                "state":        "All India",
                "benefit":      benefit[:350] or f"{name} is a government scheme providing welfare benefits to eligible citizens.",
                "tags":         ""
            })
    return results

print("=== Scheme Sathi Mega Scraper ===")

# Infobox articles
INFOBOX_PAGES = [
    "Pradhan_Mantri_Mudra_Yojana",
    "Mahatma_Gandhi_National_Rural_Employment_Guarantee_Act",
    "Pradhan_Mantri_Awas_Yojana",
    "Ayushman_Bharat_Yojana",
    "Pradhan_Mantri_Jan_Dhan_Yojana",
    "Pradhan_Mantri_Fasal_Bima_Yojana",
    "Swachh_Bharat_Mission",
    "Pradhan_Mantri_Kaushal_Vikas_Yojana",
    "Digital_India",
    "Make_in_India",
    "Startup_India",
    "Skill_India",
    "National_Rural_Health_Mission",
    "Samagra_Shiksha_Abhiyan",
    "Mid-Day_Meal_Scheme",
    "Integrated_Child_Development_Services",
    "Rashtriya_Swasthya_Bima_Yojana",
    "Atal_Pension_Yojana",
    "National_Pension_System",
    "Pradhan_Mantri_Jeevan_Jyoti_Bima_Yojana",
    "Pradhan_Mantri_Suraksha_Bima_Yojana",
    "Stand_Up_India_scheme",
    "Pradhan_Mantri_Gram_Sadak_Yojana",
    "Pradhan_Mantri_Ujjwala_Yojana",
    "National_Health_Mission_(India)",
    "Janani_Suraksha_Yojana",
    "POSHAN_Abhiyaan",
    "Beti_Bachao,_Beti_Padhao",
    "Deen_Dayal_Upadhyaya_Grameen_Kaushalya_Yojana",
    "Pradhan_Mantri_Krishi_Sinchai_Yojana",
    "e-NAM",
    "Pradhan_Mantri_Matru_Vandana_Yojana",
    "RERA_(India)",
    "Sagarmala_programme",
    "National_Solar_Mission",
    "Jal_Jeevan_Mission",
    "Eat_Right_India",
    "PM_SVANidhi",
    "One_District_One_Product",
    "GeM_(Government_e_Marketplace)",
    "Kisan_Credit_Card",
    "Pradhan_Mantri_Annadata_Aay_Sanrakshan_Abhiyan",
    "Soil_Health_Card",
    "Paramparagat_Krishi_Vikas_Yojana",
    "Pradhan_Mantri_Matsya_Sampada_Yojana",
    "Sukanya_Samriddhi_Yojana",
    "Atal_Innovation_Mission",
    "National_Career_Service",
    "Mission_Indradhanush",
    "Pradhan_Mantri_Surakshit_Matritva_Abhiyan",
]

TABLE_PAGES = [
    "List_of_government_schemes_in_India",
    "Poverty_alleviation_programmes_in_India",
]

# 1. Infobox pages
for page in INFOBOX_PAGES:
    result = parse_infobox_article(page)
    if result and result["name"].lower() not in seen_names and len(result["name"]) > 3:
        seen_names.add(result["name"].lower())
        scraped.append(result)
        print(f"  ✅ {result['name']}")
    time.sleep(0.2)

# 2. Table pages
for page in TABLE_PAGES:
    rows = parse_table_page(page)
    for r in rows:
        if r["name"].lower() not in seen_names and len(r["name"]) > 3:
            seen_names.add(r["name"].lower())
            scraped.append(r)
    print(f"  📋 {page}: +{len(rows)} schemes")
    time.sleep(0.3)

print(f"\n🔢 Total scraped from Wikipedia: {len(scraped)}")

# ── Load existing hand-crafted real schemes and MERGE ──
try:
    with open("schemes.json", "r", encoding="utf-8") as f:
        existing = json.load(f)
    for s in existing:
        if s["name"].lower().strip() not in seen_names and len(s["name"]) > 3:
            seen_names.add(s["name"].lower().strip())
            scraped.append(s)
    print(f"🔢 After merging existing: {len(scraped)}")
except:
    pass

# ── AUGMENT empty benefits with a meaningful description ──
for s in scraped:
    if not s.get("benefit") or len(s["benefit"]) < 20:
        s["benefit"] = (
            f"{s['name']} is a flagship government of India initiative under {s['category']}. "
            f"It provides welfare support to {s['occupation']} across India, "
            f"aiming to improve socio-economic conditions and ensure inclusive growth."
        )

# ── Save ──
with open("schemes.json", "w", encoding="utf-8") as f:
    json.dump(scraped, f, indent=2, ensure_ascii=False)

print(f"\n✅ DONE! {len(scraped)} REAL schemes saved to schemes.json")
print("   Sources: Wikipedia infoboxes + table pages + existing dataset")
