import React from "react";

const Newsletter: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] pt-32">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .title-gradient {
           background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .newsletter-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 45px rgba(0,0,0,0.35);
        }

        .newsletter-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
        }

        .newsletter-input:focus {
          border-color: #dc2626;
        }
      `}</style>

      <div className="max-w-4xl mx-auto text-center newsletter-card rounded-[32px] p-10 sm:p-12">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Join the <span className="title-gradient">StripeKing</span> Club
        </h2>

        {/* Description */}
        <p className="text-white/55 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-7">
          Subscribe to receive exclusive offers, early access to new
          collections, and special discounts tailored just for you.
        </p>

        {/* Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="newsletter-input w-full sm:w-96 px-5 py-3.5 rounded-full text-white placeholder-white/40 outline-none transition-all duration-300"
          />

          <button className="px-8 py-3.5 rounded-full bg-red-600 text-white font-semibold shadow-[0_10px_25px_rgba(220,38,38,0.35)] hover:bg-red-700 hover:scale-[1.02] transition-all duration-300">
            Subscribe
          </button>
        </div>

        {/* Privacy */}
        <p className="text-xs text-white/40 mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;