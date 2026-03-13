// src/admin/pages/AddSize.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const AddSize: React.FC = () => {
  const navigate = useNavigate();
  const [sizesInput, setSizesInput] = useState(""); // user input
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sizesInput.trim()) {
      alert("Please enter at least one size!");
      return;
    }

    // Split input by comma or space and remove empty strings
    const sizesArray = sizesInput
      .split(/[, ]+/)
      .map((s) => s.trim())
      .filter((s) => s !== "");

    if (sizesArray.length === 0) {
      alert("No valid sizes found!");
      return;
    }

    try {
      setLoading(true);
      // Send array of sizes to backend
      await axios.post("http://localhost:5000/api/sizes", { sizes: sizesArray });
      alert(`Sizes added successfully: ${sizesArray.join(", ")}`);
      setSizesInput(""); // clear input
      navigate("/admin-dashboard/sizes");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add sizes!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold mt-[-25px] text-red-600">Add New Sizes</h2>
        <button
          onClick={() => navigate("/admin-dashboard/sizes")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sizes Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Sizes 
            </label>
            <input
              type="text"
              value={sizesInput}
              onChange={(e) => setSizesInput(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Example: 42, 43, 44, 45"
              required
              disabled={loading}
            />
            <p className="text-gray-500 text-sm mt-1">
              Enter multiple sizes separated by comma or space.
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
              {loading ? "Saving..." : "Add Sizes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/sizes")}
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

export default AddSize;