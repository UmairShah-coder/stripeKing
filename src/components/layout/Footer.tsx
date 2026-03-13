import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] pt-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .brand-text {
        background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;  
        }

        .footer-glass {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.07));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.03);
          backdrop-filter: blur(14px);
        }

        .footer-link {
          color: rgba(255,255,255,0.62);
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: #f87171;
          transform: translateX(4px);
        }

        .ambient-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.16;
          pointer-events: none;
        }
      `}</style>

      {/* Background glow */}
      <div className="ambient-orb top-[-80px] left-[-60px] h-64 w-64 bg-red-700/30" />
      <div className="ambient-orb bottom-[-90px] right-[-60px] h-72 w-72 bg-red-500/20" />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top CTA */}
       
        {/* Main Footer */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logggg.png"
                alt="Logo"
                className="w-[72px] h-auto object-contain"
              />
              <div>
                <span className="brand-text text-2xl font-extrabold">
                  StripeKing
                </span>
              
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-8 text-white/55">
              Premium footwear for men who value style, comfort, and
              performance. Every pair is designed to bring confidence to every
              step.
            </p>

            <div className="mt-6 space-y-3 text-sm text-white/55">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-red-400" />
                <span>support@stripeking.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-red-400" />
                <span>+92 300 1234567</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-red-400" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["Home", "Products", "About", "Blog", "Contact"].map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;

                return (
                  <li key={item}>
                    <NavLink
                      to={path}
                      end={item === "Home"}
                      className={({ isActive }) =>
                        isActive
                          ? "text-red-400 font-semibold"
                          : "footer-link inline-block"
                      }
                    >
                      {item}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-white">Collections</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                "Sneakers",
                "Running Shoes",
                "Formal Shoes",
                "Boots",
                "Sandals",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="footer-link inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/55">
              Stay updated with our latest drops, style inspiration, and
              exclusive offers across our social platforms.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                <FaTwitter size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} StripeKing. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-white/40">
            <a href="#" className="transition-colors hover:text-red-400">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-red-400">
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-red-400">
              Shipping Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;