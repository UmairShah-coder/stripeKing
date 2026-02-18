// src/pages/CategoryPage.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaBolt } from "react-icons/fa";

// TEMP mock products
const productsData = [
  {
    id: 1,
    name: "Urban Classic Sneakers",
    price: "$120",
    image: "/sho.png",
    categoryId: 1,
  },
];

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const categoryId = Number(id);

  const categoryProducts = productsData.filter(
    (p) => p.categoryId === categoryId
  );

  return (
    <section className="max-w-7xl mx-auto px-6 mt-10 mb-24">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-8 border-b-2 border-[#ca0808d4] w-fit pb-2">
        Product <span className="text-#ca0808d4">Category</span>
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categoryProducts.map((product) => (
          <div
            key={product.id}
            className="bg-black rounded-xl overflow-hidden border border-transparent
                       hover:border-[#ca0808d4] hover:shadow-[0_0_40px_#ca0808d4]
                       transition-all duration-300 flex flex-col"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden flex-1">
              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className="absolute top-3 right-3 z-10 w-9 h-9
                           flex items-center justify-center rounded-full
                           bg-black/70 text-white
                           hover:text-[#ca0808d4] transition"
              >
                <FaHeart size={16} />
              </button>

              <img
                src={product.image}
                alt={product.name}
                onClick={() => navigate("/cartlayout")}
                className="w-full h-64 object-contain cursor-pointer
                           transform hover:scale-105
                           transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3">
              <h3 className="text-white font-semibold text-lg">
                {product.name}
              </h3>

              <span className="golden-text font-bold">{product.price}</span>

              {/* Buttons */}
              <div className="mt-2 flex flex-col gap-2">
                {/* Buy Now */}
                <button
                  onClick={() => navigate("/checkout")}
                  className="flex items-center justify-center gap-2
                             bg-red-600 text-black hover:text-white
                             font-medium rounded-full py-2
                             hover:bg-red-700 transition-colors"
                >
                  <FaBolt size={14} />
                  Buy Now
                </button>

                {/* Add to Cart */}
                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-center gap-2
                             border hover:text-white border-red-500 text-red-500
                             hover:bg-red-600 hover:text-black
                             font-medium rounded-full py-2
                             transition-colors"
                >
                   <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="20px"
        fill="currentColor"
        className="transition-colors"
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

        {categoryProducts.length === 0 && (
          <p className="text-white text-xl col-span-full text-center">
            No products found in this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
