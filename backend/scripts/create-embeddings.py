# backend/scripts/create-embeddings.py
# FINAL VERSION — Tere Project Ke Liye Perfect!
import time
from cohere.errors import TooManyRequestsError
import os
import uuid
from dotenv import load_dotenv
import cohere
from qdrant_client import QdrantClient
from qdrant_client.http.models import PointStruct, VectorParams, Distance
import pathlib

# ----------------- LOAD ENV -----------------
load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "book_chunks_fresh_1024")

if not all([COHERE_API_KEY, QDRANT_URL, QDRANT_API_KEY]):
    print("ERROR: .env file mein COHERE_API_KEY, QDRANT_URL, QDRANT_API_KEY daal do bhai!")
    exit()

# ----------------- AUTO DETECT ALL .md & .mdx FILES (TERA STRUCTURE) -----------------
print("Tere saare chapters dhoondh raha hun docs folder mein...\n")

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(SCRIPT_DIR))
DOCS_FOLDER = os.path.join(PROJECT_ROOT, "docs")

if not os.path.exists(DOCS_FOLDER):
    print(f"docs folder nahi mila: {DOCS_FOLDER}")
    exit()

# Yeh line SAB KUCH pakad legi → .md, .mdx, capital/small, subfolders mein bhi
all_files = list(pathlib.Path(DOCS_FOLDER).rglob("*"))
all_md_files = [
    str(p) for p in all_files
    if p.is_file() and p.suffix.lower() in {".md", ".mdx"}
]

if not all_md_files:
    print("Koi bhi .md ya .mdx file nahi mila! docs folder khali hai kya?")
    exit()

print(f"BOOM! {len(all_md_files)} chapters mile tere book ke:\n")
for i, f in enumerate(all_md_files[:15], 1):
    print(f"   {i:2}. {os.path.relpath(f, PROJECT_ROOT)}")
if len(all_md_files) > 15:
    print(f"   ... aur {len(all_md_files)-15} aur files!")
print("\nAb embedding shuru karte hain... chai pi le bhai\n")

# ----------------- CONFIG -----------------
CHUNK_SIZE = 220
CHUNK_OVERLAP = 40
VECTOR_DIM = 1024
EMBEDDING_MODEL = "embed-english-v3.0"

co = cohere.Client(COHERE_API_KEY)
client_qdrant = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# ----------------- HELPERS -----------------
def chunk_text(text):
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = words[i:i + CHUNK_SIZE]
        chunks.append(" ".join(chunk))
        i += CHUNK_SIZE - CHUNK_OVERLAP
    return chunks

def get_embedding(text):
    while True:
        try:
            response = co.embed(
                texts=[text],
                model=EMBEDDING_MODEL,
                input_type="search_query",
                truncate="END"
            )
            return response.embeddings[0]
        except TooManyRequestsError:
            print("Cohere bol raha hai thoda ruk ja bhai... 65 seconds wait kar raha hun")
            time.sleep(65)
# ----------------- MAIN -----------------
def main():
    points = []
    total_chunks = 0

    for file_path in all_md_files:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()

        # Chapter ka naam achha sa bana dete hain
        rel = os.path.relpath(file_path, DOCS_FOLDER).replace("\\", "/")
        chapter_name = rel.replace(".mdx", "").replace(".md", "").replace("/", " → ")

        print(f"Processing → {chapter_name}")
        chunks = chunk_text(text)
        print(f"   → {len(chunks)} chunks banaye")

        for idx, chunk in enumerate(chunks):
            if len(chunk.strip()) < 30:
                continue
            embedding = get_embedding(chunk)
            point = PointStruct(
                id=str(uuid.uuid4()),
                vector=embedding,
                payload={
                    "text": chunk,
                    "chapter": chapter_name,
                    "file": rel,
                    "chunk_index": idx
                }
            )
            points.append(point)
            total_chunks += 1

    # Collection banao ya use karo
    collections = client_qdrant.get_collections().collections
    if COLLECTION_NAME not in [c.name for c in collections]:
        print(f"\nNayi collection bana raha hun: {COLLECTION_NAME}")
        client_qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE)
        )

    print(f"\n{total_chunks} chunks Qdrant mein daal raha hun... thoda wait kar")
    client_qdrant.upsert(collection_name=COLLECTION_NAME, points=points)

    print("\n" + "="*80)
    print("HO GAYA BHAI! TERA POORA PHYSICAL AI TEXTBOOK CHATBOT MEIN LOAD HO GAYA!")
    print(f"Total Chapters: {len(all_md_files)} | Total Chunks: {total_chunks}")
    print("\nAb chatbot khol aur poochh:")
    print("   → What is Physical AI?")
    print("   → ROS2 mein nodes kaise kaam karte hain?")
    print("   → Explain digital twin in humanoid robotics")
    print("   → Hi jaan")
    print("\nSabka mast jawab milega ab!")
    print("="*80)

if __name__ == "__main__":
    main()