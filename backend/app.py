from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from fastapi.middleware.cors import CORSMiddleware
import os
from qdrant_client import QdrantClient
from dotenv import load_dotenv
import cohere
import time
import cohere.errors
import json

# ---------------- ENV ----------------
load_dotenv()

COHERE_API_KEY = os.getenv("COHERE_API_KEY")
if not COHERE_API_KEY:
    raise ValueError("COHERE_API_KEY is missing in .env")

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
if not QDRANT_URL or not QDRANT_API_KEY:
    raise ValueError("QDRANT_URL or QDRANT_API_KEY is missing in .env")

COLLECTION_NAME = os.getenv("COLLECTION_NAME", "book_chunks_fresh_1024")

# ---------------- Clients ----------------
co = cohere.Client(COHERE_API_KEY)
client_qdrant = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY
)

# ---------------- FastAPI ----------------
app = FastAPI(title="Physical AI & Humanoid Robotics RAG Chatbot")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Models ----------------
class QueryRequest(BaseModel):
    question: str
    selected_text: Optional[str] = None

class Source(BaseModel):
    chapter: str
    section: Optional[str] = None
    url: Optional[str] = None

class QueryResponse(BaseModel):
    answer: str
    sources: Optional[List[Source]] = []

# ---------------- Embedding Cache ----------------
embedding_cache_file = "embedding_cache.json"
embedding_cache = {}

if os.path.exists(embedding_cache_file):
    with open(embedding_cache_file, "r") as f:
        embedding_cache = json.load(f)

def save_embedding_cache():
    with open(embedding_cache_file, "w") as f:
        json.dump(embedding_cache, f)

# ---------------- Helper Functions ----------------
def get_embedding(text: str) -> List[float]:
    """Generate query embedding using Cohere, with caching and rate-limit handling."""
    if text in embedding_cache:
        return embedding_cache[text]

    try:
        response = co.embed(
            texts=[text],
            model="embed-english-v3.0",
            input_type="search_query",
            truncate="NONE"
        )
        embedding = response.embeddings[0]
        embedding_cache[text] = embedding
        save_embedding_cache()
        return embedding
    except cohere.errors.TooManyRequestsError:
        print("Rate limit hit on embedding!")
        return []  # Return empty embedding instead of waiting
    except Exception as e:
        print(f"Unexpected embedding error: {e}")
        return []

def search_qdrant(query: str, top_k: int = 5) -> List[dict]:
    """Search Qdrant for relevant chunks."""
    embedding = get_embedding(query)
    if not embedding:
        return []

    try:
        results = client_qdrant.search(
            collection_name=COLLECTION_NAME,
            query_vector=embedding,
            limit=top_k,
            with_payload=True
        )
    except Exception as e:
        print(f"Qdrant search error: {e}")
        return []

    chunks = []
    for r in results:
        payload = r.payload or {}
        chunks.append({
            "text": payload.get("text", ""),
            "chapter": payload.get("chapter", "Unknown"),
            "chunk_index": payload.get("chunk_index", 0),
            "score": r.score
        })
    return chunks

def generate_answer(contexts: List[str], question: str) -> str:
    """Generate answer using Cohere chat, with rate-limit handling."""
    if not contexts:
        return "I'm sorry, I couldn't find relevant information or the API rate limit was reached."

    context_str = "\n\n".join([f"Passage {i+1}:\n{ctx}" for i, ctx in enumerate(contexts)])
    prompt = f"""
You are an expert AI assistant specialized in Physical AI and Humanoid Robotics. 
Use only the information from the provided passages below to answer the user's question.
Be precise, technical, and concise. If the answer is not in the context, say "I don't know based on the textbook."
Context from the textbook: {context_str}
Question: {question}
Answer:
"""
    try:
        response = co.chat(
            model="command-r-plus",
            message=prompt,
            temperature=0.3,
            max_tokens=500
        )
        return response.text.strip()
    except cohere.errors.TooManyRequestsError:
        print("Rate limit hit on chat!")
        return "API rate limit reached. Please try again in a few seconds."
    except Exception as e:
        print(f"Unexpected chat error: {e}")
        return "Sorry, there was an issue generating the answer. Please try again."

# ---------------- Routes ----------------
@app.get("/")
async def root():
    return {"message": "Physical AI & Humanoid Robotics RAG Chatbot Backend is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Backend is up and running!"}

@app.post("/query", response_model=QueryResponse)
async def query_chatbot(req: QueryRequest):
    if not req.question or not req.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    question = req.question.strip()

    # Retrieve relevant chunks
    search_results = search_qdrant(question, top_k=5)
    contexts = [r["text"] for r in search_results]

    # Optionally boost with selected text from frontend
    if req.selected_text and req.selected_text.strip():
        contexts.insert(0, req.selected_text.strip())

    # Generate answer
    answer = generate_answer(contexts, question)

    # Extract sources for citation
    sources = []
    for r in search_results:
        sources.append(Source(
            chapter=r["chapter"],
            section=f"Chunk {r['chunk_index']}",
            url=""
        ))

    return QueryResponse(answer=answer, sources=sources[:5])






