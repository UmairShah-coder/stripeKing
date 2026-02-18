import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSearch, FaEye } from "react-icons/fa";

interface Review {
  id: number;
  userName: string;
  email: string;
  product: string;
  productImage: string;
  rating: number;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "Ali Khan",
    email: "ali@gmail.com",
    product: "Sneakers",
    productImage: "/icon.png",
    rating: 5,
    comment: "Excellent quality, very comfortable!",
  },
  {
    id: 2,
    userName: "Ahmed Raza",
    email: "ahmed@gmail.com",
    product: "Formals",
    productImage: "/blogg.png",
    rating: 4,
    comment: "Good shoes but delivery was late.",
  },
];

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((rev) => rev.id !== id));
    }
  };

  const filteredReviews = reviews.filter(
    (rev) =>
      rev.userName.toLowerCase().includes(search.toLowerCase()) ||
      rev.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl ml-[-1px] shadow max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold golden-text mb-1">Reviews</h2>
          <p className="text-gray-600">Manage customer product reviews.</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full sm:w-64 mb-5">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-100 golden-text text-center">
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Product Image</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Comment</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500 border">
                  No reviews found
                </td>
              </tr>
            ) : (
              filteredReviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border text-center font-medium truncate">
                    {rev.userName}
                  </td>
                  <td className="px-4 py-3 border text-center text-gray-600 truncate">
                    {rev.email}
                  </td>
                  <td className="px-4 py-3 border text-center truncate">{rev.product}</td>
                  <td className="px-4 py-3 border text-center">
                    <div className="flex justify-center">
                      <img
                        src={rev.productImage}
                        alt={rev.product}
                        className="w-20 h-ful object-cover rounded-md"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 border text-center">⭐ {rev.rating}</td>

                  {/* COMMENT EYE ICON */}
                  <td className="px-4 py-3 border text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate(`/review/${rev.id}`)}
                        title="View Comment"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaEye size={16} />
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-3 border">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="text-red-500 hover:text-red-600"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsPage;
