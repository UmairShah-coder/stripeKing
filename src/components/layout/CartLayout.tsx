import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
}

const product: Product = {
  id: 1,
  name: "Urban Classic Sneakers",
  price: "Rs. 3,400",
  images: [
    "/sho.png",
    "/heros.png",
    "/shoooo.png",
    "/shoess.png",
    "/shoessss.png",
    "/shooo.png",
  ],
  description:
    "These sneakers are designed for comfort and style. Perfect for urban adventures, casual outings, or gym sessions. Premium material ensures durability.",
  rating: 4,
  reviews: 34,
};

const ProductDetail: React.FC = () => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Rating: ${rating} stars\nReview: ${review}`);
    setReview("");
    setRating(5);
  };

  return (
    <>
      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          * { font-family: 'Poppins', sans-serif; }
        `}</style>

        {/* Left: Images */}
        <div className="flex-1">
          <div className="border text-black rounded-2xl overflow-hidden mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-[500px] ml-10 h-[500px] hover:scale-105  object-contain transition-transform duration-300"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setMainImage(img)}
                className={`w-20 h-20 border rounded-xl overflow-hidden cursor-pointer ${
                  mainImage === img ? "border-red-500" : "border-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name}-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-black">{product.name}</h1>

          {/* Product Rating in stars */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={i < product.rating ? "golden-text" : "text-gray-300"}
              />
            ))}
            <span className="text-black">({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl golden-text font-bold ">{product.price}</p>
          <p className="text-black">{product.description}</p>

          <div className="flex flex-col gap-4 mt-4">
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 flex items-center w-1/3 justify-center gap-2 bg-red-600 text-white hover:text-white font-medium rounded-full py-3 hover:bg-red-700 transition"
            >
              Add to Cart
            </button>

                <button
              onClick={() => navigate("/chat")}
              className="flex-1 flex border border-red-500 items-center w-[220px]  shadow-lg justify-center gap-2  text-red-500 hover:bg-red-600 hover:text-white font-medium rounded-full py-3  transition"
            >
              Chat About This Product
            </button>
          </div>

        
        </div>
      </section>

      {/* Customer Review Section */}
      <section className="mt-12 bg-white rounded-2xl shadow p-6 max-w-3xl mx-auto">
         <h2 className="text-2xl font-bold  mb-8 border-b-2 border-[#bca000] w-fit pb-2">
       Customer <span className="golden-text">Reviews</span> 
      </h2>

        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
          {/* Rating Dropdown with Stars */}
          <div className="flex flex-col gap-1">
            <label htmlFor="rating" className="font-medium text">
              Your Rating:
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-36 text-xl border golden-text border-red-500 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {"★".repeat(r) + "☆".repeat(5 - r)}
                </option>
              ))}
            </select>
          </div>

          {/* Review Textarea */}
          <div>
            <label className="block mb-1 font-medium text-black">Your Review:</label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              placeholder="Write your review here..."
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-600 text-white hover:text-white font-medium py-3 rounded-full hover:bg-red-700 transition"
          >
            Submit Review
          </button>
        </form>
      </section>
    </>
  );
};

export default ProductDetail;
