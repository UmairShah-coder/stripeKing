import React from "react";

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#050505]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes slowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.18;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.32;
          }
        }

        @keyframes softFloat {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-18px) translateX(6px) scale(1.08);
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

        @keyframes shimmerText {
          0%, 100% {
            opacity: 0.7;
            letter-spacing: 0.18em;
          }
          50% {
            opacity: 1;
            letter-spacing: 0.24em;
          }
        }

        @keyframes lineGlow {
          0%, 100% {
            opacity: 0.35;
            transform: scaleX(0.85);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .luxury-text {
          background: linear-gradient(90deg, #ffffff 0%, #fecaca 35%, #ef4444 70%, #7f1d1d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ambient-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          animation: slowPulse 5s ease-in-out infinite;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(248, 113, 113, 0.7);
          box-shadow: 0 0 18px rgba(239, 68, 68, 0.5);
          animation: softFloat 6s ease-in-out infinite;
        }

        .ring-outer {
          animation: rotateSlow 8s linear infinite;
        }

        .ring-inner {
          animation: rotateReverse 6s linear infinite;
        }

        .brand-animate {
          animation: shimmerText 2.8s ease-in-out infinite;
        }

        .line-animate {
          animation: lineGlow 2.4s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="ambient-orb top-[-120px] left-[-80px] h-[320px] w-[320px] bg-red-700/30" />
      <div className="ambient-orb bottom-[-140px] right-[-100px] h-[360px] w-[360px] bg-red-500/20" />
      <div className="ambient-orb top-[35%] left-[50%] h-[240px] w-[240px] -translate-x-1/2 bg-red-600/10" />

      {/* Particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            top: `${8 + ((i * 11) % 80)}%`,
            left: `${5 + ((i * 13) % 88)}%`,
            animationDelay: `${(i % 6) * 0.35}s`,
          }}
        />
      ))}

      {/* Main loader block */}
      <div className="relative flex flex-col items-center">
        {/* Decorative glow behind loader */}
        <div className="absolute top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-red-600/10 blur-3xl" />

        {/* Loader circle */}
        <div className="relative flex h-40 w-40 items-center justify-center">
          {/* Outer glow ring */}
          <div className="ring-outer absolute inset-0 rounded-full border border-red-500/20 shadow-[0_0_60px_rgba(220,38,38,0.18)]" />

          {/* Main rotating ring */}
          <div className="ring-outer absolute inset-2 rounded-full border-[3px] border-transparent border-t-red-400 border-r-red-500/70 border-b-red-700/40 border-l-red-300/40 shadow-[0_0_35px_rgba(239,68,68,0.28)]" />

          {/* Secondary reverse ring */}
          <div className="ring-inner absolute inset-5 rounded-full border border-transparent border-t-white/30 border-r-red-300/20 border-b-white/10 border-l-red-500/30" />

          {/* Center glass core */}
          <div className="relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.35)]">
            <span className="luxury-text text-lg font-extrabold leading-none">
              SK
            </span>
            <span className="mt-1 text-[9px] uppercase tracking-[0.28em] text-white/45">
              luxury
            </span>
          </div>
        </div>

        {/* Brand / loading text */}
        <div className="mt-8 flex flex-col items-center">
          <h2 className="luxury-text brand-animate text-xl font-bold uppercase tracking-[0.22em]">
            StripeKing
          </h2>

          <div className="line-animate mt-3 h-px w-28 bg-gradient-to-r from-transparent via-red-400 to-transparent" />

          <p className="mt-4 text-xs font-medium uppercase tracking-[0.32em] text-white/50">
            Loading 
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;