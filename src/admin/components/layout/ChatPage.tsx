import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

interface Message {
  id: number;
  sender: "user" | "admin";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "user",
    text: "Is this perfume long lasting?",
    time: "10:30 AM",
  },
  {
    id: 2,
    sender: "admin",
    text: "Yes, it lasts up to 8–10 hours.",
    time: "10:32 AM",
  },
];

const ChatPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "admin",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow flex flex-col h-[80vh]">
      
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-300">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h2 className="text-lg font-bold golden-text">
            Chat with Customer
          </h2>
          <p className="text-sm text-gray-500">
            Chat ID: {id}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                msg.sender === "admin"
                  ? "bg-yellow-500 text-white rounded-br-none"
                  : "bg-white border border-gray-300 rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[11px] mt-1 opacity-70 text-right">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-300 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSend}
          className="bg-yellow-500 hover:bg-yellow-600 text-black hover:text-white transition-all px-4 rounded-lg"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
