import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

interface Size {
  _id: string;
  name: string;
}

const SizePage: React.FC = () => {
  const navigate = useNavigate();
  const [sizes, setSizes] = useState<Size[]>([]);
  const [search, setSearch] = useState("");

  const fetchSizes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/sizes");
      setSizes(data);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    fetchSizes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this size?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/sizes/${id}`);
      fetchSizes();
    } catch (error) {
      console.error("Error deleting size:", error);
    }
  };

  const filteredSizes = sizes.filter((size) =>
    size.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <style>{`* { font-family: 'Poppins', sans-serif; }`}</style>

      {/* Header */}
      <div className="flex flex-col mt-[-25px] sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 golden-text">
            Sizes
          </h2>
          <p className="text-gray-500">Manage all sizes in your store.</p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard/size/add")}
          className="flex items-center gap-2 bg-red-600 text-white font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 hover:text-white transform transition"
        >
          <span className="text-lg font-bold">+</span> Add Size
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-96">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search sizes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>
      </div>

      {/* Sizes Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-xl border-collapse shadow-sm">
          <thead className="bg-gray-100 uppercase text-gray-800 golden-text text-center">
            <tr>
              <th className="px-4 py-3 text-sm border border-gray-300">Size</th>
              <th className="px-4 py-3 text-sm border border-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSizes.length > 0 ? (
              filteredSizes.map((size, idx) => (
                <tr
                  key={size._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3 border border-gray-300 text-center font-medium">
                    {size.name}
                  </td>
                  <td className="px-4 py-4 border border-gray-200 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin-dashboard/size/edit/${size._id}`)}
                      className="text-gray-500 hover:text-gray-700 transition text-lg"
                      title="Edit Size"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(size._id)}
                      className="text-red-500 hover:text-red-700 transition text-lg"
                      title="Delete Size"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-6 text-gray-400 border border-gray-300">
                  No sizes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizePage;