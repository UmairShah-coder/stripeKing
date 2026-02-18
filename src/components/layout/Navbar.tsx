// src/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// SweetAlert setup
const MySwal = withReactContent(Swal);

const Navbar: React.FC = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check localStorage for user info on load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);

    // SweetAlert confirmation
    const result = await MySwal.fire({
      title: "Are you sure ?",
      text: "You Will Be Logged Out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ca0808d4", // golden/red theme
      cancelButtonColor: "#555",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);

      await MySwal.fire({
    title: "Logged Out!",
      text: "You have been logged out.",
        icon: "success",
        confirmButtonColor: "#ca0808d4",
        timerProgressBar: true,
        showConfirmButton: true,
      });

      navigate("/"); // redirect to home
    }
  };

  const links = ["Home", "Products", "About", "Blog", "Contact"];

  return (
    <header className="bg-black text-white w-full relative z-50 px-6 py-3">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Top Row: Logo | Search | Icons */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logggg.png"
              alt="Logo"
              className="w-[80px] h-auto object-contain"
            />
            <span className="golden-text font-bold text-2xl">StripeKing</span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="flex flex-1 bg-gray-900 rounded-full mx-6 max-w-xl">
          <div className="flex items-center w-full rounded-full bg-[#bca0000d] px-4 py-2 border border-transparent focus-within:border-[#ca0808d4] transition-colors box-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              className="w-4 h-4 fill-[#ca0808d4] mr-2"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-white placeholder-white/60"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Login / User Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-white hover:text-[#bca000] transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="hover:fill-[#ca0808d4] transition-colors"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2">
                  <p className="px-4 py-2 border-b">{`Hi, ${user.name}`}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 text-white hover:text-[#bca000] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="white"
                className="hover:fill-[#ca0808d4] transition-colors"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </Link>
          )}

          {/* Wishlist */}
          <div className="relative cursor-pointer">
            <Link to="/wishlist" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="none"
                stroke="white"
                strokeWidth="5"
                className="hover:stroke-[#ca0808d4]  transition-colors"
                viewBox="0 0 64 64"
              >
                <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4Z" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded-full">
                0
              </span>
            </Link>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <Link to="/cart" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="white"
                className="hover:fill-[#ca0808d4] transition-colors"
                viewBox="0 0 512 512"
              >
                <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
              </svg>
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded-full">
                4
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Links */}
      <nav className="mt-4 border-t uppercase border-white pt-2">
        <ul className="flex justify-start text-sm gap-8 text-white">
          {links.map((link) => {
            const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            return (
              <li key={link}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "text-[#ca0808d4] font-semibold border-b-2 border-[#ca0808d4] pb-1"
                        : "hover:text-[#ca0808d4]"
                    }`
                  }
                  end={link === "Home"}
                >
                  {link}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
