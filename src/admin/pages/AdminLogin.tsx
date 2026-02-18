import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaEnvelope, FaLock } from "react-icons/fa";

const MySwal = withReactContent(Swal);

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const user = localStorage.getItem("adminUser");

    if (token && user) {
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post<{
        token: string;
        user: { id: string; name: string; email: string; role: string };
      }>("http://localhost:5000/api/admin/login", { email, password });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", JSON.stringify(res.data.user));

      await MySwal.fire({
        title: "Login Successful!",
        text: "Redirecting To Dashboard...",
        icon: "success",
        confirmButtonColor: "#ca0808d4",
        timerProgressBar: true,
        showConfirmButton: true,
      });

      navigate("/admin-dashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Login failed. Check server and credentials.";

      MySwal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonColor: "#ca0808d4",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-screen relative flex items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <img
        src="/ee.png"
        alt="Admin Background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute w-full h-full bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md p-10 rounded-3xl border border-white/50 backdrop-blur-4xl flex flex-col gap-4 bg-white/10">
      <div>
          <h2 className="text-3xl font-bold text-white text-center">
          Admin Login
        </h2>
        <p className="text-center  text-white/80 text-sm">
          Login to access admin dashboard
        </p>
      </div>
      

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email Field with Icon */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/20 border border-white/30 focus-within:border-red-400 transition">
            <FaEnvelope className="text-white/70" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
            />
          </div>

          {/* Password Field with Icon */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/20 border border-white/30 focus-within:border-red-400 transition">
            <FaLock className="text-white/70" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="●●●●●●●"
              required
              className="w-full bg-transparent text-white placeholder-white/70 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 hover:text-white transition-colors shadow-lg flex justify-center items-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Paragraph below form */}
        <p className="text-center text-white/70 text-sm mt-2">
          Welcome to the admin panel. Please login with your credentials to
          manage users, products, orders, and analytics.
        </p>
      </div>
    </section>
  );
};

export default AdminLogin;
