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
      const timer = setTimeout(() => setLoading(false), 2200);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050505]">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

          * {
            font-family: 'Poppins', sans-serif;
          }

          @keyframes ambientPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.16;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.3;
            }
          }

          @keyframes softFloat {
            0% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.15;
            }
            50% {
              transform: translateY(-16px) translateX(6px) scale(1.08);
              opacity: 0.35;
            }
            100% {
              transform: translateY(0px) translateX(0px) scale(1);
              opacity: 0.15;
            }
          }

          @keyframes rotateSlow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes rotateReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes logoBreath {
            0%, 100% {
              transform: scale(1);
              filter: drop-shadow(0 0 16px rgba(239, 68, 68, 0.18));
            }
            50% {
              transform: scale(1.06);
              filter: drop-shadow(0 0 28px rgba(239, 68, 68, 0.28));
            }
          }

          @keyframes fadeLift {
            0% {
              opacity: 0;
              transform: translateY(18px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes shimmerText {
            0%, 100% {
              opacity: 0.75;
              letter-spacing: 0.18em;
            }
            50% {
              opacity: 1;
              letter-spacing: 0.23em;
            }
          }

          @keyframes lineGlow {
            0%, 100% {
              opacity: 0.4;
              transform: scaleX(0.82);
            }
            50% {
              opacity: 1;
              transform: scaleX(1);
            }
          }

          .luxury-text {
            background: linear-gradient(90deg, #ffffff 0%, #fecaca 30%, #ef4444 70%, #7f1d1d 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .ambient-orb {
            position: absolute;
            border-radius: 9999px;
            filter: blur(95px);
            animation: ambientPulse 5.5s ease-in-out infinite;
          }

          .particle {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 9999px;
            background: rgba(248, 113, 113, 0.75);
            box-shadow: 0 0 18px rgba(239, 68, 68, 0.45);
            animation: softFloat 6s ease-in-out infinite;
          }

          .ring-outer {
            animation: rotateSlow 8s linear infinite;
          }

          .ring-inner {
            animation: rotateReverse 6s linear infinite;
          }

          .logo-animate {
            animation: logoBreath 2.8s ease-in-out infinite;
          }

          .fade-lift {
            animation: fadeLift 1s ease forwards;
          }

          .brand-animate {
            animation: shimmerText 2.8s ease-in-out infinite;
          }

          .line-animate {
            animation: lineGlow 2.5s ease-in-out infinite;
          }
        `}</style>

        {/* Ambient Background Glows */}
        <div className="ambient-orb left-[-100px] top-[-120px] h-[340px] w-[340px] bg-red-700/30" />
        <div className="ambient-orb right-[-120px] bottom-[-140px] h-[380px] w-[380px] bg-red-500/20" />
        <div className="ambient-orb left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 bg-red-600/10" />

        {/* Particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              top: `${8 + ((i * 11) % 82)}%`,
              left: `${5 + ((i * 13) % 88)}%`,
              animationDelay: `${(i % 6) * 0.35}s`,
            }}
          />
        ))}

        {/* Main Loader */}
        <div className="relative flex flex-col items-center px-6 text-center">
          <div className="absolute top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-red-600/10 blur-3xl" />

          {/* Logo Ring System */}
          <div className="relative flex h-44 w-44 items-center justify-center fade-lift">
            <div className="ring-outer absolute inset-0 rounded-full border border-red-500/20 shadow-[0_0_70px_rgba(220,38,38,0.18)]" />
            <div className="ring-outer absolute inset-2 rounded-full border-[3px] border-transparent border-t-red-400 border-r-red-500/70 border-b-red-800/40 border-l-red-300/40 shadow-[0_0_35px_rgba(239,68,68,0.28)]" />
            <div className="ring-inner absolute inset-6 rounded-full border border-transparent border-t-white/25 border-r-red-300/20 border-b-white/10 border-l-red-500/30" />

            <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.35)]">
              <img
                src="/logggg.png"
                alt="StripeKing"
                className="logo-animate h-20 w-20 object-contain"
              />
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="luxury-text brand-animate mt-8 text-3xl font-extrabold uppercase tracking-[0.22em] sm:text-3xl">
            StripeKing
          </h1>

          <div className="line-animate mt-4 h-px w-32 bg-gradient-to-r from-transparent via-red-400 to-transparent" />

          {/* Tagline */}
          <p className="fade-lift mt-5 max-w-2xl text-sm leading-8 text-white/60 sm:text-base">
            Step into a world of{" "}
            <span className="font-semibold text-red-300">premium footwear</span>,
            crafted for{" "}
            <span className="font-semibold text-red-300">style, comfort</span>,
            and modern performance.
          </p>

          {/* Sub label */}
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.34em] text-white/35">
            Luxury. Motion. Identity.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default HomeLoader;