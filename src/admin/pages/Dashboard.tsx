// src/admin/pages/Dashboard.tsx
import React from "react";
import { FaDollarSign, FaBoxOpen, FaShoePrints, FaUsers } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Dashboard: React.FC = () => {
  const stats = [
    { title: "Total Sales", value: "$12,430", icon: <FaDollarSign />, bg: "bg-red-600 text-white", text: "text-red-700" },
    { title: "Orders", value: "320", icon: <FaBoxOpen />, bg: "bg-red-600 text-white", text: "text-red-700" },
    { title: "Products", value: "58", icon: <FaShoePrints />, bg: "bg-red-600 text-white", text: "text-red-700" },
    { title: "Users", value: "1,245", icon: <FaUsers />, bg: "bg-red-600 text-white", text: "text-red-700" },
  ];

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 2000 },
    { month: "Apr", sales: 2780 },
    { month: "May", sales: 1890 },
    { month: "Jun", sales: 2390 },
    { month: "Jul", sales: 3490 },
  ];

  const orderData = [
    { name: "Delivered", value: 120 },
    { name: "Pending", value: 80 },
    { name: "Cancelled", value: 20 },
  ];
const COLORS = [
  "#cf2e19ff", // Indigo – main / primary
  "#5c1200e5", // Emerald – growth / positive
  "#000000ff"  // Amber – highlight / secondary
];


  const recentOrders = [
    { id: "#001", customer: "John Doe", total: "$120", status: "Delivered" },
    { id: "#002", customer: "Jane Smith", total: "$90", status: "Pending" },
    { id: "#003", customer: "Bob Johnson", total: "$200", status: "Cancelled" },
  ];

  return (
    <div className="space-y-8">
       <h1 className="text-xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="flex items-center p-6 bg-white rounded-2xl shadow hover:shadow-xl transition">
            <div className={`p-4 rounded-full ${stat.bg} mr-4 text-md text-gray-800`}>{stat.icon}</div>
            <div>
              <h4 className="text-gray-500 text-sm">{stat.title}</h4>
              <p className={`text-xl font-bold ${stat.text} mt-1`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Line Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#ca0808d4" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Orders Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {orderData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.total}</td>
                <td className={`py-2 px-4 font-semibold ${
                  order.status === "Delivered" ? "text-green-500" :
                  order.status === "Pending" ? "text-yellow-500" :
                  "text-red-500"
                }`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
