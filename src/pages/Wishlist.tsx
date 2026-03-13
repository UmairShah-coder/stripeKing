import React, { useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const initialWishlist = [
  {
    id: 1,
    name: "Urban Classic Sneakers",
    price: "$120",
    image: "/sho.png",
    description: "Premium comfort with a sleek modern finish.",
  },
  {
    id: 3,
    name: "Casual Street Shoes",
    price: "$110",
    image: "/shoooo.png",
    description: "Street-ready style built for everyday wear.",
  },
  {
    id: 6,
    name: "Classic Loafers",
    price: "$140",
    image: "/shooo.png",
    description: "Refined elegance with timeless comfort.",
  },
];

const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(initialWishlist);

  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="bg-black min-h-screen py-16 sm:py-20">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .section-title {
          background: linear-gradient(90deg, #ffffff 0%, #fca5a5 45%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .product-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
        }

        .product-card:hover {
          border-color: rgba(220,38,38,0.35);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.42),
            0 10px 30px rgba(220,38,38,0.12);
        }

        .image-wrap {
          background: radial-gradient(circle at top, rgba(220,38,38,0.10), rgba(255,255,255,0.02), rgba(0,0,0,0.2));
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
              Saved Favorites
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Your <span className="section-title">Wishlist</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Keep track of the products you love and move them to your cart
              whenever you're ready.
            </p>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="w-fit rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
          >
            Browse Products
          </button>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              Your wishlist is empty
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/50">
              Add some products you love and they will appear here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {wishlist.map((product) => (
              <Tilt
                key={product.id}
                glareEnable={true}
                glareMaxOpacity={0.12}
                scale={1.02}
                transitionSpeed={1800}
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                className="rounded-[28px]"
              >
                <div className="product-card group relative flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-500">
                  {/* Remove Button */}
                  <div className="absolute right-4 top-4 z-20">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:border-red-500 hover:text-red-500"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  {/* Image */}
                  <div
                    className="image-wrap relative flex h-72 cursor-pointer items-center justify-center overflow-hidden"
                    onClick={() => navigate("/cartlayout")}
                  >
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-56 object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-red-400">
                      {product.name}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-7 text-white/55">
                      {product.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                          Price
                        </p>
                        <span className="mt-1 block text-xl font-bold text-red-400">
                          {product.price}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate("/cart")}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.28)] transition-all duration-300 hover:scale-105 hover:bg-red-700"
                      >
                        <FaShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;