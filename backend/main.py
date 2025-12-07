# app.py2
"""
Gemini-based RAG FastAPI backend (app.py2)
- Uses Gemini embedding endpoint + Gemini chat endpoint via HTTP requests.
- Uses Qdrant for vector search.
- Uses embedding_cache.json to avoid repeated embeddings.
- Configure endpoints & keys in .env

Required .env variables (example below):
GEMINI_API_KEY=your_gemini_key_here
GEMINI_EMBED_ENDPOINT=https://api.example.com/v1/embeddings
GEMINI_CHAT_ENDPOINT=https://api.example.com/v1/chat
GEMINI_EMBED_MODEL=text-embedding-004
GEMINI_CHAT_MODEL=gemini-chat-1.0

QDRANT_URL=https://your-qdrant-host:6333
QDRANT_API_KEY=your_qdrant_api_key_if_required
COLLECTION_NAME=book_chunks_1024
"""

import os
import json
import time
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from qdrant_client import QdrantClient
import requests

# Load environment
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_EMBED_ENDPOINT = os.getenv("GEMINI_EMBED_ENDPOINT")
GEMINI_CHAT_ENDPOINT = os.getenv("GEMINI_CHAT_ENDPOINT")
GEMINI_EMBED_MODEL = os.getenv("GEMINI_EMBED_MODEL", "text-embedding-004")
GEMINI_CHAT_MODEL = os.getenv("GEMINI_CHAT_MODEL", "gemini-chat-1.0")

QDRANT_URL = os.getenv("QDRANT_URL")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY")
COLLECTION_NAME = os.getenv("COLLECTION_NAME", "book_chunks_1024")

EMBED_CACHE_FILE = os.getenv("EMBED_CACHE_FILE", "embedding_cache.json")
EMBED_TIMEOUT = int(os.getenv("EMBED_TIMEOUT", "60"))
CHAT_TIMEOUT = int(os.getenv("CHAT_TIMEOUT", "60"))

# Basic validation
if not (GEMINI_API_KEY and GEMINI_EMBED_ENDPOINT and GEMINI_CHAT_ENDPOINT and QDRANT_URL):
    raise RuntimeError("Please set GEMINI_API_KEY, GEMINI_EMBED_ENDPOINT, GEMINI_CHAT_ENDPOINT, and QDRANT_URL in .env")

# Qdrant client
client = QdrantClient(url=QDRANT_URL, api_key=QDRANT_API_KEY)

# Load / init embedding cache
if os.path.exists(EMBED_CACHE_FILE):
    try:
        with open(EMBED_CACHE_FILE, "r", encoding="utf-8") as f:
            embedding_cache = json.load(f)
    except Exception:
        embedding_cache = {}
else:
    embedding_cache = {}

def save_cache():
    try:
        with open(EMBED_CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(embedding_cache, f, ensure_ascii=False)
    except Exception as e:
        print("Warning: failed to save embedding cache:", e)

# FastAPI setup
app = FastAPI(title="RAG Chatbot (Gemini + Qdrant)")

# Pydantic models
class QueryRequest(BaseModel):
    question: str
    selected_text: Optional[str] = None

class Source(BaseModel):
    chapter: Optional[str] = None
    section: Optional[str] = None
    url: Optional[str] = None

class QueryResponse(BaseModel):
    answer: str
    sources: List[Source] = []
    meta: Optional[dict] = {}

# Helpers for Gemini embed & chat (HTTP)
def gemini_embed_texts(texts: List[str]) -> Optional[List[List[float]]]:
    """
    Call the Gemini embedding endpoint for a list of texts.
    Adjust response parsing if your endpoint uses a different JSON shape.
    Expected request body: {"model": "...", "input": ["t1","t2",...]}
    Expected response common shapes:
      - {"data": [{"embedding": [...]}, ...]}
      - {"embeddings": [[...], ...]}
    """
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}", "Content-Type": "application/json"}
    payload = {"model": GEMINI_EMBED_MODEL, "input": texts}
    try:
        resp = requests.post(GEMINI_EMBED_ENDPOINT, json=payload, headers=headers, timeout=EMBED_TIMEOUT)
    except Exception as e:
        print("Embed request failed:", e)
        return None

    if resp.status_code != 200:
        print("Embed API non-200:", resp.status_code, resp.text[:400])
        return None

    j = resp.json()
    # Try common shapes:
    if isinstance(j, dict) and "data" in j and isinstance(j["data"], list):
        embeddings = []
        for d in j["data"]:
            if isinstance(d, dict) and "embedding" in d:
                embeddings.append(d["embedding"])
            elif isinstance(d, list):
                embeddings.append(d)
            else:
                # fallback: store None
                embeddings.append(None)
        return embeddings
    if "embeddings" in j and isinstance(j["embeddings"], list):
        return j["embeddings"]
    # fallback single embedding
    if "embedding" in j:
        return [j["embedding"]]
    # if unknown shape, return None (caller must handle)
    print("Unexpected embedding response shape:", list(j.keys()) if isinstance(j, dict) else type(j))
    return None

