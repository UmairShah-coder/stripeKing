// src/admin/pages/AddColor.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const AddColor: React.FC = () => {
  const navigate = useNavigate();
  const [colorName, setColorName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorName.trim()) {
      alert("Color name cannot be empty!");
      return;
    }

    // Split input by comma or space, trim, remove empty
    const colors = colorName
      .split(/[\s,]+/)
      .map(c => c.trim())
      .filter(c => c.length > 0);

    try {
      setLoading(true);

      // Send each color individually to backend
      await Promise.all(
        colors.map(c => axios.post("http://localhost:5000/api/colors", { name: c }))
      );

      alert(`Colors "${colors.join(", ")}" added successfully!`);
      setColorName("");
      navigate("/admin-dashboard/colors");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add color!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold mt-[-25px] text-red-600">Add New Color</h2>

        <button
          onClick={() => navigate("/admin-dashboard/colors")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Color Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Color Name
            </label>
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter color names separated by comma or space"
              required
              disabled={loading}
            />
            <p className="text-gray-500 text-sm mt-1">
              Example: Red, Blue, Green or Red Blue Green
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-0">
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-600 text-white hover:text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Add Color"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/colors")}
              className="border ml-2 px-8 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;