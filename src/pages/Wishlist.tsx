// src/pages/Wishlist.tsx
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";

const initialWishlist = [
  { id: 1, name: "Urban Classic Sneakers", price: "$120", image: "/sho.png" },
  { id: 3, name: "Casual Street Shoes", price: "$110", image: "/shoooo.png" },
  { id: 6, name: "Classic Loafers", price: "$140", image: "/shooo.png" },
];

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <h2 className="text-4xl font-bold mb-10 border-b-2 border-[#ca0808d4] w-fit pb-2">
        Your <span className="golden-text">Wishlist</span>
      </h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 gap-6">
          <p className="text-black text-lg text-center">
            Your wishlist is empty<br />
            Add some products you love!
          </p>
          <Link
            to="/products"
            className="mt-4 bg-yellow-500 text-black font-semibold py-3 px-8 rounded-xl hover:bg-yellow-600 hover:text-white transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-black rounded-xl hover:shadow-[0_0_40px_#ca0808d4] overflow-hidden border border-transparent hover:border-[#bca000] hover:shadow-[0_0_60px_#bca00055] transition-all duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="overflow-hidden flex-1">
                <img
                  src={product.image}
  onClick={() => navigate("/cartlayout")}

                  alt={product.name}
                  className="w-full h-64 object-contain transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                <span className="golden-text font-bold">{product.price}</span>

                {/* Buttons */}
                <div className="mt-2 flex gap-2">
                  {/* Add to Cart */}
                     <button
  onClick={() => navigate("/cart")}
  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-black hover:text-white font-medium rounded-full py-2 hover:bg-red-700 transition-colors"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 512 512"
  >
    <path d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15z" />
  </svg>
  Add to Cart
</button>

                  {/* Remove from Wishlist */}
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-full text-red-500 hover:text-red-600 transition"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
