// src/components/pages/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLoader from "../components/layout/PageLoader";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loader state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // show loader

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Login failed
        setIsLoading(false);
        alert(data.message || "Login failed"); // simple alert fallback
        return;
      }

      // Success
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => {
        setIsLoading(false);
        navigate("/"); // redirect after loader
      }, 500); // small delay to show loader briefly
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="w-full h-screen relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Loader */}
      <PageLoader isLoading={isLoading} />

      {/* Background Image */}
      <img
        src="/dd.jpg"
        alt="Login Background"
        className="absolute w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/40"></div>

      <div className="relative z-10 flex flex-col lg:flex-row h-full items-center justify-center px-6">
        {/* Left Side Text */}
        <div className="lg:flex-1 ml-20 hidden lg:flex flex-col gap-6 max-w-md text-white">
          <img src="/logggg.png" alt="Logo" className="w-40 h-auto" />
          <h1 className="text-5xl golden-text font-bold">StripeKing</h1>
          <p className="text-lg text-white/80">
            Welcome back! Log in to your account and continue exploring our
            exclusive products and offers.
          </p>
        </div>

        {/* Right Side Login Form */}
        <div className="flex-1 flex justify-center w-full">
          <div className="w-full max-w-md p-10 rounded-3xl border border-white/20  flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white text-center">Sign In</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username or Email"
                required
                className="p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none focus:border-red-400 focus:bg-white/30 transition"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none focus:border-red-400 focus:bg-white/30 transition"
              />

              <button
                type="submit"
                className="mt-2 w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 hover:text-white transition-colors shadow-lg"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-white/70">
              Don't have an account?{" "}
              <Link to="/register" className="text-red-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
