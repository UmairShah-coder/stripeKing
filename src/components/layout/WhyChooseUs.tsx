import React from "react";
import { Truck, RotateCcw, ShieldCheck, Star } from "lucide-react";

const features = [
  {
    icon: <Truck size={26} strokeWidth={2.2} />,
    title: "Free Shipping",
    desc: "Enjoy free delivery on all orders above $50.",
  },
  {
    icon: <RotateCcw size={26} strokeWidth={2.2} />,
    title: "Easy Returns",
    desc: "7-day hassle-free returns for a worry-free experience.",
  },
  {
    icon: <ShieldCheck size={26} strokeWidth={2.2} />,
    title: "Secure Payment",
    desc: "Your checkout is protected with trusted secure payment methods.",
  },
  {
    icon: <Star size={26} strokeWidth={2.2} />,
    title: "Premium Quality",
    desc: "Expertly crafted footwear made with top-grade materials.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] pt-32 ">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .section-title {
         background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
        }

        .feature-card:hover {
          border-color: rgba(220,38,38,0.35);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.42),
            0 10px 30px rgba(220,38,38,0.12);
          transform: translateY(-6px);
        }

        .icon-wrap {
          background: linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%);
          box-shadow: 0 10px 24px rgba(220,38,38,0.28);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
            Our Promise
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Why Choose <span className="section-title">StripeKing</span>
          </h2>

          <p className="mt-3 mx-auto max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            We combine premium craftsmanship, reliable service, and modern
            comfort to deliver a footwear experience you can trust.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="feature-card group rounded-3xl p-7 text-center transition-all duration-300"
            >
              <div className="icon-wrap mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/55">
                {item.desc}
              </p>

              <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;