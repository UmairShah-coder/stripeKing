import React from "react";
import { useNavigate } from "react-router-dom";


const Hero: React.FC = () => {
const navigate = useNavigate();

  return (
    <section className=" bg-white mt-14">
         <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left: Headline + CTA */}
        <div className="flex-1 flex flex-col ml-7 gap-6">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-black ">
           Discover the Essence of <span className="golden-text">StripeKing</span>
           
          </h1>
          <p className="text-black capitalize text-lg  sm:text-xl max-w-md">
            Discover premium gents shoes for every occasion. Comfort meets style in every step.
          </p>
          
<div className="flex gap-4 mt-4">
  <button
    onClick={() => navigate("/products")}
    className="bg-red-600 text-black hover:text-white font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-colors shadow-lg"
  >
    Shop Now
  </button>
  <button
    onClick={() => navigate("/register")}
    className="border border-red-500 text-red-500 font-semibold px-6 py-3 rounded-full hover:bg-red-700 hover:text-white transition-colors shadow-lg"
  >
    Get Started
  </button>
</div>

        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 relative ml-7">
          <img
            src="/herr.png"
            alt="Gents Shoe"
            className="w-full max-w-md mx-auto lg:mx-0 transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
