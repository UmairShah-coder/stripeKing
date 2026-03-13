import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      setCategories(data);
    } catch (err) {
      console.error(err);
      MySwal.fire({ title: "Error", text: "Unable to fetch categories", icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
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
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        setCategories((prev) => prev.filter((cat) => cat._id !== id));
        await MySwal.fire({
          title: "Deleted!",
          text: "Category has been deleted.",
          icon: "success",
          confirmButtonColor: "#ca0808d4",
        });
      } catch (err) {
        console.error(err);
        MySwal.fire({ title: "Error", text: "Failed to delete category", icon: "error" });
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              <span className="golden-text">Category</span>
            </h2>
            <p className="text-gray-500">Manage all categories.</p>
          </div>
          <button
            onClick={() => navigate("/admin-dashboard/category/add")}
            className="flex items-center gap-2 bg-red-600 text-white font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 transition"
          >
            <span className="text-lg font-bold">+</span> Add Category
          </button>
        </div>

        <div className="mb-6">
          <div className="relative w-96">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-300">
          {loading ? (
            <p className="text-center py-6 text-gray-500">Loading categories...</p>
          ) : (
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
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-400 border border-gray-300">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat, idx) => (
                    <tr
                      key={cat._id}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition text-center`}
                    >
                      <td className="px-4 py-3 border border-gray-300 flex justify-center">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-40 h-20 rounded-lg object-cover shadow-sm"
                        />
                      </td>
                      <td className="px-4 py-3 border border-gray-300 font-medium">{cat.name}</td>
                      <td className="px-4 py-3 border border-gray-300 text-gray-500">{cat.slug}</td>
                      <td className="px-4 py-3 border border-gray-300">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={() => navigate(`/admin-dashboard/category/edit/${cat._id}`)}
                            className="text-gray-500 hover:text-gray-700"
                            title="Edit"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="text-red-500 hover:text-red-600"
                            title="Delete"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;