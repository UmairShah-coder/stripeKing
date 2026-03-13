import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  FaMinus,
  FaPlus,
  FaStar,
  FaShoppingCart,
  FaCommentDots,
  FaTruck,
  FaUndo,
  FaBolt,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";

interface Variant {
  size: string;
  color: string;
  stock: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  mainImage: string;
  galleryImages: string[];
  variants: Variant[];
  badges?: string[];
  netWeight?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const data: Product = res.data;

        setProduct(data);
        setMainImage(data.mainImage || "/placeholder.png");

        if (data.variants.length > 0) {
          const firstSize = data.variants[0].size;
          const firstColor =
            data.variants.find((v) => v.size === firstSize)?.color || "";
          setSelectedSize(firstSize);
          setSelectedColor(firstColor);
        }
      } catch (err) {
        console.error(err);
        setError("Product fetch nahi ho saka 😢");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const sizes = useMemo(
    () => (product ? Array.from(new Set(product.variants.map((v) => v.size))) : []),
    [product]
  );

  const colorsForSize = useMemo(
    () =>
      product
        ? product.variants.filter((v) => v.size === selectedSize).map((v) => v.color)
        : [],
    [product, selectedSize]
  );

  const allColors = useMemo(
    () => (product ? Array.from(new Set(product.variants.map((v) => v.color))) : []),
    [product]
  );

  const currentVariant = product?.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  const stock = currentVariant?.stock ?? 0;

  const discountPercentage =
    product?.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor || stock === 0) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find(
      (item: any) =>
        item._id === product._id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        mainImage: product.mainImage,
        quantity,
        selectedSize,
        selectedColor,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
  };

  const handleOpenChat = () => {
    navigate("/chat");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          <p className="text-lg font-semibold text-white/85">Loading product...</p>
          <p className="mt-2 text-sm text-white/45">
            Please wait while we prepare the product details.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-[32px] border border-red-500/20 bg-red-500/10 p-8 text-center backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <p className="text-xl font-semibold text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .glass-panel {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 22px 60px rgba(0,0,0,0.30);
          backdrop-filter: blur(18px);
        }

        .soft-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(100px);
          opacity: 0.18;
          pointer-events: none;
        }

        .subtle-border {
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);
        }
      `}</style>

      <div className="soft-glow left-[-70px] top-[-80px] h-72 w-72 bg-red-600" />
      <div className="soft-glow bottom-[-90px] right-[-70px] h-80 w-80 bg-red-500" />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
       

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Left Side */}
          <div className="glass-panel subtle-border rounded-[34px] p-4 sm:p-5 lg:p-6">
            <div className="grid gap-4 lg:grid-cols-[100px_1fr]">
              <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col">
                {[product.mainImage, ...product.galleryImages].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    onMouseEnter={() => setMainImage(img)}
                    className={`group relative min-w-[78px] overflow-hidden rounded-2xl border transition-all duration-300 ${
                      mainImage === img
                        ? "border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.25)]"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name}-${idx}`}
                      className="h-20 w-20 object-cover transition duration-300 group-hover:scale-105 lg:h-24 lg:w-full"
                    />
                  </button>
                ))}
              </div>

              <div className="order-1 lg:order-2">
                <div
                  onClick={() => setZoomOpen(true)}
                  className="group relative flex min-h-[430px] cursor-zoom-in items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.12),rgba(255,255,255,0.02),rgba(0,0,0,0.3))] p-6"
                >
                  {discountPercentage > 0 && (
                    <div className="absolute left-5 top-5 rounded-full border border-red-400/20 bg-red-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                      -{discountPercentage}% Off
                    </div>
                  )}

                  <img
                    src={mainImage}
                    alt={product.name}
                    className="max-h-[460px] w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="glass-panel subtle-border rounded-[34px] p-6 sm:p-8 lg:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                {product.badges && product.badges.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {product.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-white sm:text-2xl">
                  {product.name}
                </h1>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`h-4 w-4 ${i < 4 ? "text-yellow-400" : "text-white/20"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/50">76 Ratings</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="text-sm text-white/50">50 Reviews</span>
            </div>

            <div className="mt-7 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-end gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-red-400">
                  Rs. {product.price}
                </h2>

                {product.oldPrice && (
                  <span className="pb-1 text-lg text-white/30 line-through">
                    Rs. {product.oldPrice}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {product.netWeight && (
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/65">
                    Net Weight: {product.netWeight}
                  </span>
                )}

                <span
                  className={`rounded-full border px-3 py-2 text-xs font-medium ${
                    stock === 0
                      ? "border-red-500/20 bg-red-500/10 text-red-300"
                      : "border-green-500/20 bg-green-500/10 text-green-300"
                  }`}
                >
                  {stock === 0 ? "Out of Stock" : `${stock} item(s) available`}
                </span>
              </div>
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-red-500">
                Description:-
              </h3>
              <p className="mt-3 text-sm leading-8 text-white/65 sm:text-base">
                {product.description}
              </p>
            </div>

            <div className="mt-8 grid gap-6">
              {/* Size */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Select Size
                  </h4>
                  <span className="text-xs text-white/35">{selectedSize || "Not selected"}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        const firstColor =
                          product.variants.find((v) => v.size === size)?.color || "";
                        setSelectedColor(firstColor);
                        setQuantity(1);
                      }}
                      className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-red-600 text-white shadow-[0_12px_24px_rgba(220,38,38,0.28)]"
                          : "border border-white/10 bg-white/[0.04] text-white/80 hover:border-red-500/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                    Select Color
                  </h4>
                  <span className="text-xs text-white/35">{selectedColor || "Not selected"}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {allColors.map((color) => {
                    const available = colorsForSize.includes(color);

                    return (
                      <button
                        key={color}
                        onClick={() => available && setSelectedColor(color)}
                        disabled={!available}
                        className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                          selectedColor === color
                            ? "bg-red-600 text-white shadow-[0_12px_24px_rgba(220,38,38,0.28)]"
                            : "border border-white/10 bg-white/[0.04] text-white/80 hover:border-red-500/50"
                        } ${!available ? "cursor-not-allowed opacity-35" : ""}`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                      Quantity
                    </h4>

                    <div className="mt-3 inline-flex items-center overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-4 py-3 text-white/80 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <FaMinus size={12} />
                      </button>

                      <span className="min-w-[72px] text-center text-base font-semibold text-white">
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity((q) => Math.min(q + 1, stock || 1))}
                        className="px-4 py-3 text-white/80 transition hover:bg-white/[0.04] hover:text-white"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2 text-sm text-white/55">
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-red-400" />
                      Secure product selection
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTruck className="text-red-400" />
                      Fast dispatch available
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  onClick={handleBuyNow}
                  disabled={stock === 0}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 ${
                    stock === 0
                      ? "cursor-not-allowed bg-white/10 text-white/35"
                      : "bg-red-600 text-white shadow-[0_12px_28px_rgba(220,38,38,0.28)] hover:bg-red-700"
                  }`}
                >
                  <FaBolt size={14} />
                  Buy Now
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-7 py-4 text-sm font-semibold transition-all duration-300 ${
                    stock === 0
                      ? "cursor-not-allowed border-white/10 text-white/35"
                      : "border-red-500 text-red-400 hover:bg-red-600 hover:text-white"
                  }`}
                >
                  <FaShoppingCart size={14} />
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="glass-panel subtle-border rounded-[28px] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <FaMoneyBillWave className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-white">COD Available</p>
            <p className="mt-1 text-sm leading-6 text-white/50">
              Cash on delivery available for eligible locations.
            </p>
          </div>

          <div className="glass-panel subtle-border rounded-[28px] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <FaUndo className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-white">15-Day Returns</p>
            <p className="mt-1 text-sm leading-6 text-white/50">
              Easy return process with customer-friendly support.
            </p>
          </div>

          <div className="glass-panel subtle-border rounded-[28px] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <FaTruck className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-white">Free Delivery</p>
            <p className="mt-1 text-sm leading-6 text-white/50">
              Free delivery available on qualifying order values.
            </p>
          </div>

          <div className="glass-panel subtle-border rounded-[28px] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <FaShieldAlt className="h-5 w-5" />
            </div>
            <p className="mt-4 text-base font-semibold text-white">Secure Checkout</p>
            <p className="mt-1 text-sm leading-6 text-white/50">
              Smooth and reliable buying experience for every order.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={handleOpenChat}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_18px_35px_rgba(220,38,38,0.35)] transition-transform duration-300 hover:scale-110 hover:bg-red-700"
      >
        <FaCommentDots className="h-6 w-6" />
      </button>

      {/* Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-w-6xl">
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute -right-2 -top-2 z-10 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              Close
            </button>

            <img
              src={mainImage}
              alt={product.name}
              className="max-h-[90vh] max-w-[90vw] rounded-[28px] border border-white/10 bg-black p-3 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;