import os
from typing import List, Dict
from dotenv import load_dotenv

# LangChain / AI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# Pinecone v8
from pinecone import Pinecone, ServerlessSpec

# Load environment variables
load_dotenv()

# ----------------- Configuration -----------------
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")          # e.g., us-east1-aws
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "rag-chatbot-768")

# ----------------- Functions -----------------
def load_docs(docs_dir: str) -> List[Dict]:
    documents = []
    print(f"Scanning directory: {docs_dir}")
    
    if not os.path.exists(docs_dir):
        raise FileNotFoundError(f"Directory not found: {docs_dir}")

    for root, _, files in os.walk(docs_dir):
        for file in files:
            if file.endswith(".md") or file.endswith(".mdx"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        relative_path = os.path.relpath(file_path, docs_dir)
                        documents.append({
                            "content": content,
                            "source": relative_path,
                            "filename": file
                        })
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
    
    print(f"Loaded {len(documents)} documents.")
    return documents

def chunk_text(documents: List[Dict]) -> List[Dict]:
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n\n", "\n", " ", ""]
    )
    
    chunks = []
    for doc in documents:
        splits = text_splitter.split_text(doc["content"])
        for i, text in enumerate(splits):
            chunks.append({
                "id": f"{doc['source']}#{i}".replace("\\", "/"),
                "text": text,
                "source": doc["source"],
                "filename": doc["filename"]
            })
    print(f"Created {len(chunks)} chunks from {len(documents)} documents.")
    return chunks

# ----------------- Main ingestion -----------------
def ingest_data():
    # 1. Check Keys
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY is missing in .env")
    if not PINECONE_API_KEY:
        raise ValueError("PINECONE_API_KEY is missing in .env")
    if not PINECONE_ENV:
        raise ValueError("PINECONE_ENV is missing in .env")

    print("Initializing AI models...")
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        google_api_key=GOOGLE_API_KEY
    )

    # Detect embedding dimension automatically
    sample_vector = embeddings.embed_documents(["test"])
    embedding_dim = len(sample_vector[0])
    print(f"Embedding dimension detected: {embedding_dim}")

    # ----------------- Pinecone v8 -----------------
    pc = Pinecone(api_key=PINECONE_API_KEY)

    # Create index if it doesn't exist
    if PINECONE_INDEX_NAME not in pc.list_indexes().names():
        pc.create_index(
            name=PINECONE_INDEX_NAME,
            dimension=embedding_dim,  # automatically matched
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",           # or "gcp"
                region="us-east-1"     # match your PINECONE_ENV
            )
        )
        print(f"Created index: {PINECONE_INDEX_NAME}")
    else:
        print(f"Index already exists: {PINECONE_INDEX_NAME}")

    index = pc.Index(PINECONE_INDEX_NAME)

    # ----------------- Load documents -----------------
    docs_path = r"E:\MY AI BOOK with chatbot\AI Book\Physical-AI-Humanoid-Robotics-Textbook\docs"
    docs = load_docs(docs_path)
    if not docs:
        print("No documents found. Exiting.")
        return

    # ----------------- Chunk documents -----------------
    chunks = chunk_text(docs)

    # ----------------- Embed and upsert -----------------
    batch_size = 50
    total_batches = (len(chunks) + batch_size - 1) // batch_size
    
    print(f"Starting upload to Pinecone index '{PINECONE_INDEX_NAME}'...")

    for i in range(0, len(chunks), batch_size):
        batch = chunks[i : i + batch_size]
        texts = [c["text"] for c in batch]

        try:
            vectors = embeddings.embed_documents(texts)
        except Exception as e:
            print(f"Error embedding batch {i}: {e}")
            continue

        to_upsert = []
        for j, vector in enumerate(vectors):
            item = batch[j]
            metadata = {
                "text": item["text"],
                "source": item["source"],
                "filename": item["filename"]
            }
            to_upsert.append((item["id"], vector, metadata))

        try:
            index.upsert(vectors=to_upsert)
            print(f"Uploaded batch {i // batch_size + 1}/{total_batches}")
        except Exception as e:
            print(f"Error uploading batch {i}: {e}")

    print("Ingestion complete!")

# ----------------- Run -----------------
if __name__ == "__main__":
    ingest_data()


