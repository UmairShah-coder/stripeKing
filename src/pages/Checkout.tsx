// src/pages/Checkout.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = 240;
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <section className="min-h-screen text-black px-6 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 border-b-2 border-[#ca0808d4] w-fit pb-2">
          Checkout <span className="golden-text">StripeKing</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT SIDE — BILLING FORM */}
          <div className="lg:col-span-2 bg-white text-gray-800 p-10 border border-red-500 rounded-3xl shadow-xl flex flex-col gap-6">
            <h3 className="text-2xl font-bold mb-6">Billing Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="modern-input"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="modern-input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <input type="text" placeholder="City" className="modern-input" />
              <input
                type="text"
                placeholder="Country"
                className="modern-input"
              />
            </div>

            <textarea
              placeholder="Full Address"
              rows={4}
              className="modern-input mt-4 resize-none"
            ></textarea>

            {/* Payment Method */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

              <div className="flex flex-col gap-3">
                {["cod", "stripe"].map((method) => (
                  <label
                    key={method}
                    className={`payment-card ${
                      paymentMethod === method ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method === "cod"
                      ? "Cash on Delivery"
                      :"Credit / Debit Card"
                      }
                  </label>
                ))}
              </div>
            </div>

            {/* Modern styles */}
            <style>{`
              .modern-input {
                width: 100%;
                padding: 14px;
                border-radius: 12px;
                border: 1px solid #e5e7eb;
                background: #f9fafb;
                color: #111827;
                outline: none;
                transition: all 0.3s;
              }
              .modern-input::placeholder {
                color: #9ca3af;
              }
              .modern-input:focus {
                border-color: #ca0808d4;
               
              }
              .payment-card {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                border-radius: 12px;
                border: 1px solid #d1d5db;
                cursor: pointer;
                transition: all 0.2s;
                background: #f9fafb;
                font-weight: 500;
              }
              .payment-card input {
                accent-color: #ca0808d4;
              }
              .payment-card:hover {
                border-color: #ca0808d4;
                background: #ca0808d4;
              }
              .payment-card.selected {
                border-color: #ca0808d4;
                background: #ca0808d4;
                font-weight: 600;
                color:white;
              }
            `}</style>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl h-fit">
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <div className="relative z-30 text-white p-8 border border-[#ca0808d4] rounded-2xl flex flex-col gap-4">
              <h3 className="text-xl font-bold border-b border-[#ca0808d4] pb-3 mb-5">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3 text-white/80">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between mb-3 text-white/80">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t border-[#ca0808d4] pt-4 mt-4">
                <span>Total</span>
                <span className="text-[#ca0808d4]">${total}</span>
              </div>

              <Link
                to="/ordersuccess"
                className="mt-8 w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 hover:text-white transition-colors shadow-lg text-center"
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
