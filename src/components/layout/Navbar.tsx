import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type User = {
  name?: string;
  displayName?: string;
  fullName?: string;
  username?: string;
  email?: string;
  photoURL?: string;
  image?: string;
  avatar?: string;
};

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Normalize user object for email login + google login
  const normalizeUser = (rawUser: any): User | null => {
    if (!rawUser) return null;

    return {
      name:
        rawUser.name ||
        rawUser.displayName ||
        rawUser.fullName ||
        rawUser.username ||
        (rawUser.email ? rawUser.email.split("@")[0] : ""),
      displayName: rawUser.displayName || rawUser.name || "",
      fullName: rawUser.fullName || "",
      username: rawUser.username || "",
      email: rawUser.email || "",
      photoURL: rawUser.photoURL || rawUser.picture || rawUser.photo || "",
      image: rawUser.image || rawUser.picture || "",
      avatar: rawUser.avatar || "",
    };
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser || token) {
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        const normalized = normalizeUser(parsedUser);
        setUser(normalized);
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);
        setUser(null);
      }
    }
  }, []);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);

    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ca0808",
      cancelButtonColor: "#555",
      background: "#111111",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("googleUser");
      setUser(null);

      await MySwal.fire({
        title: "Logged Out!",
        text: "You have been logged out.",
        icon: "success",
        confirmButtonColor: "#ca0808",
        background: "#111111",
        color: "#ffffff",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/");
    }
  };

  const links = ["Home", "Products", "About", "Blog", "Contact"];

  const getDisplayName = () => {
    if (!user) return "User";
    return (
      user.name ||
      user.displayName ||
      user.fullName ||
      user.username ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const getInitial = (name?: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  const getAvatar = () => {
    if (!user) return "";
    return user.photoURL || user.image || user.avatar || "";
  };

  return (
    <header className="w-full top-0 z-50 bg-[#050505]/95 backdrop-blur-md text-white border-b border-red-900/30 shadow-[0_10px_30px_rgba(0,0,0,0.45)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .brand-text {
          background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-red {
          background: linear-gradient(135deg, rgba(141, 107, 107, 0.04), rgba(202,8,8,0.08));
          border: 1px solid rgba(202, 8, 8, 0.25);
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
        }

        .nav-scrollbar::-webkit-scrollbar {
          height: 4px;
        }

        .nav-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(202, 8, 8, 0.4);
          border-radius: 999px;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logggg.png"
                alt="Logo"
                className="w-[72px] sm:w-[82px] h-auto object-contain drop-shadow-[0_0_12px_rgba(202,8,8,0.35)]"
              />
              <div className="flex flex-col leading-tight">
                <span className="brand-text font-extrabold text-2xl sm:text-xl tracking-wide">
                  StripeKing
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="glass-red flex items-center w-full rounded-full px-4 py-2.5 transition-all duration-300 focus-within:border-red-500 hover:border-red-500/60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 192.904 192.904"
                className="w-4 h-4 fill-[#ca0808] mr-3"
              >
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-transparent outline-none text-white placeholder-white/50 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 relative">
            {user ? (
              <div className="flex items-center gap-2 relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="glass-red flex items-center gap-3 rounded-full pl-2 pr-3 py-1.5 hover:border-red-500/70 transition-all duration-300"
                >
                  {getAvatar() ? (
                    <img
                      src={getAvatar()}
                      alt={getDisplayName()}
                      className="w-10 h-10 rounded-full object-cover border border-red-300/20 shadow-[0_0_16px_rgba(202,8,8,0.35)]"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3b3b] to-[#8b0000] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_16px_rgba(202,8,8,0.35)] border border-red-300/20">
                      {getInitial(getDisplayName())}
                    </div>
                  )}

                  <div className="hidden sm:flex flex-col items-start leading-tight max-w-[120px]">
                    <span className="text-[11px] text-white/45">Welcome</span>
                    <span className="text-sm font-semibold text-white truncate">
                      {getDisplayName()}
                    </span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-4 h-4 text-white/70 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Direct Logout Button */}
                <button
                  onClick={handleLogout}
                  className="glass-red px-4 py-2.5 rounded-full text-sm font-medium text-red-300 hover:bg-red-600 hover:text-white hover:border-red-500/70 transition-all duration-300"
                >
                  Logout
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl overflow-hidden bg-[#111111] border border-red-800/40 shadow-[0_18px_40px_rgba(0,0,0,0.45)] z-50">
                    <div className="px-4 py-4 border-b border-red-900/30 bg-gradient-to-r from-red-950/60 to-black">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Signed in as
                      </p>
                      <p className="mt-1 text-sm font-semibold text-red-300 truncate">
                        {getDisplayName()}
                      </p>
                      {user.email && (
                        <p className="mt-1 text-xs text-white/50 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>

                    <div className="py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-600 hover:text-white transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="glass-red flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium hover:border-red-500/70 hover:text-red-300 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Login
              </Link>
            )}

            <div className="relative">
              <Link
                to="/wishlist"
                className="glass-red flex items-center justify-center w-11 h-11 rounded-full hover:border-red-500/70 transition-all duration-300 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  height="20px"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                  className="group-hover:stroke-[#ff4d4d] transition-colors"
                  viewBox="-2 0 64 64"
                >
                  <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4Z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold shadow-lg">
                  0
                </span>
              </Link>
            </div>

            <div className="relative">
              <Link
                to="/cart"
                className="glass-red flex items-center justify-center w-11 h-11 rounded-full hover:border-red-500/70 transition-all duration-300 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  height="22px"
                  fill="white"
                  className="group-hover:fill-[#ff4d4d] transition-colors"
                  viewBox="0 0 512 512"
                >
                  <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center font-semibold shadow-lg">
                  4
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="glass-red flex items-center w-full rounded-full px-4 py-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              className="w-4 h-4 fill-[#ca0808] mr-3"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent outline-none text-white placeholder-white/50 text-sm"
            />
          </div>
        </div>

        <nav className="mt-4 border-t border-red-900/45 pt-3">
          <ul className="nav-scrollbar flex justify-start gap-6 sm:gap-8 text-sm uppercase overflow-x-auto whitespace-nowrap">
            {links.map((link) => {
              const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
              return (
                <li key={link} className="relative">
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `relative inline-block pb-2 transition-all duration-300 ${
                        isActive
                          ? "text-red-400 font-semibold"
                          : "text-white hover:text-red-400"
                      }`
                    }
                    end={link === "Home"}
                  >
                    {({ isActive }) => (
                      <>
                        {link}
                        <span
                          className={`absolute left-0 -bottom-[1px] h-[2px] rounded-full bg-red-500 transition-all duration-300 ${
                            isActive ? "w-full" : "w-0"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;