// src/components/layout/HomeLoader.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface HomeLoaderProps {
  children: React.ReactNode;
}

const HomeLoader: React.FC<HomeLoaderProps> = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 2000); // 2.5s loader
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  if (loading) {
    return ( 
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
        {/* Background gradient blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-700 to-pink-500 opacity-20 filter blur-xl animate-[gradientShift_8s_ease-in-out_infinite]"></div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-400 rounded-full opacity-50 animate-[floatParticles_5s_linear_infinite]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}

        {/* Loader ring + logo */}
        <div className="relative w-36 h-36 mb-6">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-red-400 border-r-red-300 border-b-red-500 border-l-red-200 shadow-[0_0_40px_#ca0808d4] animate-spin"></div>
          {/* Inner glowing pulse */}
          <div className="absolute inset-5 rounded-full bg-red-400 opacity-20 animate-[pulseRing_2s_ease-in-out_infinite]"></div>
          {/* Logo */}
          <img
            src="/logggg.png"
            alt="Logo"
            className="absolute inset-0 m-auto w-20 h-20 drop-shadow-[0_0_35px_rgba(255,215,0,0.9)] animate-[logoPulse_2.5s_ease-in-out_infinite]"
          />
        </div>

        {/* Brand Name */}
        <span className="golden-text font-extrabold text-4xl tracking-wide animate-[fadeSlide_1s_ease-in-out]">
          StripeKing
        </span>

        {/* Modern highlighted paragraph */}
        <p className="text-gray-300 text-center max-w-md leading-relaxed text-lg animate-[fadeSlide_2s_ease-in-out] mt-3">
          Step Into A World Of <span className="golden-text font-semibold">Premium Sneakers</span>, Crafted For <span className="golden-text font-semibold">Style, Comfort </span>And Performance. 
        </p>

        {/* Tailwind keyframes */}
        <style>
          {`
            @keyframes gradientShift {
              0%,100% {background-position: 0% 50%;}
              50% {background-position: 100% 50%;}
            }
            @keyframes floatParticles {
              0%,100% {transform: translateY(0) scale(0.8);}
              50% {transform: translateY(-10px) scale(1);}
            }
            @keyframes pulseRing {
              0%,100% {opacity:0.2;}
              50% {opacity:0.5;}
            }
            @keyframes logoPulse {
              0%,100% {transform: scale(1);}
              50% {transform: scale(1.08);}
            }
            @keyframes fadeSlide {
              0% {opacity:0; transform: translateY(10px);}
              100% {opacity:1; transform: translateY(0);}
            }
          `}
        </style>
      </div>
    );
  }

  return <>{children}</>;
};

export default HomeLoader;
