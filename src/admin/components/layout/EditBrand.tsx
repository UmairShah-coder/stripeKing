import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiX } from "react-icons/fi";
import axios from "axios";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

const EditBrand: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch existing brand
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const { data } = await axios.get<Brand>(
          `http://localhost:5000/api/brands/${id}`
        );
        setName(data.name);
        setPreview(data.image); // Cloudinary URL
      } catch (err) {
        alert("Brand not found!");
        navigate("/admin-dashboard/brands");
      }
    };

    if (id) fetchBrand();
  }, [id, navigate]);

  // ✅ Image Change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Remove Image
  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImageFile(null);
    setPreview(null);
  };

  // ✅ Update Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Brand name is required!");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);

      // Only send image if new one selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(
        `http://localhost:5000/api/brands/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Brand updated successfully!");
      navigate("/admin-dashboard/brands");
    } catch (err) {
      console.error(err);
      alert("Error updating brand");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Edit Brand</h2>
        <button
          onClick={() => navigate("/admin-dashboard/brands")}
          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Brand Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Brand Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="Enter brand name"
            />
          </div>

          {/* Brand Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Brand Image
            </label>

            <div
              className={`w-60 h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer ${
                preview
                  ? "border-gray-300"
                  : "border-gray-400 hover:border-red-500"
              }`}
              onClick={() =>
                document.getElementById("brandImageInput")?.click()
              }
            >
              {!preview ? (
                <div className="text-center text-gray-400">
                  <FiUpload className="mx-auto text-3xl mb-2" />
                  <p>Upload image</p>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-22 object-cover rounded-xl"
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
              className="hidden"
              onChange={handleImageChange}
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
            {loading ? "Updating..." : "Update Brand"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
