import React, { useState } from "react";
import { FaHeart, FaBolt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Urban Classic Sneakers", price: "$120", image: "/sho.png" },
  { id: 2, name: "Leather Oxford Shoes", price: "$150", image: "/heros.png" },
  { id: 3, name: "Casual Street Shoes", price: "$110", image: "/shoooo.png" },
  { id: 4, name: "Premium Formal Shoes", price: "$180", image: "/shoess.png" },
  { id: 5, name: "Sport Running Shoes", price: "$130", image: "/shoessss.png" },
  { id: 6, name: "Classic Loafers", price: "$140", image: "/shooo.png" },
  { id: 7, name: "High-Top Sneakers", price: "$160", image: "/shoo.png" },
  { id: 8, name: "Casual Moccasins", price: "$125", image: "/shoesss.png" },
];

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <section className="max-w-7xl mt-24 mx-auto px-6 py-16">
      <div className="flex justify-between ">
   <h2 className="text-3xl font-bold mb-8 border-b-2 border-[#ca0808d4] w-fit pb-2">
        Featured <span className="golden-text">Products</span>
      </h2>
         <button
                  onClick={() => navigate("/products")}
                  className="flex items-center justify-center gap-2  text-red-600 hover:text-red-700 font-medium rounded-full py-2  transition-colors"
                >
                  View All
                </button>
      </div>
   

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-black rounded-xl overflow-hidden border border-transparent hover:border-[#bca000] hover:shadow-[0_0_40px_#ca0808d4] transition-all duration-300 flex flex-col"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden flex-1">
              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/70 text-white hover:text-[#ca0808d4] transition"
              >
                <FaHeart size={16} />
              </button>

              <img
                src={product.image}
                onClick={() => navigate("/cartlayout")}
                alt={product.name}
                className="w-full h-64 object-contain cursor-pointer transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col gap-3">
              <h3 className="text-white font-semibold text-lg">
                {product.name}
              </h3>
              <span className="golden-text font-bold">{product.price}</span>

              {/* Buttons */}
              <div className="mt-2 flex flex-col gap-2">
                {/* Buy Now */}
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-center gap-2 bg-red-600 text-white hover:text-white font-medium rounded-full py-2 hover:bg-red-700 transition-colors"
                >
                  <FaBolt size={14} />
                  Buy Now
                </button>

                {/* Add to Cart */}
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-center gap-2 border hover:text-white border-red-500 text-red-600 hover:bg-red-600 hover:text-black font-medium rounded-full py-2 transition-colors"
                >
                  <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        fill="currentColor"
        className=" transition-colors"
        viewBox="0 0 512 512"
      >
        <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
      </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-3">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-full font-medium ${
              currentPage === page
                ? "bg-[#ca0808d4] text-black"
                : "bg-gray-700 text-white hover:bg-[#ca0808d4]/70"
            } transition-colors`}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
