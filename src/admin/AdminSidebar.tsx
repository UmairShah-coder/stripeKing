// src/admin/AdminSidebar.tsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoePrints,
  FaUsers,
  FaBars,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const adminLinks = [
  { name: "Dashboard", path: "/admin-dashboard", icon: <FaTachometerAlt /> },
  { name: "Products", path: "/admin/products", icon: <FaShoePrints /> },
  { name: "Orders", path: "/admin/orders", icon: <FaBoxOpen /> },
  { name: "Users", path: "/admin/users", icon: <FaUsers /> },
];

const AdminSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-900 h-screen transition-all shadow-lg flex flex-col`}
    >
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!collapsed && <span className="text-xl font-bold text-blue-500">StripeKing</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"
        >
          <FaBars />
        </button>
      </div>

      <nav className="flex-1 mt-4">
        {adminLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-500 dark:hover:text-white transition ${
                isActive ? "bg-yellow-500 text-white rounded-r-lg font-semibold" : ""
              }`
            }
          >
            <span className="text-lg">{link.icon}</span>
            {!collapsed && <span>{link.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Dark/Light Mode Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
