import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

if not url or not key or "your_supabase" in url:
    print("❌ Error: SUPABASE_URL and SUPABASE_KEY must be set in .env")
    exit(1)

supabase: Client = create_client(url, key)

def migrate():
    # Load schemes from JSON
    schemes_path = "schemes.json"
    if not os.path.exists(schemes_path):
        print(f"❌ Error: {schemes_path} not found.")
        return

    with open(schemes_path, "r", encoding="utf-8") as f:
        schemes = json.load(f)

    print(f"📦 Found {len(schemes)} schemes in JSON. Starting migration...")

    # Upload in chunks (to avoid payload limits)
    chunk_size = 50
    for i in range(0, len(schemes), chunk_size):
        chunk = schemes[i:i + chunk_size]
        try:
            # We assume the table is named 'schemes'
            response = supabase.table("schemes").insert(chunk).execute()
            print(f"✅ Uploaded chunk {i//chunk_size + 1} ({len(chunk)} records)")
        except Exception as e:
            print(f"❌ Error uploading chunk: {e}")
            print("💡 Tip: Make sure the 'schemes' table exists in Supabase with columns: name, category, income_limit, occupation, state, benefit, tags, url.")
            break

    print("\n🎉 Migration complete!")

if __name__ == "__main__":
    migrate()
