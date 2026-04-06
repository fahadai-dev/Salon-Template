import { useState, useEffect, useRef } from "react";
import "../styles/Chatbot.css";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `তুমি Glamour Studio-র একজন বিনয়ী ও সহায়ক AI assistant। তোমার কাজ হলো salon সম্পর্কে তথ্য দেওয়া এবং কাস্টমারদের সাহায্য করা।
 
Salon সম্পর্কে তথ্য:
- নাম: Glamour Studio
- ঠিকানা: Dhaka, Bangladesh
- ফোন: +880 1927907376
- WhatsApp: +880 1894007153
- সময়: প্রতিদিন সকাল ১০টা - রাত ১১টা (সপ্তাহের ৭ দিন)
 
সার্ভিস সমূহ:
- হেয়ার কাট ও স্টাইলিং
- হেয়ার কালার ও হাইলাইট
- ফেসিয়াল ও স্কিনকেয়ার
- ব্রাইডাল মেকআপ
- মেহেদি ডিজাইন
- ম্যানিকিউর ও পেডিকিউর
- আইব্রো ও থ্রেডিং
- হেয়ার স্পা ট্রিটমেন্ট
 
সাধারণ নিয়ম:
- অ্যাপয়েন্টমেন্টের জন্য ফোন বা WhatsApp করতে বলো
- বাংলা বা ইংরেজি যেকোনো ভাষায় উত্তর দাও
- সংক্ষিপ্ত ও স্পষ্ট উত্তর দাও
- সবসময় বিনয়ী থাকো`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "আসসালামু আলাইকুম! 👋 আমি Glamour Studio-র AI assistant। আপনাকে কীভাবে সাহায্য করতে পারি?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error.message);

      const reply = data.content[0].text;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "দুঃখিত, কিছু একটা সমস্যা হয়েছে। সরাসরি যোগাযোগ করুন: +880 1927907376",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "সার্ভিস কী কী?",
    "সময়সূচি কী?",
    "অ্যাপয়েন্টমেন্ট কীভাবে নেব?",
    "ঠিকানা কোথায়?",
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        className={`chat-float-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
        {!isOpen && <span className="chat-notif-dot"></span>}
      </button>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">💄</div>
            <div>
              <p className="chat-name">Glamour Assistant</p>
              <p className="chat-status">● Online</p>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="chat-msg-avatar">💄</div>
              )}
              <div className="chat-msg-bubble">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-msg assistant">
              <div className="chat-msg-avatar">💄</div>
              <div className="chat-msg-bubble chat-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="chat-quick">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="chat-input-row">
          <input
            ref={inputRef}
            type="text"
            placeholder="মেসেজ লিখুন..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="chat-send-btn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
