import React from "react";

const About: React.FC = () => {
  return (
    <section className="bg-white  min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-black mb-4 border-b-2 border-[#ca0808d4] w-fit pb-2">
              About <span className="golden-text">Us</span>
            </h2>
            <p className="text-black mb-4">
              Welcome to <span className="golden-text">StripeKing</span>, the ultimate destination for stylish, 
              comfortable, and high-quality footwear. We craft shoes that elevate your look and your confidence.
            </p>
            <p className="text-black">
              From classic designs to modern trends, our mission is to make every step memorable. Join our journey of 
              style, comfort, and excellence.
            </p>
          </div>
          <div className="lg:w-1/3">
            <img
              src="/about.png" // Replace with your image
              alt="About StripeKing"
              className="w-full rounded-xl  hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="lg:w-1/3 order-2 lg:order-1">
            <img
              src="/aboutss.png" // Replace with your image
              alt="Our Mission"
              className="w-full rounded-xl  hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-3xl text-black font-bold mb-4 border-b-2 border-[#ca0808d4] w-fit pb-2">
              Our <span className="golden-text">Mission</span>
            </h2>
            <p className="text-black">
              To provide footwear that blends style, comfort, and durability. Every shoe is designed with attention to 
              detail, ensuring our customers step out with confidence and elegance.
            </p>
          </div>
        </div>

        {/* Values Section */}
      
     
      </div>
    </section>
  );
};

export default About;
