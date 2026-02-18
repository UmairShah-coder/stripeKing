// src/admin/pages/AddTag.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const AddTag: React.FC = () => {
  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      alert("Tag name cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/tags", { name: tagName });
      alert(`Tag "${tagName}" added successfully!`);
      setTagName("");
      navigate("/admin-dashboard/tags");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add tag!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Add New Tag</h2>

        <button
          onClick={() => navigate("/admin-dashboard/tags")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tag Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tag Name
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter tag name"
              required
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-0">
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-600 text-black hover:text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Add Tag"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTag;
