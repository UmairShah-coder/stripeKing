import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  ArrowRight,
  CheckCircle2,
  Crown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import PageLoader from "../components/layout/PageLoader";

const MySwal = withReactContent(Swal);

type RegisterResponse = {
  success: boolean;
  message: string;
};

const API_BASE = "http://localhost:5000/api/auth";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showAlert = async (
    title: string,
    text: string,
    icon: "success" | "error" | "warning"
  ) => {
    await MySwal.fire({
      title,
      text,
      icon,
      confirmButtonColor: "#991b1b",
      background: "#09090b",
      color: "#ffffff",
      customClass: {
        popup: "rounded-[28px] border border-white/10 shadow-2xl",
        confirmButton:
          "rounded-xl px-5 py-3 font-medium tracking-wide focus:outline-none",
      },
    });
  };

  const request = async <T,>(url: string, options: RequestInit): Promise<T> => {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.message || "Request failed");
    }

    return data as T;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      await showAlert(
        "Missing fields",
        "Please fill all required fields.",
        "warning"
      );
      return;
    }

    if (password !== confirmPassword) {
      await showAlert(
        "Passwords do not match",
        "Please make sure both passwords are the same.",
        "error"
      );
      return;
    }

    if (password.length < 6) {
      await showAlert(
        "Weak password",
        "Password must be at least 6 characters long.",
        "warning"
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await request<RegisterResponse>(`${API_BASE}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      await showAlert(
        `Account Created For ${name.trim()}!`,
        "Your account has been created successfully. Please login to continue.",
        "success"
      );

      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      await showAlert(
        "Registration failed",
        error instanceof Error ? error.message : "Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <PageLoader isLoading={isSubmitting} />

      {/* Background */}
      <img
        src="/neww.jpg"
        alt="Register background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.20),transparent_28%),linear-gradient(120deg,rgba(0,0,0,0.88),rgba(0,0,0,0.55),rgba(0,0,0,0.84))]" />
      <div className="absolute inset-0 backdrop-[blur(1px)]" />

      {/* Ambient glow */}
      <div className="absolute left-[-120px] top-[-90px] h-[350px] w-[350px] rounded-full bg-red-700/20 blur-[140px]" />
      <div className="absolute right-[-100px] top-[18%] h-[280px] w-[280px] rounded-full bg-white/10 blur-[130px]" />
      <div className="absolute bottom-[-120px] right-[10%] h-[320px] w-[320px] rounded-full bg-red-500/10 blur-[160px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] xl:gap-16">
          {/* Left panel */}
          <div className="hidden min-h-[760px] flex-col justify-between lg:flex">
            <div>
              <img
                src="/logggg.png"
                alt="Brand logo"
                className="mt-5 w-40 object-contain"
              />

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/80 backdrop-blur-xl">
                <Sparkles size={13} className="text-red-500" />
                Premium member registration
              </div>
   <h1 className="mt-7 max-w-2xl text-lg font-semibold leading-[0.95] tracking-[-0.04em] text-white xl:text-[40px]">
              Start Your
                <span className="mt-3 block bg-gradient-to-r from-white via-red-400 to-red-500 bg-clip-text text-transparent">
               Exclusive Member Access
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/65 xl:text-base">
                Join now to save favorites, track orders, unlock premium
                experiences, and enjoy a refined ecommerce journey built for
                modern brands.
              </p>

              <div className="mt-5 mb-10 flex flex-wrap gap-3">
                <div className="rounded-full border border-red-400 bg-white/[0.06] px-4 py-2 text-xs text-white/70 backdrop-blur-xl">
                  Fast registration
                </div>
                <div className="rounded-full border border-red-400 bg-white/[0.06] px-4 py-2 text-xs text-white/70 backdrop-blur-xl">
                  Secure account setup
                </div>
                <div className="rounded-full border border-red-400 bg-white/[0.06] px-4 py-2 text-xs text-white/70 backdrop-blur-xl">
                  Elegant premium UI
                </div>
              </div>
            </div>

            <div className="grid max-w-3xl grid-cols-3 gap-4">
              <div className="group mb-32 rounded-[30px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                  <ShieldCheck size={18} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Security
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  Protected Setup
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Secure signup flow designed to build trust from the first step.
                </p>
              </div>

              <div className="group mb-[125px] rounded-[30px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                  <Crown size={18} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Premium
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  Luxury Journey
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  A visually refined onboarding experience for premium users.
                </p>
              </div>

              <div className="group mb-[125px] rounded-[30px] border border-white/12 bg-white/[0.06] p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                  <CheckCircle2 size={18} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                  Access
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  Quick Onboarding
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/55">
                  Create your account in moments and start exploring instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px]">
              <div className="absolute -inset-[1px] rounded-[34px] bg-[linear-gradient(135deg,rgba(255,255,255,0.20),rgba(255,255,255,0.05),rgba(220,38,38,0.14),rgba(251,191,36,0.08))] opacity-90" />
              <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-red-700/20 blur-3xl" />
              <div className="absolute -right-8 top-0 h-32 w-32 rounded-full bg-amber-300/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.06] p-[1px] shadow-[0_30px_100px_rgba(0,0,0,0.72)]">
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03),rgba(127,29,29,0.14),rgba(251,191,36,0.06))]" />

                <div className="relative rounded-[33px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.78),rgba(5,5,5,0.88))] p-5 backdrop-blur-3xl sm:p-6">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-600/15 blur-3xl" />
                  <div className="absolute -left-8 bottom-6 h-24 w-24 rounded-full bg-white/5 blur-3xl" />

                  <div className="relative z-10">
                    {/* Mobile logo */}
                    <div className="mb-6 text-center lg:hidden">
                      <div className="mx-auto mb-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-xl">
                        <img
                          src="/logggg.png"
                          alt="Logo"
                          className="w-24 object-contain"
                        />
                      </div>

                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                        Premium member registration
                      </p>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-red-500/20 bg-gradient-to-br from-red-500/15 via-red-500/10 to-amber-300/10 text-red-300 shadow-[0_14px_28px_rgba(185,28,28,0.22)] backdrop-blur-xl">
                          <User size={20} />
                        </div>

                        <div>
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                            Create account
                          </p>
                          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/10 bg-amber-300/[0.06] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-amber-200/70">
                            Join now
                          </div>
                        </div>
                      </div>

                      <h2 className="text-[30px] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[25px]">
                        Get started
                      </h2>

                      <p className="mt-2 max-w-sm text-[12px] leading-5 text-white/60">
                        Create your account and begin your premium shopping
                        experience.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-3.5">
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90"
                        >
                          Full Name
                        </label>

                        <div className="group relative">
                          <User
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white transition duration-300 group-focus-within:text-red-300"
                          />
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            required
                            className="h-[54px] w-full rounded-[18px] border border-white/12 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/30 focus:border-red-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(185,28,28,0.10)]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90"
                        >
                          Email Address
                        </label>

                        <div className="group relative">
                          <Mail
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white transition duration-300 group-focus-within:text-red-300"
                          />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                            className="h-[54px] w-full rounded-[18px] border border-white/12 bg-white/[0.04] pl-11 pr-4 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/30 focus:border-red-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(185,28,28,0.10)]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90"
                        >
                          Password
                        </label>

                        <div className="group relative">
                          <Lock
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white transition duration-300 group-focus-within:text-red-300"
                          />
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                            className="h-[54px] w-full rounded-[18px] border border-white/12 bg-white/[0.04] pl-11 pr-14 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/30 focus:border-red-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(185,28,28,0.10)]"
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition duration-300 hover:text-white"
                          >
                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90"
                        >
                          Confirm Password
                        </label>

                        <div className="group relative">
                          <Lock
                            size={16}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white transition duration-300 group-focus-within:text-red-300"
                          />
                          <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            required
                            className="h-[54px] w-full rounded-[18px] border border-white/12 bg-white/[0.04] pl-11 pr-14 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/30 focus:border-red-400/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(185,28,28,0.10)]"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirm password"
                                : "Show confirm password"
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/45 transition duration-300 hover:text-white"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={17} />
                            ) : (
                              <Eye size={17} />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative mt-1 flex h-[56px] w-full items-center justify-center gap-2 overflow-hidden rounded-[18px] border border-red-500/20 bg-[linear-gradient(135deg,#7f1d1d_0%,#b91c1c_45%,#dc2626_75%,#f59e0b_140%)] text-sm font-semibold text-white shadow-[0_20px_40px_rgba(185,28,28,0.34)] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_24px_50px_rgba(185,28,28,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,10),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
                        <span className="relative z-10 flex items-center gap-2">
                          {isSubmitting ? "Creating Account..." : "Create Account"}
                          {!isSubmitting && (
                            <ArrowRight
                              size={15}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          )}
                        </span>
                      </button>
                    </form>

                    {/* Trust strip */}
                    <div className="mt-5 rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] px-4 py-3 backdrop-blur-xl">
                      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] text-white/50 sm:justify-between">
                        <span>Secure signup</span>
                        <span className="hidden h-1.5 w-1.5 rounded-full bg-amber-200/40 sm:block" />
                        <span>Premium access</span>
                        <span className="hidden h-1.5 w-1.5 rounded-full bg-amber-200/40 sm:block" />
                        <span>Fast onboarding</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-2 border-t border-white/10 pt-4 text-center">
                      <p className="text-[11px] text-white">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="font-semibold text-red-300 transition duration-300 hover:text-red-200 hover:underline"
                        >
                          Login
                        </Link>
                      </p>
                    </div>

                    {/* Mobile note */}
                    <div className="mt-5 text-center lg:hidden">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                        Premium shopping starts here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end right */}
        </div>
      </div>
    </section>
  );
};

export default Register;