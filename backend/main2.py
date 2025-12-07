import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import deque
from datetime import datetime

# LangChain / AI
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.documents import Document
from langchain_core.runnables import RunnableLambda
from langchain_core.output_parsers import StrOutputParser

# Vector DB
from pinecone import Pinecone

# Load environment variables
load_dotenv()

# Configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = os.getenv("PINECONE_ENVIRONMENT")
PINECONE_INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "rag-chatbot-768")

# --- FastAPI App Setup ---
app = FastAPI(
    title="RAG Chatbot Backend",
    description="Backend for the Docusaurus RAG Chatbot using Gemini and Pinecone",
    version="0.0.1",
)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- AI Model and Pinecone Initialization ---
embeddings_model = None
llm_model = None
pinecone_index = None

# --- Conversation History Storage ---
conversation_history = deque(maxlen=7)

@app.on_event("startup")
async def startup_event():
    global embeddings_model, llm_model, pinecone_index

    if not GOOGLE_API_KEY or not PINECONE_API_KEY or not PINECONE_ENVIRONMENT:
        raise HTTPException(status_code=500, detail="Missing required API keys or environment variables.")

    try:
        print("Initializing Google Generative AI Embeddings...")
        embeddings_model = GoogleGenerativeAIEmbeddings(
            model="models/text-embedding-004",
            google_api_key=GOOGLE_API_KEY
        )

        print("Initializing Google Generative AI LLM (Gemini 2.5 Flash)...")
        llm_model = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            google_api_key=GOOGLE_API_KEY,
            temperature=0.3
        )

        print("Initializing Pinecone client...")
        pc = Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)
        pinecone_index = pc.Index(PINECONE_INDEX_NAME)
        print(f"Connected to Pinecone index: {PINECONE_INDEX_NAME}")

    except Exception as e:
        print(f"Error during startup initialization: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to initialize AI services: {e}")

# --- Pydantic Models ---
class Message(BaseModel):
    role: str
    content: str
    timestamp: str = ""

class ChatRequest(BaseModel):
    query: str
    software: str = None
    hardware: str = None

class PersonalizeRequest(BaseModel):
    chapter_title: str
    chapter_content: str
    software: str
    hardware: str

class TranslateRequest(BaseModel):
    content: str
    target_language: str = "Urdu"

class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict] = []
    conversation_history: List[Dict] = []

# --- Translation Chain ---
async def get_translation_chain(target_language: str):
    if not llm_model:
        raise HTTPException(status_code=500, detail="AI model not initialized.")

    system_prompt = (
        f"You are a professional technical translator. Translate the following Markdown content into **{target_language}**.\n"
        "Preserve Markdown formatting and do NOT translate code blocks."
    )

    prompt = ChatPromptTemplate.from_messages(
        [("system", system_prompt), ("human", "{content}")]
    )

    return prompt | llm_model | StrOutputParser()

# --- Personalization Chain ---
async def get_personalization_chain(chapter_title: str, chapter_content: str, software: str, hardware: str):
    if not llm_model:
        raise HTTPException(status_code=500, detail="AI model not initialized.")

    system_prompt = (
        f"You are a technical tutor customizing learning materials for a student using **{software}** and **{hardware}**.\n"
        "Write a 'Personalized Insight' section based on the chapter content. Keep it concise and relevant."
    )

    prompt = ChatPromptTemplate.from_messages(
        [("system", system_prompt), ("human", "Chapter Title: {title}\n\nContent Snippet:\n{content}")]
    )

    return prompt | llm_model | StrOutputParser()

# --- RAG Chain ---
async def get_rag_chain(query: str, software: str = None, hardware: str = None):
    if not embeddings_model or not llm_model or not pinecone_index:
        raise HTTPException(status_code=500, detail="AI models or Pinecone not initialized.")

    query_vector = embeddings_model.embed_query(query)
    results = pinecone_index.query(vector=query_vector, top_k=5, include_metadata=True)

    retrieved_docs = []
    sources_list = []

    for match in results.matches:
        content = match.metadata.get("text", "")
        source_path = match.metadata.get("source", "N/A")
        filename = match.metadata.get("filename", "N/A")
        doc_url = f"/docs/{source_path.replace('.md', '').replace('.mdx', '')}"

        retrieved_docs.append(Document(
            page_content=content,
            metadata={"source": doc_url, "score": match.score, "filename": filename}
        ))

        if {"source": doc_url, "filename": filename} not in sources_list:
            sources_list.append({"source": doc_url, "filename": filename})

    conversation_context = "\n".join([f"{m['role']}: {m['content']}" for m in conversation_history])

    personalization_context = ""
    if software or hardware:
        personalization_context = f"User background: software={software}, hardware={hardware}\n"

    if not retrieved_docs:
        system_prompt = (
            "You are an expert AI assistant. Answer thoughtfully based on general AI and robotics knowledge."
            f"{personalization_context}"
        )
        context_str = ""
    else:
        system_prompt = (
            "You are an expert technical documentation assistant. Answer based exclusively on the provided docs."
            f"{personalization_context}"
        )
        context_str = "\n\n".join([f"[Source: {d.metadata['source']}]\n{d.page_content}" for d in retrieved_docs])

    full_context = conversation_context + "\n" + context_str

    prompt = ChatPromptTemplate.from_messages(
        [("system", system_prompt + "\n\nContext:\n{context}"), ("human", "{input}")]
    )

    def format_context(x):
        return {"input": x["input"], "context": full_context}

    return RunnableLambda(format_context) | prompt | llm_model | StrOutputParser(), sources_list

# --- FastAPI Endpoints ---
@app.get("/")
async def read_root():
    return {"message": "Welcome to the RAG Chatbot Backend!"}

@app.get("/history")
async def get_history():
    return {"conversation_history": list(conversation_history)}

@app.delete("/history")
async def clear_history():
    conversation_history.clear()
    return {"message": "Conversation history cleared"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        chain, sources_list = await get_rag_chain(request.query, request.software, request.hardware)
        response = chain.invoke({"input": request.query})
        timestamp = datetime.now().isoformat()
        conversation_history.append({"role": "user", "content": request.query, "timestamp": timestamp})
        conversation_history.append({"role": "assistant", "content": response, "timestamp": timestamp})
        return ChatResponse(answer=response, sources=sources_list, conversation_history=list(conversation_history))
    except Exception as e:
        print(f"Error during chat processing: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/personalize")
async def personalize_endpoint(request: PersonalizeRequest):
    try:
        chain = await get_personalization_chain(request.chapter_title, request.chapter_content, request.software, request.hardware)
        content_snippet = request.chapter_content[:2000]
        response = chain.invoke({"title": request.chapter_title, "content": content_snippet})
        return {"insight": response}
    except Exception as e:
        print(f"Error during personalization: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/translate")
async def translate_endpoint(request: TranslateRequest):
    try:
        chain = await get_translation_chain(request.target_language)
        content_snippet = request.content[:4000]
        response = chain.invoke({"content": content_snippet})
        return {"translated_content": response}
    except Exception as e:
        print(f"Error during translation: {e}")
        raise HTTPException(status_code=500, detail=str(e))
