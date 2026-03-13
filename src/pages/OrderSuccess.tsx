import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import {
  ArrowRight,
  ShoppingBag,
  House,
  PackageCheck,
  Sparkles,
  ShieldCheck,
  Receipt,
  Truck,
} from "lucide-react";

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || "N/A";

  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .success-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03));
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow:
            0 30px 80px rgba(0,0,0,0.45),
            0 10px 30px rgba(220,38,38,0.10);
          backdrop-filter: blur(18px);
        }

        .glass-soft {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
        }

        .soft-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(110px);
          opacity: 0.18;
          pointer-events: none;
        }

        .title-gradient {
          background: linear-gradient(90deg, #ffffff 0%, #fecaca 45%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .inner-border {
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
        }
      `}</style>

      {/* Background */}
      <img
        src="/suc.png"
        alt="Order Success Background"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />

      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-red-950/20" />

      <div className="soft-glow left-[-60px] top-[-60px] h-72 w-72 bg-red-600" />
      <div className="soft-glow bottom-[-80px] right-[-50px] h-80 w-80 bg-red-500" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center justify-center">
        <div className="success-card inner-border w-full overflow-hidden rounded-[34px]">
          {/* Top strip */}
          <div className="border-b border-white/10 bg-gradient-to-r from-red-600/20 via-red-500/10 to-transparent px-6 py-5 sm:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
              <Sparkles size={13} />
              Order Confirmed
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left Content */}
            <div>
              <div className="flex flex-col items-start">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 shadow-[0_15px_40px_rgba(220,38,38,0.20)] sm:h-24 sm:w-24">
                  <div className="absolute inset-2 rounded-full border border-white/10" />
                  <FaCheckCircle className="text-5xl text-red-400 sm:text-6xl" />
                </div>

                <h1 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Order Placed{" "}
                  <span className="title-gradient">Successfully</span>
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  Thank you for shopping with us. Your order has been received
                  successfully and our team has started processing it for quick
                  confirmation and dispatch.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="glass-soft rounded-[22px] p-4">
                  <PackageCheck className="h-5 w-5 text-red-400" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Order Received
                  </p>
                  <p className="mt-1 text-xs leading-6 text-white/45">
                    Your order details have been successfully recorded.
                  </p>
                </div>

                <div className="glass-soft rounded-[22px] p-4">
                  <ShieldCheck className="h-5 w-5 text-red-400" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    COD Selected
                  </p>
                  <p className="mt-1 text-xs leading-6 text-white/45">
                    Payment will be collected when the parcel is delivered.
                  </p>
                </div>

                <div className="glass-soft rounded-[22px] p-4">
                  <Truck className="h-5 w-5 text-red-400" />
                  <p className="mt-3 text-sm font-semibold text-white">
                    Processing Started
                  </p>
                  <p className="mt-1 text-xs leading-6 text-white/45">
                    Your items are now being prepared for dispatch.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(220,38,38,0.28)] transition-all duration-300 hover:bg-red-700"
                >
                  <House size={16} />
                  Back to Home
                </Link>

                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red-500 hover:bg-red-600"
                >
                  Continue Shopping
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="glass-soft rounded-[28px] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
                <Receipt size={15} />
                Order Reference
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-black/30 p-5 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.20em] text-white/40">
                  Tracking ID
                </p>
                <p className="mt-3 break-all text-2xl font-extrabold text-red-300 sm:text-3xl">
                  {orderId}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/45">
                  Save this order ID for tracking, support, or future reference.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <ShoppingBag className="mt-0.5 h-5 w-5 text-red-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Your order is confirmed
                    </p>
                    <p className="mt-1 text-xs leading-6 text-white/45">
                      We have received your purchase request successfully.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-red-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Payment status
                    </p>
                    <p className="mt-1 text-xs leading-6 text-white/45">
                      Cash on Delivery selected. Payment remains pending until delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Truck className="mt-0.5 h-5 w-5 text-red-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Delivery process
                    </p>
                    <p className="mt-1 text-xs leading-6 text-white/45">
                      Our team will review and dispatch your order as soon as possible.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-xs leading-6 text-white/35">
                Keep your phone active because a confirmation call or message may be sent before dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;