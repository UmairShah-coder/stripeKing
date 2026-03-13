// src/admin/components/layout/EditProduct.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import axios from "axios";

interface Variant {
  size: string;
  colors: string[];
  stock: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  category: { _id: string; name: string };
  brand: { _id: string; name: string };
  tag: { _id: string; name: string };
  description: string;
  mainImage: string;
  galleryImages: string[];
  variants: Variant[];
}

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<Omit<Product, "_id">>({
    name: "",
    slug: "",
    price: 0,
    category: "",
    brand: "",
    tag: "",
    description: "",
    mainImage: "",
    galleryImages: [],
    variants: [],
  });

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [brands, setBrands] = useState<{ _id: string; name: string }[]>([]);
  const [tags, setTags] = useState<{ _id: string; name: string }[]>([]);
  const [sizes, setSizes] = useState<string[]>(["38","39","40","41","42","43","44"]);
  const [colors, setColors] = useState<string[]>(["White","Black","Red","Blue","Brown","Yellow"]);

  // Variant inputs
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [stock, setStock] = useState<number>(0);
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
  const colorDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Categories, brands, tags
        const [catRes, brandRes, tagRes, productRes] = await Promise.all([
          axios.get("http://localhost:5000/api/categories"),
          axios.get("http://localhost:5000/api/brands"),
          axios.get("http://localhost:5000/api/tags"),
          axios.get(`http://localhost:5000/api/products/${id}`),
        ]);

        setCategories(catRes.data);
        setBrands(brandRes.data);
        setTags(tagRes.data);

        const p = productRes.data;
        setForm({
          name: p.name,
          slug: p.slug,
          price: p.price,
          category: p.category._id,
          brand: p.brand._id,
          tag: p.tag._id,
          description: p.description,
          mainImage: p.mainImage,
          galleryImages: p.galleryImages,
          variants: [], // flatten to size/colors/stock below
        });

        // Prepare variant format for frontend
        const variantMap: Record<string, { colors: string[], stock: number }> = {};
        p.variants.forEach((v: { size: string; color: string; stock: number }) => {
          if (!variantMap[v.size]) variantMap[v.size] = { colors: [], stock: v.stock };
          variantMap[v.size].colors.push(v.color);
        });
        const variants: Variant[] = Object.entries(variantMap).map(([size, data]) => ({
          size,
          colors: data.colors,
          stock: data.stock,
        }));
        setForm(prev => ({ ...prev, variants }));

        setMainPreview(p.mainImage);
        setGalleryPreview(p.galleryImages);

      } catch (err) {
        console.error(err);
        alert("Error loading product data");
      }
    };
    fetchData();
  }, [id]);

  // Auto slug generation
  useEffect(() => {
    const slug = form.name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
    setForm(prev => ({ ...prev, slug }));
  }, [form.name]);

  // Click outside for color dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (colorDropdownRef.current && !colorDropdownRef.current.contains(e.target as Node)) {
        setColorDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name==="price"? Number(value): value }));
  };

  const handleMainFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainFile(e.target.files[0]);
      setMainPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGalleryFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).slice(0, 4 - galleryFiles.length);
    setGalleryFiles(prev => [...prev, ...files]);
    setGalleryPreview(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreview(prev => prev.filter((_, i) => i !== index));
  };

  const removeMainImage = () => { setMainFile(null); setMainPreview(null); };

  const addVariant = () => {
    if (!selectedSize || selectedColors.length === 0) { alert("Size aur kam se kam 1 color select karo"); return; }
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { size: selectedSize, colors: selectedColors, stock }],
    }));
    setSelectedSize(""); setSelectedColors([]); setStock(0);
    setColorDropdownOpen(false);
  };

  const removeVariant = (index: number) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("price", form.price.toString());
      formData.append("category", form.category);
      formData.append("brand", form.brand);
      formData.append("tag", form.tag);
      formData.append("description", form.description);

      // Flatten variants for backend
      const flattenedVariants = form.variants.flatMap(v => v.colors.map(color => ({
        size: v.size,
        color,
        stock: v.stock
      })));
      formData.append("variants", JSON.stringify(flattenedVariants));

      if (mainFile) formData.append("images", mainFile);
      galleryFiles.forEach(f => formData.append("images", f));

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully");
      navigate("/admin-dashboard/products");

    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold text-red-600">Edit Product</h2>
        <button onClick={() => navigate("/admin-dashboard/products")} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"><FiArrowLeft /> Back</button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        {/* Name, Slug, Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" />
          <input type="text" name="slug" placeholder="Slug" value={form.slug} readOnly className="border rounded-xl px-3 py-2 bg-gray-100 outline-none" />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" />
        </div>

        {/* Category | Brand | Tag */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select name="category" value={form.category} onChange={handleChange} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
            <option value="">Select Category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select name="brand" value={form.brand} onChange={handleChange} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
            <option value="">Select Brand</option>
            {brands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
          </select>
          <select name="tag" value={form.tag} onChange={handleChange} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none">
            <option value="">Select Tag</option>
            {tags.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>
        </div>

        {/* Description */}
        <textarea name="description" value={form.description} onChange={handleChange} className="border rounded-xl px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none" placeholder="Description" />

        {/* Main Image */}
        <div>
          <label>Main Image</label>
          <div className="w-60 h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer" onClick={() => document.getElementById("mainImage")?.click()}>
            {mainPreview ? <img src={mainPreview} alt="main" className="w-full h-full object-cover rounded-xl" /> : <span>Upload Main Image</span>}
          </div>
          <input type="file" id="mainImage" accept="image/*" onChange={handleMainFile} className="hidden" />
        </div>

        {/* Gallery */}
        <div>
          <label>Gallery Images (Max 4)</label>
          <div className="flex gap-4">
            {galleryPreview.map((src,i) => (
              <div key={i} className="relative w-40 h-40 border rounded-xl overflow-hidden">
                <img src={src} alt="gallery" className="w-full h-full object-cover" />
                <button type="button" onClick={()=>removeGalleryImage(i)} className="absolute top-1 right-1 bg-white rounded-full p-1"><FiTrash2 className="text-red-600"/></button>
              </div>
            ))}
            {galleryFiles.length < 4 && <div className="w-40 h-40 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer" onClick={()=>document.getElementById("galleryInput")?.click()}>+</div>}
            <input type="file" id="galleryInput" multiple accept="image/*" onChange={handleGalleryFiles} className="hidden"/>
          </div>
        </div>

        {/* Variants */}
        <div>
          <label>Variants</label>
          <div className="flex gap-4 items-end mb-4">
            <select value={selectedSize} onChange={e=>setSelectedSize(e.target.value)} className="border rounded-xl px-3 py-2 outline-none">
              <option value="">Select Size</option>
              {sizes.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="relative flex-1" ref={colorDropdownRef}>
              <div className="border rounded-xl px-3 py-2 cursor-pointer" onClick={()=>setColorDropdownOpen(prev=>!prev)}>
                {selectedColors.length===0?"Select Colors":selectedColors.join(", ")}
              </div>
              {colorDropdownOpen && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-xl shadow-lg max-h-48 overflow-y-auto">
                  {colors.map(c=>(
                    <label key={c} className="flex items-center gap-2 px-3 py-2 cursor-pointer">
                      <input type="checkbox" checked={selectedColors.includes(c)} onChange={()=>{
                        if(selectedColors.includes(c)) setSelectedColors(selectedColors.filter(col=>col!==c));
                        else setSelectedColors([...selectedColors,c]);
                      }}/>
                      {c}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <input type="number" placeholder="Stock" value={stock} onChange={e=>setStock(Number(e.target.value))} className="border rounded-xl px-3 py-2 outline-none"/>
            <button type="button" onClick={addVariant} className="bg-red-600 text-white px-4 py-2 rounded-xl">Add</button>
          </div>

          {form.variants.map((v,i)=>(
            <div key={i} className="flex gap-4 items-center border p-2 rounded-xl mb-2">
              <span>Size: <strong>{v.size}</strong></span>
              <span>Colors: <strong>{v.colors.join(", ")}</strong></span>
              <span>Stock: <strong>{v.stock}</strong></span>
              <button type="button" onClick={()=>removeVariant(i)} className="ml-auto"><FiTrash2 className="text-red-600"/></button>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;