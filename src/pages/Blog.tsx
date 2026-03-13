import React from "react";
import { ArrowUpRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Sneakers Trends in 2026",
    snippet:
      "Discover the latest sneaker trends shaping 2026 and learn how to style them with confidence for a refined modern look.",
    image: "/shoess.png",
    category: "Trend Report",
    date: "Jan 12, 2026",
  },
  {
    id: 2,
    title: "How to Care for Your Leather Shoes",
    snippet:
      "Simple and effective care tips to keep your leather shoes polished, protected, and looking premium for years.",
    image: "/blo.png",
    category: "Care Guide",
    date: "Jan 08, 2026",
  },
  {
    id: 3,
    title: "Street Style Inspiration",
    snippet:
      "Explore outfit ideas and smart sneaker pairings inspired by modern streetwear and everyday luxury fashion.",
    image: "/bloo.png",
    category: "Style Edit",
    date: "Jan 03, 2026",
  },
];

const Blog: React.FC = () => {
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

        .blog-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(220,38,38,0.08));
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 40px rgba(0,0,0,0.30);
          backdrop-filter: blur(16px);
        }

        .blog-card:hover {
          border-color: rgba(220,38,38,0.35);
          box-shadow:
            0 24px 55px rgba(0,0,0,0.45),
            0 10px 30px rgba(220,38,38,0.12);
        }

        .image-wrap {
          background: radial-gradient(circle at top, rgba(220,38,38,0.14), rgba(255,255,255,0.02), rgba(0,0,0,0.25));
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
      <div className="soft-glow bottom-[-100px] right-[-40px] h-72 w-72 bg-red-500" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
          

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white leading-tight">
              Discover <span className="section-title">StripeKing Blog</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base leading-8 text-white/55">
              Explore premium footwear trends, styling inspiration, and care
              guides curated for those who appreciate modern fashion, quality,
              and timeless elegance.
            </p>
          </div>

         
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.45fr_0.85fr]">
          {/* Featured Article */}
          {blogs.length > 0 && (
            <article className="blog-card group overflow-hidden rounded-[32px] transition-all duration-500">
              <div className="image-wrap relative overflow-hidden">
                <div className="absolute inset-x-10 top-0 z-10 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />

                <img
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  className="h-[320px] sm:h-[800px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                <div className="absolute left-6 right-6 bottom-6 z-20 sm:left-8 sm:right-8 sm:bottom-8">
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/70">
                    <span className="rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-red-300">
                      {blogs[0].category}
                    </span>
                    <span>{blogs[0].date}</span>
                  </div>

                  <h3 className="mt-4 max-w-3xl text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-red-300">
                    {blogs[0].title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 lg:p-9">
                <p className="max-w-3xl text-sm sm:text-base leading-8 text-white/60">
                  {blogs[0].snippet}
                </p>

             
              </div>
            </article>
          )}

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {blogs.slice(1).map((blog) => (
              <article
                key={blog.id}
                className="blog-card group overflow-hidden rounded-[28px] transition-all duration-500"
              >
                <div className="image-wrap relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-white/45">
                    <span className="text-red-300">{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-red-400">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {blog.snippet}
                  </p>

                  <button className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-400 transition-colors duration-300 hover:text-red-300">
                    Read More
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;