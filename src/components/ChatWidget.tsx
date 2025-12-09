import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const toggleChat = () => setIsOpen(prev => !prev);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { sender: "user", text: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed, software: "Python", hardware: "NVIDIA Jetson" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || "Network error"}`);
      }

      const data = await response.json();
      const aiText = data?.answer?.trim() || "No response from AI.";
      const aiMessage: Message = { sender: "ai", text: aiText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      const errorText = error.message.includes("Failed to fetch") ? "Cannot reach backend." : `Error: ${error.message}`;
      setMessages(prev => [...prev, { sender: "ai", text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Gradient colors
  const chatBg = "linear-gradient(135deg, #e4bdd7ff, #fce096ff)"; // background behind chat
  const defaultBoxBg = "linear-gradient(135deg, #8acdd6ff, #ffe3ff)"; // default center box
  const userBubble = "#642a58ff";
  const aiBubble = "#fff";
  const inputBg = "#ffffff";
  const sendButtonBg = "linear-gradient(135deg, #56266dff, #ffcc70)"; // orangish-pink gradient
  const textColor = "#000";
  const canSend = input.trim() && !loading;

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 9999, fontFamily: 'system-ui, sans-serif' }}>
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            background: "linear-gradient(135deg, #c470cfff, #fad0c4)",
            color: "white",
            borderRadius: "50%",
            width: 64,
            height: 64,
            border: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(0,0,0,0.4)";
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
          }}
        >
          <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
            <path d="M5 3a2 2 0 00-2 2v9a2 2 0 002 2h3v3l4-3h5a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div
          style={{
            width: "min(400px, 90vw)",
            height: "min(550px, 80vh)",
            background: chatBg,
            borderRadius: 18,
            boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid #d1c4e9",
            transform: "translateY(0)",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #d371b2ff, #85635aff)",
              color: "white",
              padding: "16px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 16,
            }}
          >
            <span>AI Assistant</span>
            <button onClick={toggleChat} style={{ background: "none", color: "white", border: "none", fontSize: 20 }}>
              ×
            </button>
          </div>

          <div style={{ flex: 1, padding: 16, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, position: 'relative' }}>
            {messages.length === 0 && !loading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '20px 16px',
                  borderRadius: 16,
                  background: defaultBoxBg,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                  color: '#666',
                  fontSize: 14,
                  textAlign: 'center',
                  maxWidth: '80%',
                  animation: 'popIn 0.4s ease-out',
                }}
              >
                <p>Welcome to your AI Assistant!</p>Ask me anything about Physical AI, ROS 2, Isaac Sim, or Humanoid Robotics!
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? userBubble : aiBubble,
                  color: msg.sender === "user" ? "white" : textColor,
                  padding: "10px 16px",
                  borderRadius: 18,
                  maxWidth: "80%",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                  wordBreak: "break-word",
                  animation: "popIn 0.2s ease-out",
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && <div style={{ color: "#666", textAlign: 'center' }}>AI is thinking…</div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #d1c4e9", padding: 8, background: "#f5f5f5" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message…"
              style={{
                flex: 1,
                padding: 12,
                borderRadius: 12,
                border: "1px solid #ccc",
                background: inputBg,
                outline: "none",
                color: textColor,
                fontSize: 14,
                marginRight: 8,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!canSend}
              style={{
                padding: "0 20px",
                border: "none",
                borderRadius: 12,
                background: canSend ? sendButtonBg : "#ccc",
                color: "white",
                cursor: canSend ? "pointer" : "not-allowed",
                fontWeight: "bold",
                transition: "0.2s",
              }}
              onMouseOver={e => { if (canSend) e.currentTarget.style.boxShadow = "0 0 12px rgba(255,111,145,0.6)"; }}
              onMouseOut={e => { e.currentTarget.style.boxShadow = "none"; }}
            >
              Send
            </button>
          </div>

          <style>{`@keyframes slideIn { from {transform: translateY(20px); opacity:0;} to {transform: translateY(0); opacity:1;} } @keyframes popIn { from {transform: scale(0.9); opacity:0;} to {transform: scale(1); opacity:1;} }`}</style>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;















