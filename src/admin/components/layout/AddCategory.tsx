import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import axios from "axios";

const AddCategory: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().trim().replace(/\s+/g, "-"));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !file) {
      alert("Category name aur image required hain!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("image", file); // must match multer key

      const { data } = await axios.post(
        "http://localhost:5000/api/categories",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(`Category "${data.name}" added successfully!`);
      navigate("/admin-dashboard/category");
    } catch (err) {
      console.error(err);
      alert("Error adding category. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* HEADER */}
      <div className="flex justify-between items-center mt-[-25px]">
        <h2 className="text-3xl font-bold text-red-600">Add Category</h2>
        <button
          onClick={() => navigate("/admin-dashboard/category")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      {/* FORM */}
      <div className="max-w-4xl mx-auto bg-white mt-8 shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME + SLUG */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Category Name</label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Enter category name"
                disabled={loading}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="category-slug"
                disabled={loading}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category Image</label>
            <div
              className={`w-60 h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer ${
                preview ? "border-gray-300" : "border-gray-400 hover:border-red-500"
              }`}
              onClick={() => document.getElementById("categoryImageInput")?.click()}
            >
              {!preview ? (
                <div className="text-center text-gray-400">
                  <FiUpload className="mx-auto text-3xl mb-2" />
                  <p>Upload image</p>
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
                  >
                    <FiX className="text-red-600 text-xl" />
                  </button>
                </div>
              )}
            </div>
            <input
              type="file"
              id="categoryImageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={loading}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Add Category"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin-dashboard/category")}
              className="border px-8 py-3 rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;