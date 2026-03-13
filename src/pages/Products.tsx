import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Tilt from "react-parallax-tilt";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        mainImage: product.mainImage,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product);
    navigate(`/product/${product._id}`);
  };

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
          

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              All <span className="section-title">Products</span>
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
              Explore our complete footwear collection with premium quality,
              modern design, and everyday comfort.
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {currentProducts.map((product) => (
            <Tilt
              key={product._id}
              glareEnable={true}
              glareMaxOpacity={0.12}
              scale={1.02}
              transitionSpeed={1800}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              className="rounded-[28px]"
            >
              <div className="product-card group relative flex h-full flex-col overflow-hidden rounded-[28px] transition-all duration-500">
                {/* Top actions */}
                <div className="absolute right-4 top-4 z-20">
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:border-red-500 hover:text-red-500"
                  >
                    <FaHeart size={14} />
                  </button>
                </div>

                {/* Image */}
                <div
                  className="image-wrap relative flex h-72 cursor-pointer items-center justify-center overflow-hidden"
                  onClick={() => handleBuyNow(product)}
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />

                  <img
                    src={product.mainImage}
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
                        Rs. {product.price}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
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

        {/* Empty State */}
        {products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/60 text-lg">No products found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-11 min-w-[44px] items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
                  currentPage === page
                    ? "border-red-600 bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.28)]"
                    : "border-white/10 bg-white/5 text-white hover:border-red-500 hover:bg-red-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;