import React from "react";

const About: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a0202] pt-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .section-title {
         background: linear-gradient(90deg, #ffffff 0%, #ffb3b3 35%, #ca0808 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;  
        }

        .about-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
        }

        .about-card:hover {
          border-color: rgba(220,38,38,0.35);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.42),
            0 10px 30px rgba(220,38,38,0.12);
        }

        .image-card {
          background: radial-gradient(circle at top, rgba(220,38,38,0.10), rgba(255,255,255,0.02), rgba(0,0,0,0.2));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Hero Section */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="about-card rounded-[30px] p-8 sm:p-10">
            <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
              Our Story
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
              About <span className="section-title">StripeKing</span>
            </h2>

            <p className="mt-5 text-white/65 leading-8 text-sm sm:text-base">
              Welcome to <span className="text-red-400 font-semibold">StripeKing</span>,
              the destination for stylish, comfortable, and high-quality
              footwear. We create shoes that not only complete your look, but
              also elevate your confidence with every step.
            </p>

            <p className="mt-4 text-white/65 leading-8 text-sm sm:text-base">
              From timeless classics to modern trends, our goal is to make
              premium footwear accessible to those who value design, comfort,
              and lasting quality. At StripeKing, every step reflects style,
              confidence, and excellence.
            </p>
          </div>

          <div className="image-card rounded-[30px] p-6 sm:p-8">
            <img
              src="/aaa.png"
              alt="About StripeKing"
              className="w-full rounded-[24px] object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="image-card rounded-[30px] p-6 sm:p-8 order-2 lg:order-1">
            <img
              src="/aa.png"
              alt="Our Mission"
              className="w-full rounded-[24px] object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          <div className="about-card rounded-[30px] p-8 sm:p-10 order-1 lg:order-2">
            <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
              Our Mission
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
              Our <span className="section-title">Mission</span>
            </h2>

            <p className="mt-5 text-white/65 leading-8 text-sm sm:text-base">
              To deliver footwear that blends modern style, lasting comfort, and
              premium durability. Every pair is designed with attention to
              detail, allowing our customers to step forward with confidence,
              elegance, and ease.
            </p>

            <p className="mt-4 text-white/65 leading-8 text-sm sm:text-base">
              We believe shoes should be more than just fashion. They should be
              a reflection of quality, identity, and performance in everyday
              life.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="about-card rounded-[30px] p-8 sm:p-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center rounded-full border border-red-500/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300">
              What We Stand For
            </span>

            <h2 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
              Our Core <span className="section-title">Values</span>
            </h2>

            <p className="mt-4 text-white/60 leading-8 text-sm sm:text-base">
              At StripeKing, our foundation is built on quality, innovation,
              customer trust, and timeless style.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold text-white">Premium Quality</h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                We use trusted materials and careful craftsmanship to ensure
                every pair meets premium standards.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold text-white">Modern Design</h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Our collections combine timeless elegance with modern trends for
                a refined and stylish finish.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-red-500/30 hover:bg-white/[0.06]">
              <h3 className="text-lg font-semibold text-white">Customer Trust</h3>
              <p className="mt-3 text-sm leading-7 text-white/55">
                We focus on comfort, reliability, and service that builds
                long-term trust with every customer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;