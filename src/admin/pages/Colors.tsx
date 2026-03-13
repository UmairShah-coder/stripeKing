// src/admin/pages/ColorPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

interface Color {
  _id: string;
  name: string;
}

const ColorPage: React.FC = () => {
  const navigate = useNavigate();
  const [colors, setColors] = useState<Color[]>([]);
  const [search, setSearch] = useState("");

  const fetchColors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/colors");
      setColors(data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this color?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/colors/${id}`);
      fetchColors();
    } catch (error) {
      console.error("Error deleting color:", error);
    }
  };

  const filteredColors = colors.filter((color) =>
    color.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <style>{`* { font-family: 'Poppins', sans-serif; }`}</style>

      {/* Header */}
      <div className="flex flex-col mt-[-25px] sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 golden-text">
            Colors
          </h2>
          <p className="text-gray-500">Manage all colors in your store.</p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard/color/add")}
          className="flex items-center gap-2 bg-red-600 text-white font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 hover:text-white transform transition"
        >
          <span className="text-lg font-bold">+</span> Add Color
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-96">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search colors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>
      </div>

      {/* Colors Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-xl border-collapse shadow-sm">
          <thead className="bg-gray-100 uppercase text-gray-800 golden-text text-center">
            <tr>
              <th className="px-4 py-3 text-sm border border-gray-300">Color</th>
              <th className="px-4 py-3 text-sm border border-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredColors.length > 0 ? (
              filteredColors.map((color, idx) => (
                <tr
                  key={color._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 border border-gray-300 text-center font-medium">
                    {color.name}
                  </td>
                  <td className="px-4 py-4 border border-gray-200 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin-dashboard/color/edit/${color._id}`)}
                      className="text-gray-500 hover:text-gray-700 transition text-lg"
                      title="Edit Color"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(color._id)}
                      className="text-red-500 hover:text-red-700 transition text-lg"
                      title="Delete Color"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-400 border border-gray-300">
                  No colors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ColorPage;