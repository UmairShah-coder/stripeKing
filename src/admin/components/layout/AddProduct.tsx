// src/admin/components/layout/AddProduct.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiUpload, FiTrash2 } from "react-icons/fi";
import axios from "axios";

interface Variant { size: string; colors: string[]; stock: number; }
interface ProductForm {
  name: string;
  slug: string;
  price: number | "";
  category: string;
  brand: string;
  tag: string;
  description: string;
  variants: Variant[];
  images: File[];
}
interface Category { _id: string; name: string; }
interface Brand { _id: string; name: string; }
interface Tag { _id: string; name: string; }
interface Size { _id: string; name: string; }
interface Color { _id: string; name: string; }

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    slug: "",
    price: "",
    category: "",
    brand: "",
    tag: "",
    description: "",
    variants: [],
    images: [],
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(false);

  // Variant states
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [stock, setStock] = useState<number | "">(0);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const colorDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close color dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(event.target as Node)) {
        setColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch categories, brands, tags, sizes, colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, brandRes, tagRes, sizeRes, colorRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/brands"),
          axios.get("http://localhost:5000/api/tags"),
          axios.get("http://localhost:5000/api/sizes"),
          axios.get("http://localhost:5000/api/colors"),
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
        setTags(tagRes.data);
        setSizes(sizeRes.data);
        setColors(colorRes.data);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  // Auto-generate slug
  useEffect(() => {
    const slug = form.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    setForm(prev => ({ ...prev, slug }));
  }, [form.name]);

  // Input handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "price") setForm(prev => ({ ...prev, price: value === "" ? "" : Number(value) }));
    else setForm(prev => ({ ...prev, [name]: value }));
  };

  // Main Image
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
      setMainPreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  const removeMainImage = () => { setMainImage(null); setMainPreview(null); };

  // Gallery Images
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const combinedFiles = [...form.images, ...newFiles].slice(0, 4);
      setForm(prev => ({ ...prev, images: combinedFiles }));
      setGalleryPreview(combinedFiles.map(f => URL.createObjectURL(f)));
    }
  };
  const removeGalleryImage = (index: number) => {
    setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    setGalleryPreview(prev => prev.filter((_, i) => i !== index));
  };

  // Add/Remove Variant
  const addVariant = () => {
    if (!selectedSize || selectedColors.length === 0) {
      alert("Size aur kam se kam 1 color select karo!");
      return;
    }
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { size: selectedSize, colors: selectedColors, stock: stock || 0 }],
    }));
    setSelectedSize("");
    setSelectedColors([]);
    setStock(0);
    setColorDropdownOpen(false);
  };
  const removeVariant = (index: number) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.brand || !form.tag || !mainImage) {
      alert("All required fields including main image must be filled!");
      return;
    }
    if (form.variants.length === 0) {
      alert("Kam se kam 1 variant add karo!");
      return;
    }

    // Flatten variants for backend
    const flattenedVariants = form.variants.flatMap(v =>
      v.colors.map(color => ({
        size: v.size,
        color,
        stock: v.stock
      }))
    );

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    formData.append("price", form.price.toString());
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("tag", form.tag);
    formData.append("description", form.description);
    formData.append("images", mainImage);
    form.images.forEach(img => formData.append("images", img));
    formData.append("variants", JSON.stringify(flattenedVariants));

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/products", formData, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Product added successfully!");
      navigate("/admin-dashboard/products");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold mt-[-25px] text-red-600">Add Product</h2>
        <button onClick={() => navigate("/admin-dashboard/products")} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"><FiArrowLeft /> Back</button>
      </div>

      <div className="max-w-5xl mx-auto bg-white mt-5 shadow-xl rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name | Slug | Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input type="text" name="name" placeholder="Stripe Noir" value={form.name} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Slug</label>
              <input type="text" name="slug" placeholder="stripe-noir" value={form.slug} readOnly className="w-full border rounded-xl px-3 py-2 bg-gray-100 outline-none" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input type="number" name="price" placeholder="4999" value={form.price} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" />
            </div>
          </div>

          {/* Category | Brand | Tag */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Brand</label>
              <select name="brand" value={form.brand} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
                <option value="">Select Brand</option>
                {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Tag</label>
              <select name="tag" value={form.tag} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
                <option value="">Select Tag</option>
                {tags.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </div>
          </div>

          {/* Main Image */}
          <div>
            <label className="block mb-1 font-medium">Main Image</label>
            <div className={`w-60 h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer ${mainPreview ? "border-gray-300" : "border-gray-400 hover:border-red-500"}`} onClick={() => document.getElementById("mainImageInput")?.click()}>
              {!mainPreview ? <div className="text-center text-gray-400"><FiUpload className="mx-auto text-3xl mb-2" /><p>Upload main image</p></div> : <img src={mainPreview} alt="main" className="w-full h-full object-cover rounded-xl" />}
            </div>
            <input type="file" id="mainImageInput" accept="image/*" onChange={handleMainImageChange} className="hidden" />
          </div>

          {/* Gallery */}
          <div>
            <label className="block mb-1 font-medium">Gallery Images (Max 4)</label>
            <div className="flex gap-4">
              {galleryPreview.map((src, i) => (
                <div key={i} className="relative w-40 h-40 border rounded-xl overflow-hidden">
                  <img src={src} alt="gallery" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-100"><FiTrash2 className="text-red-600" /></button>
                </div>
              ))}
              {form.images.length < 4 && (
                <div className="w-40 h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-red-500 text-gray-400" onClick={() => document.getElementById("galleryImageInput")?.click()}>
                  <FiUpload className="text-3xl mb-2" />
                  <p className="text-center text-sm">Upload image</p>
                </div>
              )}
            </div>
            <input type="file" id="galleryImageInput" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" placeholder="Describe notes & longevity" value={form.description} onChange={handleChange} className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" />
          </div>

          {/* Variants */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block mb-2 golden-text font-medium">Variants</label>
            </div>

            {/* Variant Inputs */}
            <div className="flex gap-4 items-end mb-4">
              {/* Size Dropdown */}
              <div className="flex-1 flex flex-col">
                <label className="mb-1 text-sm">Size</label>
                <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
                  <option value="">Select Size</option>
                  {sizes.map(s => <option key={s._id} value={s.name}>{s.name}</option>)}
                </select>
              </div>

              {/* Color Multi-Select Dropdown */}
              <div className="flex-1 flex flex-col relative" ref={colorDropdownRef}>
                <label className="mb-1 text-sm">Colors</label>
                <div className="border rounded-xl px-3 py-2 cursor-pointer relative" onClick={() => setColorDropdownOpen(prev => !prev)}>
                  {selectedColors.length === 0 ? "Select Colors" : selectedColors.join(", ")}
                </div>
                {colorDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {colors.map(c => (
                      <label key={c._id} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(c.name)}
                          onChange={() => {
                            if (selectedColors.includes(c.name)) setSelectedColors(selectedColors.filter(col => col !== c.name));
                            else setSelectedColors([...selectedColors, c.name]);
                          }}
                        />
                        {c.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Stock */}
              <div className="flex-1 flex flex-col">
                <label className="mb-1 text-sm">Stock</label>
                <input type="number" placeholder="0" value={stock} onChange={e => setStock(Number(e.target.value))} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" />
              </div>

              <button type="button" onClick={addVariant} className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700">Add</button>
            </div>

            {/* Variant List */}
            <div className="space-y-2">
              {form.variants.map((v, i) => (
                <div key={i} className="flex gap-4 items-center border p-2 rounded-xl">
                  <span>Size: <strong>{v.size}</strong></span>
                  <span>Colors: <strong>{v.colors.join(", ")}</strong></span>
                  <span>Stock: <strong>{v.stock}</strong></span>
                  <button type="button" onClick={() => removeVariant(i)} className="ml-auto"><FiTrash2 className="text-red-600 hover:text-red-700" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div>
            <button type="submit" disabled={loading} className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700 transition shadow-md w-42">{loading ? "Saving..." : "Add Product"}</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;