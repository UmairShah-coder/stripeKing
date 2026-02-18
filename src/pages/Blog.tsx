import React from "react";

const blogs = [
  {
    id: 1,
    title: "Top 5 Sneakers Trends in 2026",
    snippet: "Discover the latest trends in sneakers for this year and how to style them like a pro.",
    image: "/blog.png",
  },
  {
    id: 2,
    title: "How to Care for Your Leather Shoes",
    snippet: "Learn the best practices to keep your leather shoes looking brand new for years.",
    image: "/blo.png",
  },
  {
    id: 3,
    title: "Street Style Inspiration",
    snippet: "Get inspired by the hottest street style outfits paired with the most stylish sneakers.",
    image: "/bloo.png",
  },
 
];

const Blog: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-2  py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Hero */}
      <div className="mb-5 text-center ">
      <h2 className="text-3xl font-bold border-b-2 border-[#ca0808d4] w-fit pb-2">
        Sneaker <span className="golden-text">Blog</span>
      </h2>

     
      </div>

      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Featured Blog */}
        {blogs.length > 0 && (
          <div className="md:col-span-2 row-span-2 relative overflow-hidden rounded-2xl bg-black hover:shadow-[0_0_40px_#ca0808d4] transition-shadow duration-300">
            <img
              src={blogs[0].image}
              alt={blogs[0].title}
              className="w-full object-contain rounded-t-2xl"
            />
            <div className="p-6 flex flex-col justify-end">
              <h2 className="text-3xl font-bold text-white  transition-colors">
                {blogs[0].title}
              </h2>
              <p className="text-white/80 mt-2">{blogs[0].snippet}</p>
              <button className="mt-3 text-[#ca0808d4] hover:text-red-600 font-semibold transition-colors">
                Read More →
              </button>
            </div>
          </div>
        )}

        {/* Other Blogs */}
        {blogs.slice(1).map((blog) => (
          <div
            key={blog.id}
            className="relative overflow-hidden rounded-2xl bg-black hover:shadow-[0_0_40px_#ca0808d4] transition-shadow duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full object-contain rounded-t-2xl"
            />
            <div className="p-4 flex flex-col mt-24 justify-end">
              <h3 className="text-white font-bold text-lg transition-colors">
                {blog.title}
              </h3>
              <p className="text-white/70 text-sm mt-1">{blog.snippet}</p>
              <button className="mt-2 text-[#ca0808d4] hover:text-red-600 font-medium transition-colors">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
