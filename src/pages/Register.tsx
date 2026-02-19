import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// SweetAlert setup
const MySwal = withReactContent(Swal);

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Password mismatch
      await MySwal.fire({
        title: "Passwords do not match!",
        icon: "error",
        confirmButtonColor: "#c3a914ff", // Golden color
        timerProgressBar: true,
        showConfirmButton: true,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        await MySwal.fire({
          title: data.message || "Registration failed",
      icon: "error",
        confirmButtonColor: "#ca0808d4", // Golden color
        timerProgressBar: true,
        showConfirmButton: true,
        });
        return;
      }

      // ✅ Success alert exactly as requested
      await MySwal.fire({
        title: `Account Created For ${name}!`,
         text: "Success Please Login. ",
         icon: "success",
        confirmButtonColor: "#ca0808d4", // Golden color
        timerProgressBar: true,
        showConfirmButton: true,
      });

      navigate("/login"); // redirect after success
    } catch (error) {
      console.error(error);
      await MySwal.fire({
        title: "Something went wrong!",
       icon: "error",
        confirmButtonColor: "#ca0808d4", // Golden color
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }
  };

  return (
    <section className="w-full h-screen relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <img
        src="/dd.jpg"
        alt="Register Background"
        className="absolute w-full h-full object-cover"
      />
      <div className="absolute w-full h-full bg-black/40"></div>

      <div className="relative z-10 flex flex-col lg:flex-row h-full items-center justify-center px-6">
        <div className="lg:flex-1 ml-20 hidden lg:flex flex-col gap-6 max-w-md text-white">
          <img src="/logggg.png" alt="Logo" className="w-40 h-auto" />
          <h1 className="text-5xl golden-text font-bold">StripeKing</h1>
          <p className="text-lg text-white/80">
            Join us today and unlock access to premium styles, exclusive deals,
            and a seamless shopping experience.
          </p>
        </div>

        <div className="flex-1 flex justify-center w-full">
          <div className="w-full max-w-md p-10 rounded-3xl border border-white/20 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Create Account
            </h2>

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                className="p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none focus:border-red-400 focus:bg-white/30 transition"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 outline-none focus:border-red-400 focus:bg-white/30 transition"
              />

              <button
                type="submit"
                className="mt-2 w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 hover:text-white transition-colors shadow-lg"
              >
                Register
              </button>
            </form>

            <p className="mt-4 text-center text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
