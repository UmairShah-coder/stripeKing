import React from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Review {
  id: number;
  userName: string;
  email: string;
  product: string;
  productImage: string;
  rating: number;
  comment: string;
}

// Same mockReviews array
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

const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const review = mockReviews.find((r) => r.id === Number(id));

  if (!review) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Review Not Found</h2>
        <button
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Review Details</h2>

      <p>
        <span className="font-semibold">User:</span> {review.userName}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {review.email}
      </p>
      <p>
        <span className="font-semibold">Product:</span> {review.product}
      </p>
      <p>
        <span className="font-semibold">Rating:</span> ⭐ {review.rating}
      </p>
      <p className="mt-4">
        <span className="font-semibold">Comment:</span>
      </p>
      <p className="bg-gray-100 p-4 rounded-md mt-1">{review.comment}</p>

      <button
        className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default ReviewDetailPage;
