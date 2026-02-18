// src/admin/pages/CategoryPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const mockCategories: Category[] = [
  { id: 1, name: "Sneakers", slug: "sneakers", image: "/icon.png" },
  { id: 2, name: "Formals", slug: "formals", image: "/blogg.png" },
  { id: 3, name: "Casual", slug: "casual", image: "/bloggg.png" },
];

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ca0808d4",
      cancelButtonColor: "#555",
    });

    if (result.isConfirmed) {
      setCategories(categories.filter((cat) => cat.id !== id));
      await MySwal.fire({
        title: "Deleted!",
        text: "Category has been deleted.",
        icon: "success",
        confirmButtonColor: "#ca0808d4",
        timerProgressBar: true,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            <span className="golden-text">
              Category
            </span>
          </h2>
          <p className="text-gray-500 mt-2">Manage all category.</p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard/products/add")}
          className="flex items-center gap-2 bg-red-600 text-black font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 hover:text-white transform transition"
        >
          <span className="text-lg font-bold">+</span> Add Category
        </button>
      </div>
        {/* Search */}
           <div className="mb-6">
                     <div className="relative w-96">
                       <FaSearch className="absolute top-3 left-3 text-gray-400" />
                       <input
                         type="text"
                         placeholder="Search products..."
                         value={search}
                         onChange={(e) => setSearch(e.target.value)}
                         className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                       />
                     </div>
                   </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-300">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 uppercase golden-text text-gray-800 text-center">
              <tr>
                <th className="px-4 py-3 text-sm border border-gray-300">Image</th>
                <th className="px-4 py-3 text-sm border border-gray-300">Name</th>
                <th className="px-4 py-3 text-sm border border-gray-300">Slug</th>
                <th className="px-4 py-3 text-sm border border-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, idx) => (
                  <tr
                    key={cat.id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition text-center`}
                  >
                    <td className="px-4 py-3 border border-gray-300 flex justify-center">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-20 h-full rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-3 border border-gray-300 font-medium">{cat.name}</td>
                    <td className="px-4 py-3 border border-gray-300 text-gray-500">{cat.slug}</td>
                    <td className="px-4 py-3 border border-gray-300">
                      <div className="flex justify-center items-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin-dashboard/category/edit/${cat.id}`)
                          }
                          className="text-gray-500 hover:text-gray-700"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="text-red-500 hover:text-red-600"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400 border border-gray-300">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
