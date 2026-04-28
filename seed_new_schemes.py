import json
import os

curr_schemes_path = "schemes.json"

new_schemes = [
    {
        "name": "PM KISAN Samman Nidhi Yojana",
        "category": "Agriculture",
        "income_limit": "Refer to portal",
        "occupation": "Farmer / Agriculture",
        "state": "All India",
        "benefit": "Under the PM-KISAN scheme, all landholding farmers' families shall be provided the financial benefit of Rs. 6000 per annum per family payable in three equal installments of Rs. 2000 each, every four months.",
        "tags": "kisan, farmer, agriculture, finance",
        "url": "https://pmkisan.gov.in/"
    },
    {
        "name": "Stand-Up India Scheme",
        "category": "Finance / Business",
        "income_limit": "Refer to portal",
        "occupation": "Business / Entrepreneur",
        "state": "All India",
        "benefit": "Facilitates bank loans between 10 lakh and 1 Crore to at least one Scheduled Caste (SC) or Scheduled Tribe (ST) borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.",
        "tags": "business, sc/st, women, enterprise",
        "url": "https://www.standupmitra.in/"
    },
    {
        "name": "Sukanya Samriddhi Yojana (SSY)",
        "category": "Women & Child Development",
        "income_limit": "No limit",
        "occupation": "All Eligible",
        "state": "All India",
        "benefit": "A small deposit scheme for the girl child launched as a part of the 'Beti Bachao Beti Padhao' campaign. Offers an attractive interest rate and tax benefit under Section 80C.",
        "tags": "girl child, deposit, tax benefit, women",
        "url": "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx"
    },
    {
        "name": "PM Vishwakarma Scheme",
        "category": "MSME",
        "income_limit": "Refer to portal",
        "occupation": "Artisans / Craftsmen",
        "state": "All India",
        "benefit": "Provides end-to-end support to artisans and craftspeople who work with their hands and tools. Includes collateral-free enterprise development loans, skill training, and modern tools.",
        "tags": "artisan, vishwakarma, skill, business",
        "url": "https://pmvishwakarma.gov.in/"
    },
    {
        "name": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
        "category": "Rural Development",
        "income_limit": "BPL",
        "occupation": "Unemployed / Student",
        "state": "All India",
        "benefit": "A placement linked skill development scheme for rural poor youth. It aims to transform rural poor youth into an economically independent and globally relevant workforce.",
        "tags": "skill, youth, employment, rural",
        "url": "http://ddugky.gov.in/"
    },
    {
        "name": "Kisan Credit Card (KCC)",
        "category": "Agriculture",
        "income_limit": "Refer to portal",
        "occupation": "Farmer / Agriculture",
        "state": "All India",
        "benefit": "Provides adequate and timely credit support from the banking system under a single window with flexible and simplified procedure to the farmers for their cultivation and other needs.",
        "tags": "credit, farmer, agriculture, loan",
        "url": "https://www.india.gov.in/spotlight/kisan-credit-card"
    },
    {
        "name": "National Scholarship Portal (NSP)",
        "category": "Education",
        "income_limit": "Varies by scheme",
        "occupation": "Student",
        "state": "All India",
        "benefit": "A one-stop platform for multiple scholarship schemes offered by various Ministries, Departments, and State Governments to students ranging from Class 1 to Post-Graduation.",
        "tags": "scholarship, student, education",
        "url": "https://scholarships.gov.in/"
    },
    {
        "name": "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
        "category": "Urban Affairs",
        "income_limit": "N/A",
        "occupation": "Street Vendor / Business",
        "state": "All India",
        "benefit": "A special micro-credit facility to provide affordable loan to street vendors to resume their livelihoods that have been adversely affected due to Covid-19 lockdown.",
        "tags": "vendor, loan, micro-credit, business",
        "url": "https://pmsvanidhi.mohua.gov.in/"
    },
    {
        "name": "PM Matru Vandana Yojana (PMMVY)",
        "category": "Women & Child Development",
        "income_limit": "Refer to portal",
        "occupation": "All Eligible",
        "state": "All India",
        "benefit": "A maternity benefit program providing conditional cash transfer to pregnant women and lactating mothers for the first living child of the family to promote maternal health.",
        "tags": "maternal, women, pregnant, cash transfer",
        "url": "https://pmmvy.wcd.gov.in/"
    },
    {
        "name": "Agnipath Scheme",
        "category": "Defence",
        "income_limit": "N/A",
        "occupation": "Student / Youth / Unemployed",
        "state": "All India",
        "benefit": "A new HR policy for recruitment of Armed Forces personnel below officer rank. Selected candidates, known as Agniveers, serve for a period of 4 years with a custom financial package.",
        "tags": "defence, military, youth, employment",
        "url": "https://agnipathvayu.cdac.in/"
    }
]

def append_schemes():
    if os.path.exists(curr_schemes_path):
        with open(curr_schemes_path, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = []

    # Get existing names to avoid duplicates
    existing_names = {s["name"].lower().strip() for s in data}

    added = 0
    for scheme in new_schemes:
        if scheme["name"].lower().strip() not in existing_names:
            data.append(scheme)
            added += 1

    with open(curr_schemes_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ Successfully appended {added} new high-quality schemes with URLs to schemes.json.")

if __name__ == "__main__":
    append_schemes()
