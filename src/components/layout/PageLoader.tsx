// src/components/layout/PageLoader.tsx
import React from "react";

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden">
      {/* Background gradient blur same as HomeLoader */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-700 to-red-500 opacity-20 filter blur-xl animate-[gradientShift_8s_ease-in-out_infinite]"></div>

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

      {/* Loader ring with "Loading..." inside */}
      <div className="relative w-32 h-32 mb-4">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-red-400 border-r-red-300 border-b-red-500 border-l-red-200 shadow-[0_0_40px_#ca0808d4] animate-spin"></div>
        {/* Inner subtle pulse */}
        <div className="absolute inset-4 rounded-full bg-red-400 opacity-20 animate-[pulseRing_2s_ease-in-out_infinite]"></div>
        {/* Loading text inside ring */}
        <span className="absolute inset-0 flex items-center justify-center text-red-400 font-bold text-lg animate-[textPulse_2s_ease-in-out_infinite]">
          Loading...
        </span>
      </div>

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
          @keyframes textPulse {
            0%,100% {opacity:0.7;}
            50% {opacity:1;}
          }
        `}
      </style>
    </div>
  );
};

export default PageLoader;
