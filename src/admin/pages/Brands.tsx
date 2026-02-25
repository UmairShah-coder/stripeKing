// src/admin/pages/Brands.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";
import AddBrand from "../components/layout/AddBrand";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

const Brands: React.FC = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [showAddBrand, setShowAddBrand] = useState(false);

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/brands");
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Delete brand
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/brands/${id}`);
      setBrands((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  // Add new brand in table immediately
  const handleBrandAdded = (brand: Brand) => {
    setBrands((prev) => [brand, ...prev]);
    setShowAddBrand(false);
  };

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col mt-[-25px] sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 golden-text">Brands</h2>
          <p className="text-gray-500">Manage all brands.</p>
        </div>

        <button
          onClick={() => setShowAddBrand(true)}
          className="flex items-center gap-2 bg-red-600 text-white font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 transition"
        >
          <span className="text-lg font-bold">+</span> Add Brand
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full sm:w-96">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>
      </div>

      {/* Add Brand Modal / Inline Form */}
      {showAddBrand && <AddBrand onBrandAdded={handleBrandAdded} />}

      {/* Brands Table */}
      <div className="overflow-x-auto bg-white shadow">
        <table className="min-w-full border border-gray-300 border-collapse">
          <thead className="bg-gray-100 uppercase golden-text text-center">
            <tr>
              <th className="px-4 py-3 text-sm border border-gray-300">Image</th>
              <th className="px-4 py-3 text-sm border border-gray-300">Name</th>
              <th className="px-4 py-3 text-sm border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand, idx) => (
                <tr
                  key={brand._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-5 border-b border-gray-200 flex justify-center">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 border border-gray-300 text-center font-medium">{brand.name}</td>
                  <td className="px-4 py-5 border-b border-gray-300 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin-dashboard/brands/edit/${brand._id}`)}
                      className="text-gray-500 hover:text-gray-700 pb-5 transition text-lg"
                      title="Edit Brand"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(brand._id)}
                      className="text-red-500 hover:text-red-700 pb-5 transition text-lg"
                      title="Delete Brand"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-400 border border-gray-300">
                  No brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Brands;