// src/admin/components/layout/AddProduct.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Variant {
  size: string;
  color: string;
}

interface ProductForm {
  name: string;
  slug: string;
  price: number;
  category: string;
  brand: string;
  tag: string;
  description: string;
  variants: Variant[];
}

const categories = ["Sneakers", "Formals", "Casual", "Boots"];
const brands = ["Nike", "Adidas", "Puma", "Reebok"];
const tags = ["New", "Sale", "Popular", "Limited"];

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    slug: "",
    price: 0,
    category: "",
    brand: "",
    tag: "",
    description: "",
    variants: [{ size: "", color: "" }],
  });

  // Auto slug
  useEffect(() => {
    const slug = form.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    setForm((prev) => ({ ...prev, slug }));
  }, [form.name]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Variant handlers
  const handleVariantChange = (
    index: number,
    field: "size" | "color",
    value: string
  ) => {
    const updated = [...form.variants];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "" }],
    }));
  };

  const removeVariant = (index: number) => {
    const updated = form.variants.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, variants: updated }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Professional Product Data:", form);
    alert("Product Submitted Successfully!");
  };

  return (
    <div className="min-h-screen  p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-red-600">
            Add New Product
          </h2>

          <button
            onClick={() => navigate("/admin-dashboard/products")}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <FiArrowLeft /> Back
          </button>
        </div>

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        {/* Header */}
      
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />

            <input
              type="text"
              name="slug"
              placeholder="Slug"

              value={form.slug}
              readOnly
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none bg-gray-100"
            />

            <input
              type="number"
              name="price"
              placeholder="Base Price"
              value={form.price}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          {/* Category + Brand */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <select
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
              required
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            <select
              name="tag"
              value={form.tag}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Select Tag</option>
              {tags.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Variants Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Product Variants
              </h3>

              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 bg-red-600 text-black hover:text-white font-semibold px-4 py-2 rounded-xl hover:bg-red-700 transition"
              >
                <FiPlus /> Add Variant
              </button>
            </div>

            <div className="space-y-4">
              {form.variants.map((variant, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-gray-50 p-4 rounded-xl border"
                >
                  <input
                    type="text"
                    placeholder="Size (e.g. 40)"
                    value={variant.size}
                    onChange={(e) =>
                      handleVariantChange(index, "size", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Color (e.g. Red)"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(index, "color", e.target.value)
                    }
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                  />

                  {form.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="flex items-center justify-center gap-2 bg-red-600 text-black hover:text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      <FiTrash2 /> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
          />

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-red-600 text-black hover:text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md"
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
