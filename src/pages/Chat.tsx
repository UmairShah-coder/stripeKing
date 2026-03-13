import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { MessageCircleMore } from "lucide-react";

type Message = {
  sender: "You" | "Support";
  text: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();

    setMessages((prev) => [...prev, { sender: "You", text: userMessage }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Support",
          text: "Thank you for reaching out! How can I help you?",
        },
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-10 sm:px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .title-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #fca5a5 45%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          backdrop-filter: blur(16px);
        }

        .glass-card:hover {
          border-color: rgba(220,38,38,0.25);
        }

        .soft-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(100px);
          opacity: 0.18;
          pointer-events: none;
        }
      `}</style>

      <div className="soft-glow left-[-60px] top-[-70px] h-64 w-64 bg-red-600" />
      <div className="soft-glow bottom-[-90px] right-[-50px] h-72 w-72 bg-red-500" />

      <div className="relative mx-auto max-w-4xl">
        <div className="glass-card flex h-[700px] flex-col overflow-hidden rounded-[32px]">
          {/* Header */}
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_24px_rgba(220,38,38,0.28)]">
                <MessageCircleMore size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
                  Live Support
                </p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                  Product <span className="title-gradient">Chat</span>
                </h1>
                <p className="mt-1 text-sm text-white/45">
                  Chat with support for product details, order help, and quick assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
                  <MessageCircleMore size={32} />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-white">
                  Start Your Conversation
                </h2>
                <p className="mt-2 max-w-md text-sm leading-7 text-white/45">
                  No messages yet. Send your first message and our support team
                  will assist you shortly.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => {
                  const isUser = msg.sender === "You";

                  return (
                    <div
                      key={idx}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[85%] items-end gap-3 sm:max-w-[70%] ${
                          isUser ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            isUser
                              ? "bg-red-600 text-white"
                              : "border border-white/10 bg-white/5 text-white"
                          }`}
                        >
                          {isUser ? "Y" : "S"}
                        </div>

                        <div
                          className={`rounded-[22px] px-4 py-3 text-sm leading-7 shadow-sm ${
                            isUser
                              ? "bg-red-600 text-white"
                              : "border border-white/10 bg-white/5 text-white/85"
                          }`}
                        >
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                            {msg.sender}
                          </p>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] p-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none"
              />

              <button
                onClick={sendMessage}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.30)] transition-all duration-300 hover:scale-105 hover:bg-red-700"
              >
                <FaPaperPlane size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;