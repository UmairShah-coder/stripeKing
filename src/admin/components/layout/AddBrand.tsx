// src/admin/pages/AddBrand.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import axios from "axios";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

interface AddBrandProps {
  onBrandAdded: (brand: Brand) => void; // Parent component ko notify karne ke liye
}

const AddBrand: React.FC<AddBrandProps> = ({ onBrandAdded }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !imageFile) {
      alert("Brand name aur image required hain!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", imageFile);

      const { data } = await axios.post(
        "http://localhost:5000/api/brands",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(`Brand "${data.name}" add ho gaya!`);

      // Parent component ko notify kar ke table update
      onBrandAdded(data);

      // Reset form
      setName("");
      setImageFile(null);
      setPreview(null);

      // Optional: back to Brands page
      navigate("/admin-dashboard/brands");
    } catch (error: any) {
      console.error("Add Brand Error:", error);
      alert(error.response?.data?.message || "Brand add karne me error aaya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between mt-[-25px] items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Add New Brand</h2>
        <button
          onClick={() => navigate("/admin-dashboard/brands")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Brand Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter brand name"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Brand Image</label>
            <div
              className={`w-60 h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer ${
                preview ? "border-gray-300" : "border-gray-400 hover:border-red-500"
              }`}
              onClick={() => document.getElementById("brandImageInput")?.click()}
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
              id="brandImageInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-red-600 text-white hover:text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Add Brand"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;