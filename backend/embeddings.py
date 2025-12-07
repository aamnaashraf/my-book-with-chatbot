# embeddings.py
import os
import json
import time
from dotenv import load_dotenv
from qdrant_client import QdrantClient
import requests

# ---------------- ENV ----------------
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_EMBED_MODEL = os.getenv("GEMINI_EMBED_MODEL", "text-embedding-004")
GEMINI_EMBED_ENDPOINT = os.getenv("GEMINI_EMBED_ENDPOINT")

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
EMBED_BATCH_SIZE = int(os.getenv("EMBED_BATCH_SIZE", 16))

if not all([GEMINI_API_KEY, GEMINI_EMBED_MODEL, GEMINI_EMBED_ENDPOINT, QDRANT_URL, QDRANT_API_KEY, COLLECTION_NAME]):
    raise ValueError("Some environment variables are missing in .env")

# ---------------- Qdrant Client ----------------
client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# ---------------- Embedding Cache ----------------
embedding_cache_file = "embedding_cache.json"
embedding_cache = {}

if os.path.exists(embedding_cache_file):
    with open(embedding_cache_file, "r", encoding="utf-8") as f:
        embedding_cache = json.load(f)

def save_cache():
    with open(embedding_cache_file, "w", encoding="utf-8") as f:
        json.dump(embedding_cache, f, ensure_ascii=False, indent=2)

# ---------------- Gemini Embedding Function ----------------
def get_gemini_embedding(text):
    if text in embedding_cache:
        return embedding_cache[text]

    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {"text": text}

    while True:
        try:
            response = requests.post(GEMINI_EMBED_ENDPOINT, headers=headers, json=payload)
            if response.status_code == 200:
                data = response.json()
                vector = data.get("embedding")
                if vector:
                    embedding_cache[text] = vector
                    save_cache()
                    return vector
                else:
                    print("No embedding returned, retrying in 10s...")
                    time.sleep(10)
            elif response.status_code == 429:
                print("Rate limit hit! Waiting 60s...")
                time.sleep(60)
            else:
                print(f"Embedding API error {response.status_code}: {response.text}")
                time.sleep(10)
        except Exception as e:
            print(f"Unexpected error: {e}. Retrying in 10s...")
            time.sleep(10)

# ---------------- Fetch Chunks from Qdrant ----------------
def fetch_chunks():
    try:
        scroll_result = client.scroll(
            collection_name=COLLECTION_NAME,
            with_payload=True,
            limit=1000
        )
        chunks = []
        for point in scroll_result:
            payload = point.payload if hasattr(point, "payload") else point.get("payload", {})
            text = payload.get("text")
            if text:
                # truncate if too long for Gemini
                if len(text) > 2000:
                    text = text[:2000]
                chunks.append({"id": point.id, "text": text})
        return chunks
    except Exception as e:
        print(f"Error while scrolling collection: {e}")
        return []

# ---------------- Main ----------------
def main():
    print(f"Fetching chunks from Qdrant collection '{COLLECTION_NAME}'...")
    chunks = fetch_chunks()
    print(f"Total chunks discovered: {len(chunks)}")

    # Filter out already cached
    chunks_to_embed = [c for c in chunks if c["text"] not in embedding_cache]
    print(f"Chunks needing embeddings: {len(chunks_to_embed)}")

    for idx, chunk in enumerate(chunks_to_embed, 1):
        print(f"[{idx}/{len(chunks_to_embed)}] Embedding chunk id={chunk['id']}")
        embedding = get_gemini_embedding(chunk["text"])
        time.sleep(0.1)  # small delay to avoid spamming API

    print("All embeddings processed and saved to embedding_cache.json.")

if __name__ == "__main__":
    main()
