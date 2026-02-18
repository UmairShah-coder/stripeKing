import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const mockOrder = {
  id: "ORD-49-20260103-1847",
  user: {
    name: "Guest",
    email: "N/A",
  },
  shipping: {
    fullName: "Michael Anderson",
    phone: "44 7700 900123",
    address:
      "21 Baker Street, Marylebone, London, W1U 3BW, United Kingdom",
  },
  payment: {
    method: "COD",
    total: 7999,
    status: "Pending",
  },
  date: "1/3/2026, 11:47:16 PM",
  products: [
    {
      name: "Luxury Perfume",
      qty: 1,
      price: 7999,
      image: "/bloo.png",
    },
  ],
};

const OrderView: React.FC = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-5xl mx-auto">
      {/* Back */}
  
      <div className="flex justify-between">
 <h2 className="text-3xl font-bold golden-text mb-6">
        Order Details
      </h2>
          <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium rounded-full py-2 transition-colors"
      >
        <FaArrowLeft  /> Back
      </button>
      </div>

     

      {/* Order ID */}
      <div className="mb-6">
        <p className="text-lg font-semibold">
          Order ID:{" "}
          <span className="text-gray-700">{mockOrder.id}</span>
        </p>
      </div>

      {/* User Details */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">User Details</h3>
        <p><strong>Name:</strong> {mockOrder.user.name}</p>
        <p><strong>Email:</strong> {mockOrder.user.email}</p>
      </section>

      {/* Shipping Details */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">
          Shipping Details
        </h3>
        <p><strong>Full Name:</strong> {mockOrder.shipping.fullName}</p>
        <p><strong>Phone:</strong> {mockOrder.shipping.phone}</p>
        <p><strong>Address:</strong> {mockOrder.shipping.address}</p>
      </section>

      {/* Payment Info */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment Info</h3>
        <p><strong>Method:</strong> {mockOrder.payment.method}</p>
        <p><strong>Total:</strong> Rs {mockOrder.payment.total}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize">
            {mockOrder.payment.status}
          </span>
        </p>
      </section>

      {/* Order Date */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Date</h3>
        <p>{mockOrder.date}</p>
      </section>

      {/* Products */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Products</h3>

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          {mockOrder.products.map((product, index) => (
            <div
              key={index}
              className="flex gap-4 items-center p-4 border-b last:border-b-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-full rounded  object-cover"
              />

              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {product.qty}
                </p>
                <p className="text-sm text-gray-600">
                  Price: Rs {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OrderView;
