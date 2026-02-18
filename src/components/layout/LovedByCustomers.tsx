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
    comment: "Amazing designs! Truly modern and footwear.",
  },
];

const LovedByCustomers: React.FC = () => {
  // Duplicate customers for seamless scroll
  const allCustomers = [...customers, ...customers];

  return (
    <section className="max-w-7xl mx-auto mt-22 px-6 py-12 overflow-hidden">
       <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <h2 className="text-2xl font-bold  mb-8 border-b-2 border-[#ca0808d4] w-fit pb-2">
        Loved by Our <span className="golden-text">Customers</span> 
      </h2>

      {/* Scroll Container */}
      <div className="relative w-full overflow-hidden">
        {/* Scrolling Row */}
        <div className="flex animate-scroll gap-6">
          {allCustomers.map((c, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64  bg-black rounded-2xl p-6 flex flex-col items-center text-center shadow-xl"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${
                      i < c.rating ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-300 text-sm italic mb-4">"{c.comment}"</p>

              {/* Customer Name */}
              <h3 className="text-white font-semibold">{c.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            animation: scroll 10s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default LovedByCustomers;
