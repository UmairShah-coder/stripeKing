import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
}

const AddProductVariant: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    product: "",
    colors: "",
    sizes: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const colorsArray = formData.colors
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c);

      const sizesArray = formData.sizes
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);

      const payload = {
        product: formData.product,
        colors: colorsArray,
        sizes: sizesArray,
      };

      const res = await fetch(
        "http://localhost:5000/api/product-variants/bulk",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      await Swal.fire({
        icon: "success",
        title: "Variants Created",
        text: "All combinations added successfully",
        confirmButtonColor: "#dc2626",
      });

      navigate("/admin-dashboard/product-variant");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while adding variants",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl border border-gray-200 p-10">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold golden-text">
            Add Product Variants
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Add multiple colors and sizes separated by comma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Select Product
            </label>
            <select
              name="product"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Choose Product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Colors Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Colors
            </label>
            <input
              type="text"
              name="colors"
              placeholder="Black, White, Blue"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Start with a value and separate each color using a comma ( , )  
              Example: Black, White, Blue
            </p>
          </div>

          {/* Sizes Input */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Sizes
            </label>
            <input
              type="text"
              name="sizes"
              placeholder="S, M, L, XL"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              Start with a value and separate each size using a comma ( , )  
              Example: S, M, L, XL
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            {loading ? "Creating Variants..." : "Create Variants"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductVariant;