def gemini_chat(system_prompt: str, user_prompt: str, max_tokens: int = 500) -> Optional[str]:
    """
    Call the Gemini chat endpoint. Adjust parsing for your provider's response shape.
    Expected request body typical shape:
      {"model": "...", "messages": [{"role":"system","content":"..."}, {"role":"user","content":"..."}], ...}
    """
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}", "Content-Type": "application/json"}
    body = {
        "model": GEMINI_CHAT_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        # may vary depending on implementation: some endpoints use "max_output_tokens"
        "max_output_tokens": max_tokens,
        "temperature": 0.2
    }
    try:
        resp = requests.post(GEMINI_CHAT_ENDPOINT, json=body, headers=headers, timeout=CHAT_TIMEOUT)
    except Exception as e:
        print("Chat request failed:", e)
        return None

    if resp.status_code != 200:
        print("Chat API non-200:", resp.status_code, resp.text[:600])
        return None

    j = resp.json()
    # Try a few common locations for the assistant text:
    # 1) Vertex-like: {"output": {"content": [{"type":"output_text","text":"..."}]}} or similar
    if isinstance(j, dict):
        # Vertex-style / Google generative style
        if "output" in j and isinstance(j["output"], dict):
            content = j["output"].get("content")
            if isinstance(content, list):
                # join all text fields
                parts = []
                for item in content:
                    if isinstance(item, dict):
                        # some formats use {"text": "..."} or {"type":"output_text","text":"..."}
                        if "text" in item:
                            parts.append(item.get("text",""))
                        elif "content" in item and isinstance(item["content"], dict) and "text" in item["content"]:
                            parts.append(item["content"]["text"])
                    elif isinstance(item, str):
                        parts.append(item)
                if parts:
                    return " ".join(parts).strip()
        # OpenAI-like: {"choices":[{"message":{"content":"..."}}]}
        if "choices" in j and isinstance(j["choices"], list) and len(j["choices"])>0:
            first = j["choices"][0]
            # try common keys
            msg = first.get("message") or first.get("delta") or first
            if isinstance(msg, dict):
                # message may contain "content" or "content":[{"text":"..."}]
                # try nested content
                if "content" in msg:
                    cont = msg["content"]
                    if isinstance(cont, list):
                        # join text fields
                        texts = []
                        for c in cont:
                            if isinstance(c, dict) and "text" in c:
                                texts.append(c["text"])
                            elif isinstance(c, str):
                                texts.append(c)
                        if texts:
                            return " ".join(texts).strip()
                    elif isinstance(cont, str):
                        return cont.strip()
                # fallback to "content" less structured
                if "content" in first:
                    if isinstance(first["content"], str):
                        return first["content"].strip()
            # fallback to "text"
            if "text" in first and isinstance(first["text"], str):
                return first["text"].strip()
        # top-level "text"
        if "text" in j and isinstance(j["text"], str):
            return j["text"].strip()
    # If none matched, return compact JSON string (for debugging)
    try:
        return json.dumps(j)[:1500]
    except Exception:
        return str(j)

# Qdrant search helper
def search_qdrant_by_embedding(embedding: List[float], top_k: int = 5):
    try:
        results = client.search(collection_name=COLLECTION_NAME, query_vector=embedding, limit=top_k, with_payload=True)
    except Exception as e:
        print("Qdrant search error:", e)
        return []
    chunks = []
    for r in results:
        payload = r.payload or {}
        chunks.append({
            "text": payload.get("text", ""),
            "chapter": payload.get("chapter"),
            "chunk_index": payload.get("chunk_index"),
            "score": getattr(r, "score", None)
        })
    return chunks

@app.get("/")
async def root():
    return {"message": "RAG Chatbot (Gemini + Qdrant) running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.post("/query", response_model=QueryResponse)
async def query_route(req: QueryRequest):
    question = (req.question or "").strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    # 1) Get or compute embedding (cache-first)
    emb = None
    if question in embedding_cache:
        emb = embedding_cache[question]
    else:
        # request embedding for query
        embeddings = gemini_embed_texts([question])
        if not embeddings or embeddings[0] is None:
            return QueryResponse(answer="Embedding failed or service unavailable. Please try again later.", sources=[], meta={"rate_limited": True})
        emb = embeddings[0]
        # store in cache
        try:
            embedding_cache[question] = emb
            save_cache()
        except Exception:
            pass

    # 2) Search Qdrant
    results = search_qdrant_by_embedding(emb, top_k=5)
    if not results:
        return QueryResponse(answer="No relevant passages found in the textbook.", sources=[], meta={"source_count": 0})

    # 3) Build context text (prioritize selected_text)
    contexts = [r["text"] for r in results]
    if req.selected_text and req.selected_text.strip():
        contexts.insert(0, req.selected_text.strip())

    context_str = "\n\n".join([f"Passage {i+1}:\n{c}" for i, c in enumerate(contexts)])

    system_prompt = (
        "You are an expert assistant specialized in Physical AI & Humanoid Robotics. "
        "Answer the user's question using ONLY the information contained in the provided passages. "
        "Be precise, technical, and concise. If the answer is not present in the passages, reply: "
        "\"I don't know based on the textbook.\""
    )

    user_prompt = f"Context:\n{context_str}\n\nQuestion: {question}\nAnswer:"

    # 4) Call Gemini chat
    answer = gemini_chat(system_prompt, user_prompt, max_tokens=500)
    if not answer:
        return QueryResponse(answer="Chat generation failed. Please try again later.", sources=[], meta={"chat_failed": True})

    # 5) Build sources list
    sources = []
    for r in results:
        sources.append(Source(chapter=r.get("chapter"), section=f"Chunk {r.get('chunk_index')}", url=None))

    return QueryResponse(answer=answer.strip(), sources=sources[:5], meta={"source_count": len(results)})
