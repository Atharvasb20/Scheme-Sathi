import requests, json

# Try different endpoints and parameters
endpoints_to_try = [
    ("v6 default", "https://api.myscheme.gov.in/search/v6/schemes", {'lang':'en','q':'[]','keyword':'','sort':'','from':'0','size':'5'}),
    ("v6 no q", "https://api.myscheme.gov.in/search/v6/schemes", {'lang':'en','keyword':'','from':'0','size':'5'}),
    ("v4", "https://api.myscheme.gov.in/search/v4/schemes", {'lang':'en','keyword':'','from':'0','size':'5'}),
    ("v3", "https://api.myscheme.gov.in/search/v3/schemes", {'lang':'en','keyword':'','from':'0','size':'5'}),
]

HEADERS = {
    'x-api-key': 'tYTy5eEhlu9rFjyxuCr7ra7ACp4dv1RH8gWuHTDc',
    'Accept': 'application/json',
    'Origin': 'https://www.myscheme.gov.in',
    'Referer': 'https://www.myscheme.gov.in/'
}

for name, url, params in endpoints_to_try:
    try:
        r = requests.get(url, headers=HEADERS, params=params, timeout=10)
        d = r.json()
        # walk every key to find something with length > 0
        def find_list(obj, path=""):
            if isinstance(obj, list) and len(obj) > 0:
                print(f"  FOUND LIST at {path}: len={len(obj)}, first_keys={list(obj[0].keys()) if isinstance(obj[0],dict) else type(obj[0])}")
                return True
            if isinstance(obj, dict):
                for k,v in obj.items():
                    if find_list(v, f"{path}.{k}"):
                        return True
            return False
        print(f"\n=== {name} ({r.status_code}) ===")
        found = find_list(d)
        if not found:
            print("  No non-empty lists found.")
            print("  Top keys:", list(d.keys()))
    except Exception as e:
        print(f"  ERROR: {e}")
