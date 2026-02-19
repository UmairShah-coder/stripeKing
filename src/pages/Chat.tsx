// src/pages/Chat.tsx
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input }]);
    setInput("");
    // Optional: Auto reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "Support", text: "Thank you for reaching out! How can I help you?" }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow flex flex-col h-[600px]">
      <h1 className="text-2xl font-bold mb-4 golden-text">Product Chat</h1>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto border-t border-b py-4 px-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center mt-10">No messages yet. Start the conversation!</p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs ${
                msg.sender === "You" ? "bg-yellow-500 text-black" : "bg-gray-200 text-gray-800"
              }`}
            >
              <span className="font-medium">{msg.sender}: </span>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      <button
  onClick={sendMessage}
  className="bg-red-600 text-white hover:text-white p-3 rounded-full hover:bg-red-700 transition flex items-center justify-center"
>
  <FaPaperPlane />
</button>

      </div>
    </div>
  );
};

export default Chat;
