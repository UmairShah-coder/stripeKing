import React from "react";
import { Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";

const features = [
  {
    icon: <Truck size={28} />,
    title: "Free Shipping",
    desc: "On all orders above $50"
  },
  {
    icon: <RotateCcw size={28} />,
    title: "Easy Returns",
    desc: "7-day hassle free returns"
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Secure Payment",
    desc: "100% secure checkout"
  },
  {
    icon: <Star size={28} />,
    title: "Premium Quality",
    desc: "Crafted with top materials"
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-[#0f0f0f] py-16 px-6 mt-40">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-12">
          Why Choose <span className="golden-text">StripeKing</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-8 rounded-2xl border border-transparent hover:border-[#ca0808d4] hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#ca0808d4] text-black mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-white text-lg font-semibold mb-2">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
