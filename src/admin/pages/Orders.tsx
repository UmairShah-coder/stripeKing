// src/admin/pages/Orders.tsx
import React, { useState } from "react";
import { FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  user: string;
  total: number;
  payment: string;
  status: "Pending" | "Processing" | "Shipped" | "Completed" | "Cancelled";
  items: { name: string; qty: number; image: string }[];
}

const initialOrders: Order[] = [
  {
    id: "ORD-49-20260103-1847",
    user: "Guest",
    total: 7999,
    payment: "COD",
    status: "Pending",
    items: [
      {
        name: "T-Shirt",
        qty: 1,
        image: "/bloo.png",
      },
    ],
  },
  {
    id: "ORD-50-20260103-1902",
    user: "John Doe",
    total: 14999,
    payment: "Card",
    status: "Shipped",
    items: [
      {
        name: "Sneakers",
        qty: 2,
        image: "/about.png",
      },
     
    ],
  },
];

const OrdersPage: React.FC = () => {
      const navigate = useNavigate();
    
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");

  const handleStatusChange = (
    id: string,
    newStatus: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto">
      {/* Heading */}
      <h2 className="text-3xl font-bold golden-text mb-1">
        Manage Orders
      </h2>
      <p className="text-gray-500 mb-4">
        Manage all store orders
      </p>

      {/* Search Bar */}
      <div className="relative w-full sm:w-64 mb-5">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 border-collapse text-sm">
          <thead className="bg-gray-50 golden-text">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Order ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                User
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Total
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Payment
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Status
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Items
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                View
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-6 border border-gray-300 text-gray-500"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 text-center transition"
                >
                  <td className="px-4 py-2  border border-gray-300">
                    {order.id}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {order.user}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    Rs {order.total}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {order.payment}
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-4 py-2 border border-gray-300">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(
                          order.id,
                          e.target.value as Order["status"]
                        )
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Items */}
                  <td className="px-4 py-2 border border-gray-300">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 mb-1"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-full rounded border border-gray-200 object-cover"
                        />
                        <span className="text-xs font-semibold">
                          Qty: {item.qty}
                        </span>
                        <span className="text-gray-700 text-sm">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </td>

                 <td className="px-4 py-2 border border-gray-300 text-center">
  <button
    onClick={() =>
      navigate(`/admin-dashboard/orders/view/${order.id}`)
    }
    className="text-blue-500 hover:text-blue-600"
    title="View Order"
  >
    <FaEye />
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

export default OrdersPage;
