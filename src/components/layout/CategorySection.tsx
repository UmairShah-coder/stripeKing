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
  { id: 12, name: "CasualSandals", image: "/sho.png" }
];

const CategorySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-6 mt-24 y-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#ca0808d4] w-fit pb-2">
        Shop By <span className="golden-text">Categories</span>  
      </h2>

      <div className="grid grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/category/${cat.id}`)} // <-- Redirect to category page
            className="flex flex-col items-center bg-black rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-28 h-28 object-contain rounded-full mb-2"
            />
            <span className="text-white font-medium text-base">{cat.name}</span>
          </div>
        ))}
      </div>
    </section> 
  );
};

export default CategorySection;
