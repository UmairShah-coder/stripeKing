// src/admin/pages/EditTag.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const EditTag: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch single tag
  useEffect(() => {
    const fetchTag = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/tags/${id}`);
        setTagName(data.name);
      } catch (error) {
        alert("Tag not found!");
        navigate("/admin-dashboard/tags");
      }
    };

    if (id) fetchTag();
  }, [id, navigate]);

  // Update tag
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      alert("Tag name cannot be empty!");
      return;
    }

    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/tags/${id}`, { name: tagName });
      alert(`Tag "${tagName}" updated successfully!`);
      navigate("/admin-dashboard/tags");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update tag!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Edit Tag</h2>

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
          <button
            type="submit"
            disabled={loading}
            className={`bg-red-600 text-black hover:text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Tag"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTag;
