import React, { useState, useEffect, useRef } from "react";
import { FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export interface AdminUser {
  name: string;
  email: string;
  role: string; // "admin" ya "staff"
}

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login", { replace: true });
      return;
    }

    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      try {
        const parsedUser: AdminUser = JSON.parse(storedUser);

        // Agar name missing ho to default "Admin"
        if (!parsedUser.name || parsedUser.name.trim() === "") {
          parsedUser.name = "Admin";
        }

        // Admin ke liye role hamesha "admin" set karo
        if (
          parsedUser.name?.toLowerCase() === "admin" ||
          parsedUser.email === "admin@admin.com"
        ) {
          parsedUser.role = "admin";
        }

        // Agar role undefined ho to default staff
        if (!parsedUser.role) parsedUser.role = "staff";

        setUser(parsedUser);
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminToken");
        navigate("/admin-login", { replace: true });
      }
    } else {
      navigate("/admin-login", { replace: true });
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate]);

  if (!user) return null;

  // Safe name ke saath first letter
  const safeName = user.name;
  const avatarLetter = safeName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    setOpen(false);
    await MySwal.fire({
      title: "Logging Out...",
      text: "You Have Been Logged Out!",
      icon: "success",
      confirmButtonColor: "#ca0808d4",
      timerProgressBar: true,
      showConfirmButton: true,
    });
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin-login", { replace: true });
  };

  return (
    <header className="bg-white shadow p-4 flex justify-end items-center">
      {user && (
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2  px-2 py-1 rounded transition"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white font-bold">
              {avatarLetter}
            </div>

            {/* Name */}

            {/* Arrow Icon */}
            <FaChevronDown
              className={`ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute right-12 mt-48 w-64 bg-white rounded-xl shadow-lg border z-50">
              <div className="px-4 py-3 border-b">
                <p className="font-semibold text-gray-800">{safeName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-yellow-600 capitalize mt-1">
                  Role: {user.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 flex items-center gap-3 text-red-600 hover:bg-red-50 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
