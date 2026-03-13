import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";

const EditSize: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSize = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/sizes`);
        const size = data.find((s: any) => s._id === id);
        if (!size) throw new Error("Size not found");
        setName(size.name);
      } catch (err) {
        alert("Size not found");
        navigate("/admin-dashboard/sizes");
      }
    };
    if (id) fetchSize();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Size name is required!");
      return;
    }
    try {
      setLoading(true);
      await axios.put(`http://localhost:5000/api/sizes/${id}`, { name });
      alert("Size updated successfully!");
      navigate("/admin-dashboard/sizes");
    } catch (err) {
      console.error(err);
      alert("Failed to update size!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Edit Size</h2>
        <button
          onClick={() => navigate("/admin-dashboard/sizes")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Size Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter size name"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-red-600 text-black hover:text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Size"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSize;