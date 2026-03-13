import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] ">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .hero-brand-text {
          background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.22;
          pointer-events: none;
        }
      `}</style>

      {/* Background Glow Effects */}
      <div className="hero-glow w-72 h-72 bg-red-700 top-[-60px] left-[-40px]" />
      <div className="hero-glow w-80 h-80 bg-red-500 bottom-[-100px] right-[-60px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="relative z-10">
          

            <h1 className=" text-4xl sm:text-5xl w-[580px] lg:text-5xl font-extrabold leading-tight text-white">
              Discover the Essence of{" "}
              <span className="hero-brand-text">StripeKing</span>
            </h1>

            <p className="mt-3 max-w-xl text-base sm:text-lg leading-8 text-white/75">
              Step into refined style with premium gents shoes crafted for
              comfort, confidence, and timeless elegance. Designed for every
              occasion, built to elevate every step.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/products")}
                className="rounded-full bg-red-600 px-7 py-3.5 text-white font-semibold shadow-[0_10px_30px_rgba(202,8,8,0.35)] transition-all duration-300 hover:bg-red-700 hover:scale-[1.02]"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-full border border-red-500/50 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-red-300 font-semibold transition-all duration-300 hover:bg-red-600 hover:text-white hover:border-red-600"
              >
                Get Started
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-center">
                <h3 className="text-xl font-bold text-white">10k+</h3>
                <p className="text-sm text-white/60 mt-1">Happy Customers</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-center">
                <h3 className="text-xl font-bold text-white">Premium</h3>
                <p className="text-sm text-white/60 mt-1">Quality Finish</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 text-center">
                <h3 className="text-xl font-bold text-white">24/7</h3>
                <p className="text-sm text-white/60 mt-1">Support</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              {/* Background Card */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-red-600/20 via-white/5 to-transparent blur-2xl scale-105" />

              <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(80,0,0,10)] p-6 sm:p-8">
                <img
                  src="/herr.png"
                  alt="Gents Shoe"
                  className="w-full max-w-md mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,10)] transform hover:scale-105 transition-transform duration-500"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;