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

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    const userMessage: Message = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://backend-1-eftt.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: trimmedInput,
          software: "Python",
          hardware: "NVIDIA Jetson",
        }),
      });

      const data = await response.json();
      console.log("Backend response:", data); // Debug backend response

      const aiText = data?.answer || "Sorry, I could not get a response from backend.";
      const aiMessage: Message = { sender: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching from backend:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "Error: Could not get response from backend.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  // Determine theme colors
  const isDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const bgColor = isDark ? "#1e1e1e" : "#fff";
  const userColor = isDark ? "#3a3a3a" : "#DCF8C6";
  const aiColor = isDark ? "#2c2c2c" : "#f1f0f0";
  const textColor = isDark ? "#f0f0f0" : "#000";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {!isOpen && (
        <button
          onClick={toggleChat}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "24px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div
          style={{
            width: "380px",
            maxWidth: "90vw",
            height: "500px",
            backgroundColor: bgColor,
            border: "1px solid #ccc",
            borderRadius: "15px",
            boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            <span>AI Chatbot</span>
            <button
              onClick={toggleChat}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "user" ? userColor : aiColor,
                  color: textColor,
                  padding: "10px 14px",
                  borderRadius: "15px",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", fontStyle: "italic", color: textColor }}>
                AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: `1px solid ${isDark ? "#444" : "#ccc"}` }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
              style={{
                flex: 1,
                border: "none",
                padding: "12px",
                borderRadius: "0 0 0 15px",
                outline: "none",
                backgroundColor: isDark ? "#2c2c2c" : "#fff",
                color: textColor,
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "12px 18px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "0 0 15px 0",
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;












