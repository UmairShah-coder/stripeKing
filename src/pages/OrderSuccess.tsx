// src/pages/OrderSuccess.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess: React.FC = () => {
  return (
    <section className="w-full h-screen relative flex items-center justify-center bg-gray-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Background Image */}
      <img
        src="/admin.png" // 👈 replace with your background image
        alt="Order Success Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl text-center flex flex-col items-center gap-6 max-w-md">
        <FaCheckCircle className="text-green-400 text-6xl animate-bounce" />
        <h1 className="text-3xl font-bold text-white">Order Placed Successfully!</h1>
        <p className="text-white/80">
          Thank you for your order. Your order has been placed and is being processed.
        </p>

        <p className="text-white/70">Order ID: #123456</p>

        <Link
          to="/"
          className="mt-4 bg-red-600 text-black font-semibold py-3 px-8 rounded-xl hover:bg-red-700 hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccess;
