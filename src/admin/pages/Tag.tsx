// src/admin/pages/TagPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

interface Tag {
  _id: string;
  name: string;
}

const TagPage: React.FC = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [search, setSearch] = useState("");

  const fetchTags = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tags");
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this tag?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tags/${id}`);
      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <style>{`* { font-family: 'Poppins', sans-serif; }`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 golden-text">
            Tags
          </h2>
          <p className="text-gray-500 mt-2">Manage all tags in your store.</p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard/tag/add")}
          className="flex items-center gap-2 bg-red-600 text-black font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 hover:text-white transform transition"
        >
          <span className="text-lg font-bold">+</span> Add Tag
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-96">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>
      </div>

      {/* Tags Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-xl border-collapse shadow-sm">
          <thead className="bg-gray-100 uppercase text-gray-800 golden-text text-center">
            <tr>
              <th className="px-4 py-3 text-sm border border-gray-300">Name</th>
              <th className="px-4 py-3 text-sm border border-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag, idx) => (
                <tr
                  key={tag._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 border border-gray-300 text-center font-medium">
                    {tag.name}
                  </td>
                  <td className="px-4 py-4 border border-gray-200 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin-dashboard/tag/edit/${tag._id}`)}
                      className="text-gray-500 hover:text-gray-700 transition text-lg"
                      title="Edit Tag"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(tag._id)}
                      className="text-red-500 hover:text-red-700 transition text-lg"
                      title="Delete Tag"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-400 border border-gray-300">
                  No tags found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TagPage;
