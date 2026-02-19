import React, { useState } from "react";

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
    <section className="w-full px-6 py-10 bg-[#f5f5f5]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <h2 className="text-3xl text-black font-bold mb-4 border-b-2 border-[#ca0808d4] w-fit pb-2">
        Contact <span className="golden-text">StripeKing</span>
      </h2>

      {/* New Paragraph */}
      <p className="text-gray-700 max-w-2xl mb-12">
        We'd love to hear from you! Whether you have a question about our products,
        need help with an order, or just want to give feedback, our team is here
        to help. Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* LEFT — CONTACT FORM */}
        <div className="relative bg-black text-white p-10 rounded-3xl shadow-2xl">
          {submitted && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#ca0808d4] text-black px-6 py-2 rounded-full font-semibold animate-pulse">
              Message Sent!
            </div>
          )}

          <h3 className="text-3xl font-bold golden-text mb-6 text-center">
            Send a Message
          </h3>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name *"
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-[#ca0808d4] transition"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email *"
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-[#ca0808d4] transition"
              required
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message *"
              rows={5}
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 outline-none focus:border-[#ca0808d4] transition resize-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white py-3 rounded-xl font-semibold  hover:bg-red-700 hover:text-white transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* RIGHT — MAP */}
        <div className="rounded-3xl overflow-hidden min-h-[500px]">
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.920411257539!2d74.352514!3d31.502905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919051d2b4b8f1f%3A0x4e3b93f74f828f3c!2sThokar%20Niaz%20Baig%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1706960000000!5m2!1sen!2s"
            className="w-full h-full min-h-[500px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
