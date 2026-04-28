import json
import os

db_path = "schemes.json"

# Compact data structure: [Name, Category, Income, Occupation, State, Benefit, Tags, Url]
data_raw_1 = [
    ["YSR Rythu Bharosa", "Agriculture", "Refer to portal", "Farmer / Agriculture", "Andhra Pradesh", "Financial assistance to farmers including tenant farmers to support agriculture.", "farmer, rythu, andhra", ""],
    ["Jagananna Amma Vodi", "Education", "BPL", "Student", "Andhra Pradesh", "Financial aid to mothers for sending kids to school.", "student, mother, school", ""],
    ["YSR Pension Kanuka", "Social Welfare", "BPL", "All Eligible", "Andhra Pradesh", "Monthly pension to elderly, widows, and disabled.", "pension, elderly, widow", ""],
    ["Arogyasri Scheme", "Health", "BPL", "All Eligible", "Andhra Pradesh", "Free healthcare for families below the poverty line at empaneled hospitals.", "health, insurance", ""],
    ["YSR Cheyutha", "Women & Child", "BPL", "Business / Entrepreneur", "Andhra Pradesh", "Financial assistance to women from SC/ST/BC/Minority communities for entrepreneurship.", "women, business", ""],
    
    ["Orunodoi Scheme", "Social Welfare", "BPL", "Unemployed", "Assam", "Monthly financial assistance to vulnerable women in the state.", "women, regular income", ""],
    ["Swami Vivekananda Assam Youth Empowerment (SVAYEM)", "Business", "Refer to portal", "Business / Entrepreneur", "Assam", "Seed capital to youths for entrepreneurial ventures.", "youth, business", ""],
    ["Assam Arundhati Gold Scheme", "Women & Child", "Below 5 Lakhs", "All Eligible", "Assam", "Financial aid for purchasing gold for brides to prevent child marriage.", "bride, marriage, gold", ""],
    
    ["Mukhyamantri Kanya Utthan Yojana", "Women & Child", "No limit", "Student", "Bihar", "Financial benefits to girls from birth till graduation to promote education.", "girl, graduation", ""],
    ["Bihar Student Credit Card", "Education", "No limit", "Student", "Bihar", "Loan up to 4 lakhs at a low-interest rate for higher education.", "loan, education", ""],
    ["Mukhyamantri Vridhjan Pension Yojana", "Social Welfare", "BPL", "Unemployed", "Bihar", "Pension to senior citizens regardless of caste or religion.", "pension, elderly", ""],
    ["Kushal Yuva Program", "Education", "No limit", "Student", "Bihar", "Skill training program for youths to enhance employability.", "skill, youth", ""],
    
    ["Mukhyamantri Mitan Yojana", "Public Service", "No limit", "All Eligible", "Chhattisgarh", "Home delivery of over 100 civic services.", "delivery, civic", ""],
    ["Rajiv Gandhi Kisan Nyay Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "Chhattisgarh", "Income support mapped to crop production to encourage agriculture.", "farmer, crop", ""],
    ["Godhan Nyay Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "Chhattisgarh", "Government procures cow dung from cattle rearers to boost rural economy.", "dairy, cattle", ""],
    
    ["Mukhyamantri Mahila Utkarsh Yojana", "Business", "No limit", "Business / Entrepreneur", "Gujarat", "Interest-free loans to women's joint liability and self-help groups.", "women, loan, business", ""],
    ["Vahli Dikri Yojana", "Women & Child", "Below 2 Lakhs", "Student", "Gujarat", "Financial assistance of ₹1.10 lakh at various stages to promote girl child education.", "girl, education", ""],
    ["Mukhya Mantri Amrutam (MA)", "Health", "BPL", "All Eligible", "Gujarat", "Cashless medical and surgical care for catastrophic illnesses.", "health, medical", ""],
    
    ["Mera Pani Meri Virasat", "Agriculture", "No limit", "Farmer / Agriculture", "Haryana", "Incentive for crop diversification away from water-intensive paddy.", "farmer, crop, water", ""],
    ["Mukhyamantri Vivah Shagun Yojana", "Social Welfare", "BPL", "All Eligible", "Haryana", "Financial aid given to families of brides from marginalized communities.", "marriage, shagun", ""],
    
    ["Mukhyamantri Krishi Ashirwad Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "Jharkhand", "Financial assistance up to ₹25000 based on land-holding size.", "farmer, finance", ""],
    ["Marang Gomke Jaipal Singh Munda Scholarship", "Education", "Refer to portal", "Student", "Jharkhand", "Overseas scholarship scheme for ST, SC, OBC students.", "scholarship, overseas", ""],
    
    ["Grama/Ward Sachivalayam", "Public Service", "No limit", "All Eligible", "Andhra Pradesh", "Decentralized administration bringing 500+ services close to citizens.", "civic, admin", ""],

    ["Bhagyalakshmi Scheme", "Women & Child", "BPL", "All Eligible", "Karnataka", "Financial security scheme for girl children in BPL families.", "girl, bpl", ""],
    ["Krushi Bhagya", "Agriculture", "No limit", "Farmer / Agriculture", "Karnataka", "Rainwater harvesting assistance and farm machinery subsidies.", "agriculture, rain, tractor", ""],
    ["Arundhati & Maitri Schemes", "Social Welfare", "No limit", "All Eligible", "Karnataka", "Pension schemes specifically for Devadasis and LGBT community.", "lgbt, pension", ""],
    ["Sneha Clinic", "Health", "No limit", "Student", "Karnataka", "Adolescent friendly health clinics in urban areas.", "youth, clinic, health", ""],

    ["Life Mission", "Housing", "BPL", "All Eligible", "Kerala", "Comprehensive housing scheme to provide homes for landless and homeless.", "housing, home", ""],
    ["Karunya Benevolent Fund", "Health", "BPL", "All Eligible", "Kerala", "Financial aid for poor treating critical illnesses like cancer, kidney ailments.", "health, cancer", ""],
    ["Saphalyam Scheme", "Housing", "BPL", "All Eligible", "Kerala", "Housing provisions linked to microfinance for destitute.", "housing, finance", ""],
    ["Vidyakiranam", "Education", "No limit", "Student", "Kerala", "Educational assistance to children of disabled parents.", "student, disability", ""],

    ["Sambal Yojana", "Social Welfare", "BPL", "Unemployed", "Madhya Pradesh", "Welfare scheme covering maternity, accidental insurance, and power subsidy.", "welfare, bpl, power", ""],
    ["Ladli Laxmi Yojana", "Women & Child", "No limit", "Student", "Madhya Pradesh", "Substantial financial backing for girls completing education unmarried till 21.", "girl, education", ""],
    ["Mukhyamantri Kanya Vivah/Nikah Yojana", "Women & Child", "BPL", "All Eligible", "Madhya Pradesh", "Financial assistance for marriages of destitute widows and poor women.", "marriage, bpl", ""],
    ["Mukhya Mantri Krishi Ashirwad Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "Madhya Pradesh", "Support to farmers specifically for seed and fertilizer procurement.", "farmer, seed", ""],

    ["Mahatma Jyotirao Phule Jan Arogya Yojana", "Health", "BPL", "All Eligible", "Maharashtra", "Flagship cashless health insurance scheme for low-income families.", "health, insurance", ""],
    ["Sanjay Gandhi Niradhar Anudan Yojana", "Social Welfare", "Below 21,000", "Unemployed", "Maharashtra", "Financial assistance to destitutes, blind, disabled, and orphans.", "pension, disability", ""],
    ["Bal Sangopan Yojana", "Women & Child", "No limit", "Student", "Maharashtra", "Monthly grant to foster parents or single parents for child rearing.", "child, foster", ""],
    ["Navtejaswini Maharashtra Gramin Mahila Udyam Vikas", "Business", "No limit", "Business / Entrepreneur", "Maharashtra", "Promotes rural women entrepreneurship and SHG lending.", "women, rural, business", ""],

    ["Kalia Scheme", "Agriculture", "No limit", "Farmer / Agriculture", "Odisha", "Krushak Assistance for Livelihood and Income Augmentation (KALIA) for farmers.", "farmer, livelihood", ""],
    ["Madhubabu Pension Yojana", "Social Welfare", "No limit", "Unemployed", "Odisha", "Pension for elderly, widows, and trans-persons without support.", "pension, trans", ""],
    ["Mo Sarkar", "Public Service", "No limit", "All Eligible", "Odisha", "Feedback based governance initiative to improve police and health services.", "governance", ""],

    ["Biju Swasthya Kalyan Yojana", "Health", "No limit", "All Eligible", "Odisha", "Universal health coverage for all state citizens with a focus on women.", "health, women", ""],
    
    ["Mata Tripta Mahila Yojana", "Women & Child", "No limit", "Business / Entrepreneur", "Punjab", "Empowering women headed households in Punjab through enterprise.", "women, enterprise", ""],
    ["Ashirwad Scheme", "Social Welfare", "BPL", "All Eligible", "Punjab", "Financial assistance given at the time of marriage to daughters of SC/BC families.", "marriage, sc, bc", ""],
    
    ["Mukhyamantri Rajshree Yojana", "Women & Child", "No limit", "Student", "Rajasthan", "Grant of ₹50,000 across 6 phases from birth to 12th passing of a girl child.", "girl, education", ""],
    ["Chiranjeevi Health Insurance Scheme", "Health", "No limit", "All Eligible", "Rajasthan", "Cashless health insurance cover up to 25 Lakhs for all state families.", "health, insurance", ""],
    ["Palenhar Yojana", "Social Welfare", "No limit", "Student", "Rajasthan", "Monthly grant to relatives or institutions rearing orphaned children.", "orphan, child", ""],
    ["Indira Gandhi Shahari Rojgar Yojana", "Employment", "No limit", "Unemployed", "Rajasthan", "100 days of guaranteed employment for urban families.", "employment, urban", ""],
    
    ["KCR Kit", "Women & Child", "No limit", "All Eligible", "Telangana", "Incentive scheme providing a kit to new mothers delivering in Govt hospitals.", "mother, child, health", ""],
    ["Rythu Bandhu", "Agriculture", "No limit", "Farmer / Agriculture", "Telangana", "Direct agricultural investment support scheme per acre per season.", "farmer, crop", ""],
    ["Kalyana Lakshmi / Shaadi Mubarak", "Social Welfare", "Below 2 Lakhs", "All Eligible", "Telangana", "Financial assistance of ₹1,00,116 for the marriage of poor daughters.", "marriage, finance", ""],
    ["Dalit Bandhu", "Business", "No limit", "Business / Entrepreneur", "Telangana", "Direct benefit transfer of ₹10 lakh to SC families to setup business.", "business, sc, db", ""],
    
    ["Kanyashree Prakalpa", "Women & Child", "No limit", "Student", "West Bengal", "Conditional cash transfer to prevent early marriage and fund education of girls.", "girl, education", ""],
    ["Krishak Bandhu", "Agriculture", "No limit", "Farmer / Agriculture", "West Bengal", "Financial assistance & life insurance cover to all farmers.", "farmer, insurance", ""],
    ["Swasthya Sathi", "Health", "No limit", "All Eligible", "West Bengal", "Basic health cover for secondary and tertiary care up to ₹5 lakh per annum per family.", "health, insurance", ""],
    ["Lakshmir Bhandar", "Social Welfare", "No limit", "Unemployed", "West Bengal", "Monthly basic income support to female heads of families.", "women, income", ""],
    
    ["Amma Two Wheeler Scheme", "Women & Child", "Below 2.5 Lakhs", "Salaried Employee", "Tamil Nadu", "Subsidy of 50% for working women to purchase two-wheelers.", "women, vehicle, work", ""],
    ["Dr. Muthulakshmi Reddy Maternity Benefit", "Women & Child", "BPL", "All Eligible", "Tamil Nadu", "Financial aid of ₹18,000 for pregnant women across the state.", "maternal, health", ""],
    ["Chief Minister's Comprehensive Health Insurance", "Health", "Below 1.2 Lakhs", "All Eligible", "Tamil Nadu", "State health insurance to access quality medical care in empaneled hospitals.", "health, insurance", ""],
    ["Moovalur Ramamirtham Ammaiyar Higher Education", "Education", "No limit", "Student", "Tamil Nadu", "Monthly ₹1000 grant to girls pursuing higher education after Govt schools.", "education, girl, college", ""],
]

data_raw_2 = [
    ["PM-DEVIne", "Development", "No limit", "All Eligible", "All India", "Prime Minister's Development Initiative for North East Region to fund infrastructure.", "infra, north east", ""],
    ["PM-SHRI Schools", "Education", "No limit", "Student", "All India", "Upgradation of 14,500 schools across the country as green schools offering NEP.", "school, student, green", ""],
    ["NAMASTE Scheme", "Social Welfare", "No limit", "All Eligible", "All India", "National Action for Mechanised Sanitation Ecosystem to ensure zero fatalities in sanitation work.", "sanitation, worker", ""],
    ["Rashtriya Gram Swaraj Abhiyan (RGSA)", "Development", "No limit", "All Eligible", "All India", "Transformation of Panchayati Raj Institutions.", "rural, panchayat", ""],
    ["Pradhan Mantri Dakshta Aur Kushalta Sampann Hitgrahi (PM-DAKSH)", "Education", "Refer to portal", "Unemployed", "All India", "Skill development targeting SC, OBC, EBC, DNT, and sanitation workers.", "skill, training", ""],
    ["SMILE Scheme", "Social Welfare", "No limit", "All Eligible", "All India", "Support for Marginalized Individuals for Livelihood and Enterprise (specifically Transgenders and Beggars).", "transgender, marginalized", ""],
    ["Pragati Scholarship", "Education", "Below 8 Lakhs", "Student", "All India", "Scholarship by AICTE specifically for girl students pursuing technical education.", "girl, tech, scholarship", ""],
    ["Saksham Scholarship", "Education", "Below 8 Lakhs", "Student", "All India", "Scholarship by AICTE for specially-abled students pursuing technical education.", "disabled, tech, scholarship", ""],
    ["Udaan Project", "Education", "No limit", "Student", "All India", "Mentoring scheme for girl students to compete for admission at Premier Engineering Colleges.", "girl, engineering, mentoring", ""],
    ["Kishore Vaigyanik Protsahan Yojana (KVPY)", "Education", "No limit", "Student", "All India", "Fellowship in Basic Sciences initiated by Dept of Science.", "science, fellowship", ""],
    ["National Means-cum-Merit Scholarship (NMMS)", "Education", "Below 3.5 Lakhs", "Student", "All India", "Scholarship awarding students studying in class IX to XII to reduce dropout.", "school, scholarship", ""],
    ["INSPIRE Scholarship", "Education", "No limit", "Student", "All India", "Innovation in Science Pursuit for Inspired Research targeting top 1% students.", "science, research", ""],
    ["PM Yuva Yojana", "Business", "No limit", "Business / Entrepreneur", "All India", "Scheme for entrepreneurship education and training.", "youth, business", ""],
    ["PM FME Scheme", "Business", "No limit", "Business / Entrepreneur", "All India", "Formalization of Micro Food Processing Enterprises scheme.", "food, enterprise, msme", ""],
    ["CGTMSE", "Business", "No limit", "Business / Entrepreneur", "All India", "Credit Guarantee Fund Trust for Micro and Small Enterprises without collateral.", "loan, msme, business", ""],
    ["PMEGP", "Business", "No limit", "Business / Entrepreneur", "All India", "Prime Minister's Employment Generation Programme to set up micro-enterprises.", "employment, enterprise", ""],
    ["Coir Udyami Yojana", "Business", "No limit", "Business / Entrepreneur", "All India", "Credit linked subsidy scheme for setting up coir units.", "coir, msme, rural", ""],
    ["Venture Capital Assistance Scheme", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Financial support for agri-business projects via SFAC.", "agri-business, venture", ""],
    ["Dairy Entrepreneurship Development Scheme", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Financial assistance for generating self-employment in the dairy sector.", "dairy, entrepreneur", ""],
    ["National Livestock Mission", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Sustainable development of the livestock sector.", "livestock, rural", ""],
    ["Paramparagat Krishi Vikas Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Promotion of commercial organic farming through FPOs.", "organic, farming", ""],
    ["Pradhan Mantri Krishi Sinchayee Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Improving farm water use efficiency 'More crop per drop'.", "irrigation, water", ""],
    ["Soil Health Card Scheme", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Recommends appropriate dosages of nutrients/fertilizers to improve soil.", "soil, fertilizer", ""],
    ["Pradhan Mantri Fasal Bima Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Crop insurance scheme for farmers to safeguard against natural calamities.", "crop, insurance", ""],
    ["Gramin Bhandaran Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Capital investment subsidy for construction of rural godowns.", "storage, godown", ""],
    ["Pradhan Mantri Matsya Sampada Yojana", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Blue revolution scheme to develop the fisheries sector.", "fisheries, aqua", ""],
    ["National Ayush Mission", "Health", "No limit", "All Eligible", "All India", "Promoting Ayurveda, Yoga, Unani, Siddha, and Homeopathy.", "ayush, health", ""],
    ["Janani Suraksha Yojana", "Health", "BPL", "All Eligible", "All India", "Safe motherhood intervention targeting poor pregnant women.", "maternal, child", ""],
    ["Rashtriya Bal Swasthya Karyakram", "Health", "No limit", "Student", "All India", "Early identification and intervention for children from birth to 18 years.", "child health, disease", ""],
    ["Mission Indradhanush", "Health", "No limit", "All Eligible", "All India", "Immunization drive targeting children and pregnant women against 12 vaccine-preventable diseases.", "vaccine, child", ""],
    ["Pradhan Mantri Bhartiya Janaushadhi Pariyojana", "Health", "No limit", "All Eligible", "All India", "Making quality generic medicines available at affordable prices through special kendras.", "medicine, generic", ""],
    ["Nikshay Poshan Yojana", "Health", "No limit", "All Eligible", "All India", "Financial support of ₹500/month to TB patients for nutritional needs.", "tb, health, nutrition", ""],
    ["Pradhan Mantri Swasthya Suraksha Yojana", "Health", "No limit", "All Eligible", "All India", "Correcting regional imbalances in the availability of affordable/reliable tertiary healthcare.", "hospital, healthcare", ""],
    ["NIDHI - EIR", "Business", "No limit", "Student", "All India", "Entrepreneurs-in-Residence strictly for graduated students to pursue startups.", "startup, tech, student", ""],
    ["PRAYAS", "Business", "No limit", "Business / Entrepreneur", "All India", "Promoting and Accelerating Young and Aspiring technology entrepreneurs (Seed Fund).", "startup, seed, tech", ""],
    ["Digital India Bhashini", "Public Service", "No limit", "All Eligible", "All India", "National Language Translation Mission to make internet available in Indian languages.", "language, digital", ""],
    ["PLI Scheme for Large Scale Electronics", "Business", "No limit", "Business / Entrepreneur", "All India", "Production Linked Incentive for domestic manufacturing.", "manufacturing, corporate", ""],
    ["FAME India II", "Public Service", "No limit", "All Eligible", "All India", "Faster Adoption and Manufacturing of (Hybrid &) Electric Vehicles.", "ev, electric, vehicle", ""],
    ["Ujjwala 2.0", "Social Welfare", "BPL", "All Eligible", "All India", "Providing free LPG connections to women from BPL households.", "lpg, gas, women", ""],
    ["PM KUSUM", "Agriculture", "No limit", "Farmer / Agriculture", "All India", "Subsidies to farmers for setting up solar pumps and grid-connected solar power plants.", "solar, farmer, pump", ""],
]

def append_knowledge_dump():
    if os.path.exists(db_path):
        with open(db_path, "r", encoding="utf-8") as f:
            existing = json.load(f)
    else:
        existing = []

    names_existing = {s["name"].lower().strip() for s in existing}
    added = 0

    all_raw = data_raw_1 + data_raw_2
    
    for row in all_raw:
        if row[0].lower().strip() not in names_existing:
            existing.append({
                "name": row[0],
                "category": row[1],
                "income_limit": row[2],
                "occupation": row[3],
                "state": row[4],
                "benefit": row[5],
                "tags": row[6],
                "url": row[7]
            })
            added += 1

    with open(db_path, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    print(f"✅ Executed Knowledge Dump 1 successfully. Appended {added} unique, real-world schemes. Current Total: {len(existing)}")

if __name__ == "__main__":
    append_knowledge_dump()
