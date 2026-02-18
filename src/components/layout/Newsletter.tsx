import React from "react";

const Newsletter: React.FC = () => {
  return (
    <section className="py-20 px-6 mt-20">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="max-w-4xl mx-auto text-center bg-black rounded-3xl p-12 border border-[#bca000]/20 shadow-[0_0_40px_#bca00022]">
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Join the <span className="golden-text">StripeKing</span> Club
        </h2>

        <p className="text-gray-400 mb-8">
          Subscribe to get special offers, new arrivals, and exclusive discounts.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-96 px-5 py-3 rounded-full bg-[#1a1a1a] text-white placeholder-gray-500 outline-none border border-transparent focus:border-[#ca0808d4] transition"
          />

          <button className="px-8 py-3 rounded-full bg-red-600 text-black font-semibold hover:bg-red-700 hover:text-white transition duration-300 shadow-[0_0_15px_#ca0808d4]">
            Subscribe
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
