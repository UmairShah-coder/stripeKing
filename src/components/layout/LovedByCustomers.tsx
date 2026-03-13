import React from "react";

const customers = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "These shoes are extremely comfortable and stylish!",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4,
    comment: "Perfect fit for office and casual wear. Love it!",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 5,
    comment: "Running shoes are very light and supportive.",
  },
  {
    id: 4,
    name: "Sara Williams",
    rating: 5,
    comment: "Amazing designs! Truly modern and premium footwear.",
  },
];

const LovedByCustomers: React.FC = () => {
  const allCustomers = [...customers, ...customers];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] pt-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .section-title {
         background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonial-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
        }

        .testimonial-card:hover {
          border-color: rgba(220,38,38,0.35);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.40),
            0 10px 30px rgba(220,38,38,0.12);
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 18s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
            Customer Experience
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Loved by Our <span className="section-title">Customers</span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            Discover why our customers trust StripeKing for premium comfort,
            modern style, and exceptional quality in every pair.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-black to-transparent" />

          <div className="marquee-track gap-6">
            {allCustomers.map((customer, index) => (
              <div
                key={`${customer.id}-${index}`}
                className="testimonial-card w-[290px] sm:w-[320px] flex-shrink-0 rounded-3xl p-6 transition-all duration-300"
              >
                {/* Stars */}
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-base ${
                        i < customer.rating ? "text-yellow-400" : "text-white/20"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="min-h-[84px] text-sm leading-7 text-white/65 italic">
                  “{customer.comment}”
                </p>

                {/* Divider */}
                <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Customer */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-900 text-sm font-bold text-white shadow-[0_8px_18px_rgba(220,38,38,0.30)]">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {customer.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      Verified Customer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LovedByCustomers;