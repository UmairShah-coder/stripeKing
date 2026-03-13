import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import {
  ArrowRight,
  ShoppingBag,
  House,
  PackageCheck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const OrderSuccess: React.FC = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-white sm:px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .success-card {
          background: linear-gradient(135deg, rgba(15,15,15,0.50), rgba(28,28,28,0.28));
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.50),
            0 10px 30px rgba(220,38,38,0.10);
          backdrop-filter: blur(18px);
        }

        .soft-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(100px);
          opacity: 0.20;
          pointer-events: none;
        }

        .title-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #fecaca 45%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Background image */}
      <img
        src="/suc.png"
        alt="Order Success Background"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-125"
      />

      {/* overlays for readability */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/20 to-red-950/10" />

      {/* glows */}
      <div className="soft-glow left-[-60px] top-[-60px] h-72 w-72 bg-red-600" />
      <div className="soft-glow bottom-[-80px] right-[-50px] h-80 w-80 bg-red-500" />

      {/* Content */}
      <div className="success-card relative z-10 w-full max-w-xl overflow-hidden rounded-[32px]">
        <div className="relative p-6 sm:p-8 md:p-9">
          {/* top badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
            <Sparkles size={13} />
            Order Confirmed
          </div>

          {/* icon */}
          <div className="flex flex-col items-center text-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 shadow-[0_15px_40px_rgba(220,38,38,0.20)] sm:h-24 sm:w-24">
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <FaCheckCircle className="text-5xl text-red-400 sm:text-6xl" />
            </div>

            <h1 className="mt-6 text-2xl font-extrabold leading-tight text-white sm:text-3xl md:text-4xl">
              Order Placed{" "}
              <span className="title-gradient">Successfully</span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-7 text-white/65 sm:text-[15px]">
              Thank you for shopping with StripeKing. Your order has been placed
              successfully and is now being reviewed by our team for quick
              processing and dispatch.
            </p>
          </div>

          {/* info cards */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
              <PackageCheck className="mx-auto h-5 w-5 text-red-400" />
              <p className="mt-2 text-sm font-semibold text-white">
                Order Received
              </p>
              <p className="mt-1 text-xs leading-5 text-white/45">
                Your purchase request has been recorded.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
              <ShieldCheck className="mx-auto h-5 w-5 text-red-400" />
              <p className="mt-2 text-sm font-semibold text-white">
                Payment Secured
              </p>
              <p className="mt-1 text-xs leading-5 text-white/45">
                Checkout completed in a protected flow.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
              <ShoppingBag className="mx-auto h-5 w-5 text-red-400" />
              <p className="mt-2 text-sm font-semibold text-white">
                Processing Started
              </p>
              <p className="mt-1 text-xs leading-5 text-white/45">
                Our team is preparing your order details.
              </p>
            </div>
          </div>

          {/* order id */}
          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-center backdrop-blur-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/40">
              Tracking Reference
            </p>
            <p className="mt-2 text-xl font-bold text-red-300 sm:text-2xl">
              #123456
            </p>
            <p className="mt-1 text-sm text-white/45">
              Save this order ID for future reference.
            </p>
          </div>

          {/* buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(220,38,38,0.28)] transition-all duration-300 hover:bg-red-700"
            >
              <House size={16} />
              Back to Home
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;