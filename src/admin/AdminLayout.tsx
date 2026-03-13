import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  FaChartLine,
  FaUserFriends,
  FaBoxes,
  FaLayerGroup,
  FaThLarge,
  FaCopyright,
  FaTag,
  FaShoppingCart,
  FaComments,
  FaStarHalfAlt,
  FaIdBadge,
  FaChevronDown,
  FaRuler,
  FaPalette,
} from "react-icons/fa";
import AdminHeader from "../admin/AdminHeader";

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const menu = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaChartLine /> },
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUserFriends /> },
    { name: "All Products", path: "/admin-dashboard/products", icon: <FaBoxes /> },
    {
      name: "Product",
      icon: <FaLayerGroup />,
      subItems: [
        { name: "Categories", path: "/admin-dashboard/category", icon: <FaThLarge /> },
        { name: "Brands", path: "/admin-dashboard/brands", icon: <FaCopyright /> },
        { name: "Tags", path: "/admin-dashboard/tags", icon: <FaTag /> },
            { name: "Sizes", path: "/admin-dashboard/sizes", icon: <FaRuler /> },
      { name: "Colors", path: "/admin-dashboard/colors", icon: <FaPalette /> },
      ],
    },
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Chats", path: "/admin-dashboard/chatsTable", icon: <FaComments /> },
    { name: "Reviews", path: "/admin-dashboard/reviews", icon: <FaStarHalfAlt /> },
    { name: "Profile", path: "/admin-dashboard/profiles", icon: <FaIdBadge /> },
  ];

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <aside className="w-52 bg-gray-900 min-h-screen text-white flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="flex items-center ml-4 mt-3 gap-2">
        <img src="/logggg.png" alt="Logo" className="w-[40px] h-auto object-contain" />
        <span className="golden-text font-bold text-lg">StripeKing</span>
      </div>

      <nav className="flex-1 mt-5 flex flex-col gap-1">
        {menu.map((item) =>
          item.subItems ? (
            <div key={item.name} className="flex flex-col">
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center justify-between w-full px-6 py-3 hover:bg-gray-800 transition rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                <FaChevronDown
                  className={`transition-transform duration-200 ${
                    openDropdown === item.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`flex flex-col ml-6 overflow-hidden transition-[max-height] duration-300 ${
                  openDropdown === item.name ? "max-h-96" : "max-h-0"
                }`}
              >
                {item.subItems.map((sub) => (
                  <Link
                    key={sub.name}
                    to={sub.path!}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition ${
                      location.pathname === sub.path ? "bg-gray-800 font-semibold" : ""
                    }`}
                  >
                    {sub.icon}
                    <span>{sub.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.name}
              to={item.path!}
              className={`flex items-center gap-3 px-6 py-3 transition hover:bg-gray-800 rounded-lg ${
                location.pathname === item.path ? "bg-gray-800 font-semibold" : ""
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
};

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {showHeader && <AdminHeader />}
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
