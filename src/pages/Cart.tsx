import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  Truck,
  Banknote,
  ChevronRight,
  Lock,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Receipt,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Package2,
} from "lucide-react";

type CartItem = {
  _id: string;
  name: string;
  price: number;
  mainImage: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type PaymentMethod = "cod" | "card" | "installment";
type CheckoutStep = "address" | "payment";

const CHECKOUT_FORM_KEY = "checkoutFormData";
const CHECKOUT_CARD_KEY = "checkoutCardData";

const Checkout: React.FC = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [checkoutMode, setCheckoutMode] = useState<"cart" | "buyNow">("cart");
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const normalizeCartItems = (items: any[]): CartItem[] => {
    if (!Array.isArray(items)) return [];

    const merged = new Map<string, CartItem>();

    items.forEach((raw) => {
      if (!raw?._id) return;

      const quantity = Math.max(1, Number(raw.quantity) || 1);
      const selectedSize = String(raw.selectedSize || "").trim();
      const selectedColor = String(raw.selectedColor || "").trim();

      const normalized: CartItem = {
        _id: String(raw._id),
        name: String(raw.name || "Product"),
        price: Number(raw.price) || 0,
        mainImage: String(raw.mainImage || "/placeholder.png"),
        quantity,
        selectedSize,
        selectedColor,
      };

      const key = `${normalized._id}__${normalized.selectedSize}__${normalized.selectedColor}`;

      if (merged.has(key)) {
        const existing = merged.get(key)!;
        merged.set(key, {
          ...existing,
          quantity: existing.quantity + normalized.quantity,
        });
      } else {
        merged.set(key, normalized);
      }
    });

    return Array.from(merged.values());
  };

  const getStorageKey = (mode: "cart" | "buyNow") =>
    mode === "buyNow" ? "checkoutItems" : "cart";

  useEffect(() => {
    const mode = localStorage.getItem("checkoutMode") === "buyNow" ? "buyNow" : "cart";
    setCheckoutMode(mode);

    const storageKey = getStorageKey(mode);
    const rawItems = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const normalizedItems = normalizeCartItems(rawItems);

    setCart(normalizedItems);
    localStorage.setItem(storageKey, JSON.stringify(normalizedItems));

    const savedFormData = localStorage.getItem(CHECKOUT_FORM_KEY);
    const savedCardData = localStorage.getItem(CHECKOUT_CARD_KEY);

    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    if (savedCardData) {
      setCardData(JSON.parse(savedCardData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CHECKOUT_FORM_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem(CHECKOUT_CARD_KEY, JSON.stringify(cardData));
  }, [cardData]);

  const persistCart = (updatedCart: CartItem[]) => {
    const normalizedItems = normalizeCartItems(updatedCart);
    setCart(normalizedItems);

    const storageKey = getStorageKey(checkoutMode);
    localStorage.setItem(storageKey, JSON.stringify(normalizedItems));
  };

  const removeItem = (id: string, size: string, color: string) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item._id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
        )
    );

    persistCart(updatedCart);
  };

  const updateQuantity = (
    id: string,
    size: string,
    color: string,
    type: "increase" | "decrease"
  ) => {
    const updatedCart = cart.map((item) => {
      if (
        item._id === id &&
        item.selectedSize === size &&
        item.selectedColor === color
      ) {
        const currentQty = Math.max(1, Number(item.quantity) || 1);
        const newQuantity =
          type === "increase" ? currentQty + 1 : Math.max(1, currentQty - 1);

        return {
          ...item,
          quantity: newQuantity,
        };
      }

      return item;
    });

    persistCart(updatedCart);
  };

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0),
    [cart]
  );

  const shipping = cart.length > 0 ? 180 : 0;
  const taxes = cart.length > 0 ? 50 : 0;
  const total = subtotal + shipping + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAddress = () => {
    const { firstName, lastName, email, phone, address, city } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim()
    ) {
      alert("Please fill all address fields");
      return false;
    }

    return true;
  };

  const handleContinueToPayment = () => {
    if (!validateAddress()) return;
    setCurrentStep("payment");
  };

  const handleBackToAddress = () => {
    setCurrentStep("address");
  };

  const handleCompletePurchase = async () => {
    if (!validateAddress()) {
      setCurrentStep("address");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (paymentMethod !== "cod") {
      alert("Currently only Cash on Delivery is available");
      return;
    }

    try {
      setPlacingOrder(true);

      const payload = {
        customer: formData,
        items: cart,
        paymentMethod: "cod",
      };

      const res = await axios.post("http://localhost:5000/api/orders", payload);
      const createdOrder = res.data.order;

      if (checkoutMode === "buyNow") {
        localStorage.removeItem("checkoutItems");
        localStorage.removeItem("checkoutMode");
      } else {
        localStorage.removeItem("cart");
      }

      localStorage.removeItem(CHECKOUT_FORM_KEY);
      localStorage.removeItem(CHECKOUT_CARD_KEY);

      setCart([]);

      navigate("/ordersuccess", {
        state: {
          orderId: createdOrder.orderId,
          orderDbId: createdOrder._id,
        },
      });
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Order place nahi ho saka");
    } finally {
      setPlacingOrder(false);
    }
  };

  const steps = [
    { key: "address", label: "Address", icon: Truck },
    { key: "payment", label: "Payment", icon: CreditCard },
  ];

  const getColorStyle = (color: string) => {
    const lower = color.toLowerCase().trim();

    const colorMap: Record<string, string> = {
      red: "#ef4444",
      blue: "#3b82f6",
      green: "#22c55e",
      yellow: "#eab308",
      black: "#111111",
      white: "#ffffff",
      gray: "#6b7280",
      grey: "#6b7280",
      purple: "#a855f7",
      pink: "#ec4899",
      orange: "#f97316",
      brown: "#8b5e3c",
      beige: "#d6c6a8",
      maroon: "#7f1d1d",
      navy: "#1e3a8a",
      gold: "#d4af37",
      silver: "#c0c0c0",
      cream: "#f5f5dc",
      olive: "#808000",
      skyblue: "#38bdf8",
    };

    return colorMap[lower] || color || "#6b7280";
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#190505,#080808_45%,#040404_100%)] px-4 py-8 text-white md:px-8 lg:px-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 24px 60px rgba(0,0,0,0.34);
          backdrop-filter: blur(18px);
        }

        .glass-soft {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(16px);
        }

        .input-dark {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          color: white;
          transition: all 0.3s ease;
        }

        .input-dark::placeholder {
          color: rgba(255,255,255,0.35);
        }

        .input-dark:focus {
          border-color: rgba(220,38,38,0.8);
          box-shadow: 0 0 0 4px rgba(220,38,38,0.08);
          background: rgba(255,255,255,0.06);
          outline: none;
        }

        .soft-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(110px);
          opacity: 0.18;
          pointer-events: none;
        }

        .inner-border {
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
        }

        .hide-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
        }

        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>

      <div className="soft-glow left-[-70px] top-[-80px] h-72 w-72 bg-red-600" />
      <div className="soft-glow bottom-[-120px] right-[-70px] h-80 w-80 bg-red-500" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 rounded-[32px] border border-white/10 bg-white/[0.03] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl md:px-8 md:py-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Complete Your{" "}
                <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                  Order
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                Premium checkout experience with persistent local save, fixed billing,
                cleaner summary, and proper quantity handling for every selected product.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="glass-soft rounded-2xl px-4 py-4 text-center">
                <Truck className="mx-auto h-5 w-5 text-red-400" />
                <p className="mt-2 text-xs font-medium text-white/60">
                  Fast Delivery
                </p>
              </div>
              <div className="glass-soft rounded-2xl px-4 py-4 text-center">
                <Lock className="mx-auto h-5 w-5 text-red-400" />
                <p className="mt-2 text-xs font-medium text-white/60">
                  Secure Pay
                </p>
              </div>
              <div className="glass-soft rounded-2xl px-4 py-4 text-center">
                <Receipt className="mx-auto h-5 w-5 text-red-400" />
                <p className="mt-2 text-xs font-medium text-white/60">
                  Fixed Billing
                </p>
              </div>
              <div className="glass-soft rounded-2xl px-4 py-4 text-center">
                <ShoppingBag className="mx-auto h-5 w-5 text-red-400" />
                <p className="mt-2 text-xs font-medium text-white/60">
                  Saved Locally
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="glass-card inner-border rounded-[30px] p-4 md:p-5">
            <div className="grid grid-cols-2 gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.key;
                const isCompleted =
                  currentStep === "payment" && step.key === "address";

                return (
                  <button
                    key={step.key}
                    type="button"
                    onClick={() => setCurrentStep(step.key as CheckoutStep)}
                    className={`group relative overflow-hidden rounded-[24px] border px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-red-500 bg-red-500/10 shadow-[0_15px_30px_rgba(220,38,38,0.18)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          isActive || isCompleted
                            ? "bg-red-500/15 text-red-400"
                            : "bg-white/10 text-white/60"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <Icon size={20} />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
                          Step {index + 1}
                        </p>
                        <p
                          className={`mt-1 text-sm font-semibold ${
                            isActive ? "text-white" : "text-white/70"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="glass-card inner-border overflow-hidden rounded-[34px]">
              <div className="border-b border-white/10 px-6 py-6 md:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                      {currentStep === "address"
                        ? "Shipping Information"
                        : "Payment Information"}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-white">
                      {currentStep === "address"
                        ? "Delivery Address"
                        : "Choose Payment Method"}
                    </h2>
                  </div>

                  <div className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center sm:block">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      Current Step
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {currentStep === "address" ? "Address" : "Payment"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-8 md:px-8">
                {currentStep === "address" && (
                  <div>
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="glass-soft rounded-2xl p-4">
                        <User className="h-5 w-5 text-red-400" />
                        <p className="mt-3 text-sm font-semibold text-white">
                          Personal Info
                        </p>
                        <p className="mt-1 text-xs leading-6 text-white/45">
                          Add your name and contact details.
                        </p>
                      </div>

                      <div className="glass-soft rounded-2xl p-4">
                        <MapPin className="h-5 w-5 text-red-400" />
                        <p className="mt-3 text-sm font-semibold text-white">
                          Delivery Address
                        </p>
                        <p className="mt-1 text-xs leading-6 text-white/45">
                          Provide accurate shipping location.
                        </p>
                      </div>

                      <div className="glass-soft rounded-2xl p-4">
                        <Package2 className="h-5 w-5 text-red-400" />
                        <p className="mt-3 text-sm font-semibold text-white">
                          Local Save
                        </p>
                        <p className="mt-1 text-xs leading-6 text-white/45">
                          Your checkout data stays saved in browser.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="relative">
                        <User
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                        />
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="input-dark h-14 w-full rounded-2xl pl-11 pr-4 text-sm"
                        />
                      </div>

                      <div className="relative">
                        <User
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                        />
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="input-dark h-14 w-full rounded-2xl pl-11 pr-4 text-sm"
                        />
                      </div>

                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address"
                          className="input-dark h-14 w-full rounded-2xl pl-11 pr-4 text-sm"
                        />
                      </div>

                      <div className="relative">
                        <Phone
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                        />
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="input-dark h-14 w-full rounded-2xl pl-11 pr-4 text-sm"
                        />
                      </div>

                      <div className="relative md:col-span-2">
                        <MapPin
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                        />
                        <input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Street Address"
                          className="input-dark h-14 w-full rounded-2xl pl-11 pr-4 text-sm"
                        />
                      </div>

                      <input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="input-dark h-14 w-full rounded-2xl px-4 text-sm md:col-span-2"
                      />
                    </div>

                    <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Make sure your details are correct
                          </p>
                          <p className="mt-1 text-sm text-white/45">
                            Accurate info helps avoid delivery delays.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={handleContinueToPayment}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-red-700"
                        >
                          Continue to Payment
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === "payment" && (
                  <div>
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div
                        className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
                          paymentMethod === "cod"
                            ? "border-red-500 bg-red-500/8 shadow-[0_12px_24px_rgba(220,38,38,0.12)]"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("cod")}
                          className="w-full p-5 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                paymentMethod === "cod"
                                  ? "bg-red-500/15 text-red-400"
                                  : "bg-white/10 text-white/60"
                              }`}
                            >
                              <Banknote size={20} />
                            </div>

                            <input
                              type="radio"
                              checked={paymentMethod === "cod"}
                              onChange={() => setPaymentMethod("cod")}
                              className="mt-1 h-4 w-4 accent-red-600"
                            />
                          </div>

                          <p className="mt-4 text-sm font-semibold text-white">
                            Cash on Delivery
                          </p>
                          <p className="mt-2 text-xs leading-6 text-white/45">
                            Payment at the time of parcel arrival.
                          </p>
                        </button>
                      </div>

                      <div
                        className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
                          paymentMethod === "card"
                            ? "border-red-500 bg-red-500/8 shadow-[0_12px_24px_rgba(220,38,38,0.12)]"
                            : "border-white/10 bg-white/[0.03]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className="w-full p-5 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                paymentMethod === "card"
                                  ? "bg-red-500/15 text-red-400"
                                  : "bg-white/10 text-white/60"
                              }`}
                            >
                              <CreditCard size={20} />
                            </div>

                            <input
                              type="radio"
                              checked={paymentMethod === "card"}
                              onChange={() => setPaymentMethod("card")}
                              className="mt-1 h-4 w-4 accent-red-600"
                            />
                          </div>

                          <p className="mt-4 text-sm font-semibold text-white">
                            Credit / Debit Card
                          </p>
                          <p className="mt-2 text-xs leading-6 text-white/45">
                            Protected card checkout with secure flow.
                          </p>
                        </button>
                      </div>

                      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] opacity-70">
                        <button
                          type="button"
                          disabled
                          className="w-full cursor-not-allowed p-5 text-left"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white/40">
                              <CreditCard size={20} />
                            </div>

                            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                              Disabled
                            </span>
                          </div>

                          <p className="mt-4 text-sm font-semibold text-white/70">
                            Installment
                          </p>
                          <p className="mt-2 text-xs leading-6 text-white/40">
                            Currently unavailable for this checkout.
                          </p>
                        </button>
                      </div>
                    </div>

                    {paymentMethod === "cod" && (
                      <div className="mb-6 rounded-[28px] border border-red-500/20 bg-red-500/5 p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-400">
                            <Banknote size={20} />
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              Cash on Delivery
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-white/50">
                              Aap parcel receive karte waqt payment denge.
                              Confirmation call ya SMS aa sakta hai, is liye
                              address aur phone number bilkul sahi rakhein.
                            </p>

                            <div className="mt-4 grid gap-3 sm:grid-cols-3">
                              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
                                Easy process
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
                                Confirm on delivery
                              </div>
                              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
                                Fast checkout
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="mb-6 rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-5 flex items-center gap-2 text-sm text-white/50">
                          <Lock size={14} />
                          <span>Secure card payment</span>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <input
                            type="text"
                            name="cardName"
                            value={cardData.cardName}
                            onChange={handleCardChange}
                            placeholder="Name on Card"
                            className="input-dark h-14 w-full rounded-2xl px-4 text-sm md:col-span-2"
                          />

                          <input
                            type="text"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleCardChange}
                            placeholder="Card Number"
                            className="input-dark h-14 w-full rounded-2xl px-4 text-sm md:col-span-2"
                          />

                          <input
                            type="text"
                            name="expiry"
                            value={cardData.expiry}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                            className="input-dark h-14 w-full rounded-2xl px-4 text-sm"
                          />

                          <input
                            type="password"
                            name="cvv"
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            placeholder="CVV"
                            className="input-dark h-14 w-full rounded-2xl px-4 text-sm"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                      <button
                        type="button"
                        onClick={handleBackToAddress}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3.5 text-sm font-semibold text-white/75 transition-all hover:bg-white/5"
                      >
                        <ArrowLeft size={16} />
                        Back to Address
                      </button>

                      <button
                        type="button"
                        onClick={handleCompletePurchase}
                        disabled={cart.length === 0 || placingOrder}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-red-700 hover:to-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <CheckCircle2 size={18} />
                        {placingOrder ? "Placing Order..." : "Complete Purchase"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card inner-border sticky top-6 overflow-hidden rounded-[34px]">
              <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-red-600 to-rose-600 px-6 py-6 text-white">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-50">
                    <Receipt size={13} />
                    Order Summary
                  </div>

                  <h2 className="mt-3 text-2xl font-bold">
                    {checkoutMode === "buyNow"
                      ? "Review Your Product"
                      : "Review Your Cart"}
                  </h2>
                  <p className="mt-1 text-sm text-red-100">
                    {cart.length} variant(s) • {totalItems} item(s) selected
                  </p>
                </div>
              </div>

              {/* Compact professional summary list */}
              <div className="max-h-[380px] overflow-y-auto px-6 py-5 hide-scrollbar">
                {cart.length > 0 ? (
                  <div className="space-y-3">
                    {cart.map((item, index) => (
                      <div
                        key={`${item._id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                        className="rounded-[22px] border border-white/10 bg-white/[0.03] p-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.045]"
                      >
                        <div className="flex gap-3">
                          <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-white/5">
                            <img
                              src={item.mainImage}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="line-clamp-2 text-sm font-semibold text-white">
                                {item.name}
                              </h3>

                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(
                                    item._id,
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                }
                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/55 transition hover:border-red-500/30 hover:bg-red-600 hover:text-white"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.selectedSize && (
                                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300">
                                  Size: {item.selectedSize}
                                </span>
                              )}

                              {item.selectedColor && (
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
                                  <span
                                    className="h-3 w-3 rounded-full border border-white/20"
                                    style={{
                                      backgroundColor: getColorStyle(item.selectedColor),
                                    }}
                                  />
                                  {item.selectedColor}
                                </span>
                              )}
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                              <div className="inline-flex items-center overflow-hidden rounded-xl border border-white/10 bg-black/20">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item._id,
                                      item.selectedSize,
                                      item.selectedColor,
                                      "decrease"
                                    )
                                  }
                                  className="px-2.5 py-2 text-white/75 transition hover:bg-white/[0.04] hover:text-white"
                                >
                                  <Minus size={13} />
                                </button>

                                <span className="min-w-[36px] text-center text-sm font-semibold text-white">
                                  {Math.max(1, Number(item.quantity) || 1)}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item._id,
                                      item.selectedSize,
                                      item.selectedColor,
                                      "increase"
                                    )
                                  }
                                  className="px-2.5 py-2 text-white/75 transition hover:bg-white/[0.04] hover:text-white"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-[11px] text-white/40">Line Total</p>
                                <p className="text-sm font-bold text-red-400">
                                  Rs. {(
                                    (Number(item.price) || 0) *
                                    (Math.max(1, Number(item.quantity) || 1))
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] px-5 py-12 text-center">
                    <ShoppingBag className="mx-auto h-10 w-10 text-white/25" />
                    <p className="mt-4 text-sm font-semibold text-white">
                      Your cart is empty
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/45">
                      Add some products to see your order summary here.
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 px-6 py-6">
                <div className="mb-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                    <p className="text-xs text-white/40">Variants</p>
                    <p className="mt-1 text-lg font-bold text-white">{cart.length}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                    <p className="text-xs text-white/40">Items</p>
                    <p className="mt-1 text-lg font-bold text-white">{totalItems}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center">
                    <p className="text-xs text-white/40">Tax</p>
                    <p className="mt-1 text-lg font-bold text-white">Rs. {taxes}</p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="font-semibold text-white">
                        Rs. {subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-white/60">
                      <span>Shipping</span>
                      <span className="font-semibold text-white">
                        Rs. {shipping.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-white/60">
                      <span>Tax</span>
                      <span className="font-semibold text-white">
                        Rs. {taxes.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-white/10 pt-4" />

                    <div className="flex items-center justify-between text-base font-bold text-white">
                      <span>Total</span>
                      <span className="text-2xl text-red-400">
                        Rs. {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <ShieldCheck className="h-4 w-4 text-red-400" />
                      Secure Checkout
                    </div>
                    <p className="mt-2 text-xs leading-6 text-white/45">
                      Protected with premium encryption and a safer payment flow.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Truck className="h-4 w-4 text-red-400" />
                      Local Persistence
                    </div>
                    <p className="mt-2 text-xs leading-6 text-white/45">
                      Cart and checkout data stay saved in local storage.
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-center text-xs text-white/35">
                  Your cart and checkout form are saved locally in the browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
