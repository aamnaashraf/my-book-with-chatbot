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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: trimmed,
          software: "Python",
          hardware: "NVIDIA Jetson",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || "Network error"}`);
      }

      const data = await response.json();
      const aiText = data?.answer?.trim() || "No response from AI.";
      const aiMessage: Message = { sender: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorText = error.message.includes("Failed to fetch")
        ? "Cannot reach backend. Is it running?"
        : `Error: ${error.message}`;
      setMessages((prev) => [...prev, { sender: "ai", text: errorText }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Theme detection (safe for SSR)
  const isDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const bgColor = isDark ? "#1e1e1e" : "#fff";
  const userBubble = isDark ? "#4a9eff" : "#DCF8C6";
  const aiBubble = isDark ? "#333" : "#f1f1f1";
  const textColor = isDark ? "#f0f0f0" : "#000";

  const canSend = input.trim() && !loading;

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999, fontFamily: "system-ui, sans-serif" }}>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          aria-label="Open chat"
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 64,
            height: 64,
            fontSize: 28,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Chat
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: 380,
            maxWidth: "92vw",
            height: 520,
            background: bgColor,
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: isDark ? "1px solid #444" : "1px solid #ddd",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: "14px 16px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>AI Assistant</span>
            <button
              onClick={toggleChat}
              style={{ background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer" }}
            >
              Close
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.length === 0 && (
              <div style={{ color: "#888", fontSize: 14, textAlign: "center", marginTop: 20 }}>
                Ask me anything about Physical AI, ROS 2, Isaac Sim, or Humanoid Robotics!
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background: msg.sender === "user" ? userBubble : aiBubble,
                  color: textColor,
                  padding: "10px 16px",
                  borderRadius: 18,
                  maxWidth: "80%",
                  wordBreak: "break-word",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "#888", fontStyle: "italic" }}>
                AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: `1px solid ${isDark ? "#444" : "#ddd"}` }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{
                flex: 1,
                border: "none",
                padding: "14px 16px",
                fontSize: 15,
                background: "transparent",
                color: textColor,
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!canSend}
              style={{
                padding: "0 20px",
                background: canSend ? "#007bff" : "#aaa",
                color: "white",
                border: "none",
                fontWeight: "bold",
                cursor: canSend ? "pointer" : "not-allowed",
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















