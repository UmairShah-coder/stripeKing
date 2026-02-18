import React, { useState } from "react";
import { FaSearch, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Chat {
  id: number;
  user: string;
  email: string;
  product: string;
  lastMessage: string;
}

const initialChats: Chat[] = [
  {
    id: 1,
    user: "Guest",
    email: "",
    product: "Luxury Perfume",
    lastMessage: "Is this perfume long lasting?",
  },
  {
    id: 2,
    user: "John Doe",
    email: "john@gmail.com",
    product: "Nike Sneakers",
    lastMessage: "Available in size 42?",
  },
  {
    id: 3,
    user: "Sarah Khan",
    email: "",
    product: "Leather Jacket",
    lastMessage: "What is the delivery time?",
  },
];

const ChatsTable: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredChats = initialChats.filter(
    (chat) =>
      chat.user.toLowerCase().includes(search.toLowerCase()) ||
      chat.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto">
      {/* Heading */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold golden-text">Customers Chats</h2>
        <p className="text-gray-500 mt-1">
          All users who contacted support
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-72 mb-5">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by user or product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Chats Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg border-separate border-spacing-0">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 border-b border-r border-gray-300 text-center text-sm font-bold golden-text">
                User
              </th>
              <th className="px-4 py-3 border-b border-r border-gray-300 text-center text-sm font-bold golden-text">
                Email
              </th>
              <th className="px-4 py-3 border-b border-r border-gray-300 text-center text-sm font-bold golden-text">
                Product
              </th>
              <th className="px-4 py-3 border-b border-r border-gray-300 text-center text-sm font-bold golden-text">
                Last Message
              </th>
              <th className="px-4 py-3 border-b border-gray-300 text-center text-sm font-bold golden-text">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredChats.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-gray-500 border-t border-gray-300"
                >
                  No chats found
                </td>
              </tr>
            ) : (
              filteredChats.map((chat) => (
                <tr key={chat.id} className="hover:bg-gray-50 text-center transition">
                  <td className="px-4 py-3 border-t border-r border-gray-300 font-medium text-gray-800">
                    {chat.user}
                  </td>

                  {/* EMAIL: empty ho to "-" */}
                  <td className="px-4 py-3 border-t border-r border-gray-300 text-gray-600">
                    {chat.email ? chat.email : "-"}
                  </td>

                  {/* PRODUCT: image + name */}
                  <td className="px-4 py-3 border-t border-r border-gray-300">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="/bloo.png"
                        alt={chat.product}
                        className="w-10 h-full rounded  object-cover"
                      />
                      <span className="text-gray-800">{chat.product}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 border-t border-r border-gray-300 text-gray-500">
                    {chat.lastMessage}
                  </td>

                  <td className="px-4 py-3 border-t border-gray-300 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin-dashboard/chat/${chat.id}`)
                      }
                      className="text-yellow-500 hover:text-yellow-600"
                      title="Open Chat"
                    >
                      <FaComments size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChatsTable;
