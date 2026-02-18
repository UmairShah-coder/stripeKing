import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
      import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-gray-400 pt-16 mt-20 pb-8 px-6 border-t border-[#bca000]/20">
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand Info */}
        <div>

<div className="flex items-center gap-2">
  <Link to="/" className="flex items-center gap-2">
    <img
      src="/logggg.png"
      alt="Logo"
      className="w-[80px] h-auto object-contain"
    />
    <span className="golden-text font-bold text-2xl">StripeKing</span>
  </Link>
</div>


          <p className="text-sm leading-relaxed mt-4">
            Premium footwear for men who value style, comfort, and performance.
            Walk with confidence. Walk with StripeKing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
           {["Home", "Products", "About", "Blog", "Contact"].map((item) => {
  const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
  return (
    <li key={item}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `transition-colors duration-300 ${
            isActive ? "text-[#ca0808d4] font-semibold" : "hover:text-[#ca0808d4]"
          }`
        }
        end={item === "Home"}
      >
        {item}
      </NavLink>
    </li>
  );
})}

          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            {["Sneakers", "Running Shoes", "Formal Shoes", "Boots", "Sandals"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[#ca0808d4] transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect With Us</h3>

          <div className="flex gap-4 mb-4">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#ca0808d4] hover:text-black transition"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#ca0808d4] hover:text-black transition"
            >
              <FaInstagram size={14} />
            </a>

            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#ca0808d4] hover:text-black transition"
            >
              <FaTwitter size={14} />
            </a>
          </div>

          <p className="text-sm">support@stripeking.com</p>
          <p className="text-sm">+92 300 1234567</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} StripeKing. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
