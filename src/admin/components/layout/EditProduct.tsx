// src/admin/components/layout/EditProduct.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

interface ProductForm {
  name: string;
  slug: string;
  price: number;
  category: string;
  brand: string;
  size: string;
  tag: string;
  color: string;
  description: string;
  mainImage: File | null;
  galleryImages: File[];
}

const categories = ["Sneakers", "Formals", "Casual", "Boots"];
const brands = ["Nike", "Adidas", "Puma", "Reebok"];
const sizes = ["38", "39", "40", "41", "42", "43", "44"];
const tags = ["New", "Sale", "Popular", "Limited"];
const colors = ["White", "Black", "Red", "Blue", "Brown", "Yellow"];

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // product id from route

  const [form, setForm] = useState<ProductForm>({
    name: "",
    slug: "",
    price: 0,
    category: "",
    brand: "",
    size: "",
    tag: "",
    color: "White",
    description: "",
    mainImage: null,
    galleryImages: [],
  });

  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Load existing product data (mock for now)
  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProduct = async () => {
      // Example fetched product
      const existingProduct = {
        name: "Nike Air Max",
        slug: "nike-air-max",
        price: 12000,
        category: "Sneakers",
        brand: "Nike",
        size: "42",
        tag: "Popular",
        color: "Red",
        description: "Comfortable and stylish sneakers",
        mainImageUrl: "https://via.placeholder.com/200",
        galleryUrls: [
          "https://via.placeholder.com/100",
          "https://via.placeholder.com/101",
        ],
      };

      setForm((prev) => ({
        ...prev,
        name: existingProduct.name,
        slug: existingProduct.slug,
        price: existingProduct.price,
        category: existingProduct.category,
        brand: existingProduct.brand,
        size: existingProduct.size,
        tag: existingProduct.tag,
        color: existingProduct.color,
        description: existingProduct.description,
      }));
      setMainPreview(existingProduct.mainImageUrl);
      setGalleryPreviews(existingProduct.galleryUrls);
    };

    fetchProduct();
  }, [id]);

  // Auto-generate slug on name change
  useEffect(() => {
    const slug = form.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    setForm((prev) => ({ ...prev, slug }));
  }, [form.name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({ ...prev, mainImage: e.target.files![0] }));
      setMainPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeMainImage = () => {
    setForm((prev) => ({ ...prev, mainImage: null }));
    setMainPreview(null);
  };

const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const remainingSlots = 4 - form.galleryImages.length;
  if (remainingSlots <= 0) return; // already 4 images, no new upload

  const files = Array.from(e.target.files).slice(0, remainingSlots);

  setForm((prev) => ({
    ...prev,
    galleryImages: [...prev.galleryImages, ...files],
  }));

  setGalleryPreviews((prev) => [
    ...prev,
    ...files.map((f) => URL.createObjectURL(f)),
  ]);

  // Clear the input so user can re-upload same file if removed
  e.target.value = "";
};

const removeGalleryImage = (index: number) => {
  setForm((prev) => ({
    ...prev,
    galleryImages: prev.galleryImages.filter((_, i) => i !== index),
  }));

  setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Product Data:", form);
    alert("Product updated! Check console.");
    // TODO: Call API to update product using `id`
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-5xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold golden-text">Edit Product</h2>
        <button
          onClick={() => navigate("/admin-dashboard/products")}
          className="flex items-center justify-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium rounded-full py-2 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* First row: Name | Slug | Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border outline-none border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              readOnly
              className="w-full border outline-none border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border outline-none border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
        </div>

        {/* Second row: Category | Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Brand</label>
            <select
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Third row: Size | Tag | Color */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Size</label>
            <select
              name="size"
              value={form.size}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Size</option>
              {sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tag</label>
            <select
              name="tag"
              value={form.tag}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select Tag</option>
              {tags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Color</label>
            <select
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
            >
              {colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border outline-none border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Images: Left Main | Right Gallery */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Image Left */}
          <div className="flex-shrink-0">
            <label className="block text-gray-700 font-medium mb-1">Main Image</label>
            <div
              className="border border-dashed border-gray-400 rounded-lg w-48 h-48 flex items-center justify-center cursor-pointer hover:border-yellow-500 relative"
              onClick={() => document.getElementById("mainImageInput")?.click()}
            >
              {mainPreview ? (
                <>
                  <img src={mainPreview} alt="Main" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeMainImage(); }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </>
              ) : (
                <span className="text-gray-400 text-center">
                  <span className="text-3xl block">↑</span> Upload Image
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                id="mainImageInput"
                className="hidden"
                onChange={handleMainImage}
              />
            </div>
          </div>

          {/* Gallery Images Right */}
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-1">Gallery Images (Max 4)</label>
            <div className="flex gap-4 overflow-x-auto py-2">
              {galleryPreviews.map((src, idx) => (
                <div key={idx} className="w-24 h-24 border rounded-lg overflow-hidden relative flex-shrink-0">
                  <img src={src} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              {form.galleryImages.length < 4 && (
                <div
                  className="w-24 h-24 border border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:border-yellow-500 flex-shrink-0"
                  onClick={() => document.getElementById("galleryInput")?.click()}
                >
                  <span className="text-2xl font-bold">+</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                id="galleryInput"
                multiple
                className="hidden"
                onChange={handleGalleryImages}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-yellow-500 w-[150px] text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 hover:text-white transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
