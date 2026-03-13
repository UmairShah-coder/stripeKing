import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "AirRunner", image: "/heros.png" },
  { id: 2, name: "CityLoafers", image: "/shoe.png" },
  { id: 3, name: "ClassicFormals", image: "/shoes.png" },
  { id: 4, name: "SpeedRunners", image: "/shoess.png" },
  { id: 5, name: "UrbanBoots", image: "/shoesss.png" },
  { id: 6, name: "BeachSandals", image: "/shoessss.png" },
  { id: 7, name: "TrailRunners", image: "/sh.png" },
  { id: 8, name: "OfficeLoafers", image: "/shoo.png" },
  { id: 9, name: "LuxuryFormals", image: "/shooo.png" },
  { id: 10, name: "GymSneakers", image: "/shoooo.png" },
  { id: 11, name: "HikingBoots", image: "/sh.png" },
  { id: 12, name: "CasualSandals", image: "/sho.png" },
];

const CategorySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] pt-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .section-title {
         background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .category-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 16px 35px rgba(0,0,0,0.30);
        }

        .category-card:hover {
          border-color: rgba(220,38,38,0.35);
          transform: translateY(-6px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
              Curated Collections
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Shop By <span className="section-title">Categories</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Explore premium collections designed for style, comfort, and every
              occasion with a modern luxury feel.
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
          >
            View All Products
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="category-card group cursor-pointer rounded-2xl p-5 transition-all duration-300"
            >
              <div className="flex justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_8px_24px_rgba(255,255,255,0.04)]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-white/40">Premium Collection</p>
              </div>

              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-red-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;