// src/pages/Checkout.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // for smooth animations

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const subtotal = 240;
  const shipping = 15;
  const total = subtotal + shipping;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-8 border-b-2 border-[#ca0808d4] w-fit pb-2">
          Checkout <span className="golden-text">StripeKing</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE — Payment Options + Conditional Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Payment Methods */}
            <div className="bg-white p-8 rounded-3xl border border-red-500 shadow-xl flex flex-col gap-6">
              <h3 className="text-2xl font-semibold text-gray-900">Select Payment Method</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* COD */}
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex-1 p-5 rounded-2xl border font-semibold transition-all duration-300
                  ${paymentMethod === "cod" ? "bg-red-600 text-white border-red-600 shadow-lg transform scale-105" : "bg-gray-100 border-gray-300 hover:bg-gray-200 hover:scale-105"}`}
                >
                  Cash on Delivery
                </button>

                {/* Card */}
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 p-5 rounded-2xl border font-semibold transition-all duration-300
                  ${paymentMethod === "card" ? "bg-red-600 text-white border-red-600 shadow-lg transform scale-105" : "bg-gray-100 border-gray-300 hover:bg-gray-200 hover:scale-105"}`}
                >
                  Credit / Debit Card
                </button>

                {/* Installment */}
                <button
                  disabled
                  className="flex-1 p-5 rounded-2xl border text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed"
                >
                  Installment
                </button>
              </div>
            </div>

            {/* Conditional Details with Smooth Animation */}
            <AnimatePresence mode="wait">
              {paymentMethod && (
                <motion.div
                  key={paymentMethod}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="bg-white p-8 rounded-3xl border border-gray-300 shadow-xl flex flex-col gap-6"
                >
                  {paymentMethod === "cod" && (
                    <div className="flex flex-col gap-4">
                      <h4 className="text-xl font-semibold text-gray-900">Cash on Delivery Instructions</h4>
                      <ul className="list-disc pl-5 text-gray-700 space-y-2">
                        <li>Pay in cash upon receiving your parcel.</li>
                        <li>Cash Payment Fee (7%), max Rs.100 applies only to COD.</li>
                        <li>Keep exact change ready.</li>
                        <li>Check delivery status as 'Out for Delivery' on the app.</li>
                        <li>Confirm airway bill shows parcel is from Daraz.</li>
                        <li>Verify order number, sender info, and tracking number before payment.</li>
                      </ul>
                      <button className="mt-6 w-fit bg-red-600 text-white px-8 py-3 rounded-2xl hover:bg-red-700 shadow-lg transition-all transform hover:scale-105">
                        Confirm COD
                      </button>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="flex flex-col gap-5">
                      <h4 className="text-xl font-semibold text-gray-900">Card Payment</h4>
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner transition"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Expiry MM/YY"
                          className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner transition"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner transition"
                        />
                      </div>
                      <p className="text-gray-600 text-sm">
                        Enter your card details carefully. No extra fees for card payment.
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY with Glassmorphism */}
          <div className="relative bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-red-500 h-fit">
            <div className="relative z-20 text-gray-900 p-8 flex flex-col gap-5">
              <h3 className="text-2xl font-bold border-b border-red-500 pb-3 mb-5">Order Summary</h3>
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700 text-lg">
                <span>Shipping</span>
                <span>Rs. {shipping}</span>
              </div>
              <div className="flex justify-between font-bold text-xl border-t border-red-500 pt-4 mt-4">
                <span>Total</span>
                <span className="text-red-600">Rs. {total}</span>
              </div>
              <Link
                to="/ordersuccess"
                className="mt-8 w-full bg-red-600 text-white font-bold py-3 rounded-2xl hover:bg-red-700 text-center shadow-lg transition-all transform hover:scale-105"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;