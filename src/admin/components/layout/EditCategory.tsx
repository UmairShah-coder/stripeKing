import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import {FiArrowLeft} from "react-icons/fi"
interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const mockCategories: Category[] = [
  { id: 1, name: "Sneakers", slug: "sneakers", image: "/icon.png" },
  { id: 2, name: "Formals", slug: "formals", image: "/blogg.png" },
  { id: 3, name: "Casual", slug: "casual", image: "/bloggg.png" },
];

const EditCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const category = mockCategories.find(
      (c) => c.id === Number(id)
    );

    if (!category) {
      navigate("/admin-dashboard/category");
      return;
    }

    setName(category.name);
    setSlug(category.slug);
    setPreview(category.image);
  }, [id, navigate]);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(
      val
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
    );
  };

  const handleImageSelect = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPreview(null);
    setFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedCategory = {
      id,
      name,
      slug,
      image: file,
    };

    console.log(updatedCategory);
    alert("Category updated!");
    navigate("/admin-dashboard/category");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold golden-text mb-6">
        Edit Category
      </h2>
    <button
      onClick={() => navigate("/admin-dashboard/category")}
      className="flex items-center justify-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium rounded-full py-2 transition-colors"
    >
      <FiArrowLeft className="w-5 h-5" />
      Back
    </button>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NAME + SLUG (ONE LINE) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD (BG STYLE) */}
        <div>
          <label className="text-sm font-medium block mb-2">
            Category Image
          </label>

          <div className="bg-gray-50 hover:border-yellow-500 border-2 border-dashed border-gray-300 rounded-xl p-6 w-64">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* CROSS BUTTON */}
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center h-40 text-gray-400">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden "
                  onChange={(e) =>
                    e.target.files &&
                    handleImageSelect(e.target.files[0])
                  }
                />
                   <span className="text-gray-400 text-center">
                  <span className="text-3xl block">↑</span> Upload Image
                </span>
              </label>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-2 hover:text-white transition-all rounded-lg font-semibold hover:bg-yellow-600"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin-dashboard/category")}
            className="border px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
