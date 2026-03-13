import React, { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] px-6 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .section-title {
           background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;  
        }

        .contact-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
          backdrop-filter: blur(16px);
        }

        .contact-card:hover {
          border-color: rgba(220,38,38,0.28);
        }

        .input-field {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          transition: all 0.3s ease;
        }

        .input-field:focus {
          border-color: rgba(220,38,38,0.8);
          box-shadow: 0 0 0 4px rgba(220,38,38,0.08);
        }

        .soft-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.18;
          pointer-events: none;
        }
      `}</style>

      <div className="soft-glow top-[-80px] left-[-50px] h-64 w-64 bg-red-600" />
      <div className="soft-glow bottom-[-90px] right-[-40px] h-72 w-72 bg-red-500" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
        

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white leading-tight">
            Contact <span className="section-title">StripeKing</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-8 text-white/55">
            We’d love to hear from you. Whether you have a question about our
            products, need support with an order, or want to share feedback, our
            team is here to help.
          </p>
        </div>

        {/* Info cards */}
        <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div className="contact-card rounded-[24px] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_24px_rgba(220,38,38,0.28)]">
              <Mail size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Email Us</h3>
            <p className="mt-2 text-sm leading-7 text-white/55">
              support@stripeking.com
            </p>
          </div>

          <div className="contact-card rounded-[24px] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_24px_rgba(220,38,38,0.28)]">
              <Phone size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Call Us</h3>
            <p className="mt-2 text-sm leading-7 text-white/55">
              +92 300 1234567
            </p>
          </div>

          <div className="contact-card rounded-[24px] p-5 sm:col-span-2 xl:col-span-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_24px_rgba(220,38,38,0.28)]">
              <MapPin size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Visit Us</h3>
            <p className="mt-2 text-sm leading-7 text-white/55">
              Thokar Niaz Baig, Lahore, Pakistan
            </p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left - Form */}
          <div className="contact-card relative rounded-[32px] p-7 sm:p-9 lg:p-10">
            {submitted && (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/30 bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(220,38,38,0.30)]">
                Message Sent Successfully
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Send a <span className="section-title">Message</span>
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className="input-field w-full rounded-2xl px-4 py-3.5 text-white placeholder:text-white/35 outline-none"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  className="input-field w-full rounded-2xl px-4 py-3.5 text-white placeholder:text-white/35 outline-none"
                  required
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message *"
                rows={6}
                className="input-field w-full resize-none rounded-2xl px-4 py-4 text-white placeholder:text-white/35 outline-none"
                required
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(220,38,38,0.30)] transition-all duration-300 hover:bg-red-700 hover:scale-[1.01]"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>

          {/* Right - Map */}
          <div className="contact-card overflow-hidden rounded-[32px] p-3">
            <div className="h-full min-h-[520px] overflow-hidden rounded-[26px] border border-white/10">
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.920411257539!2d74.352514!3d31.502905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919051d2b4b8f1f%3A0x4e3b93f74f828f3c!2sThokar%20Niaz%20Baig%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1706960000000!5m2!1sen!2s"
                className="h-full min-h-[520px] w-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;