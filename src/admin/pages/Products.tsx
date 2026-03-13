// src/admin/components/layout/Products.tsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Variant {
  size: string;
  color: string;  // flattened format
  stock: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: { _id: string; name: string };
  mainImage: string;
  galleryImages: string[];
  variants: Variant[];
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-red-600">Products</h2>
          <p className="text-gray-500">Manage all products</p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard/products/add")}
          className="bg-red-600 text-white px-5 py-2 rounded-xl shadow hover:bg-red-700"
        >
          + Add Product
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 w-96 relative">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-center border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {/* Product column: image + name */}
                  <td className="p-3 flex items-center gap-3 text-left">
                    {product.mainImage ? (
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
                        No Image
                      </div>
                    )}
                    <span className="font-semibold">{product.name}</span>
                  </td>

                  {/* Category */}
                  <td className="p-3">{product.category?.name || "N/A"}</td>

                  {/* Price */}
                  <td className="p-3 font-bold text-red-600">Rs {product.price}</td>

                  {/* Variants */}
                  <td className="p-3">
                    {product.variants.length > 0 ? (
                      <div className="flex flex-col gap-2">
                        {Object.entries(
                          product.variants.reduce(
                            (acc: Record<string, { colors: string[], stock: number }>, v) => {
                              if (!acc[v.size]) acc[v.size] = { colors: [], stock: v.stock };
                              acc[v.size].colors.push(v.color);
                              return acc;
                            },
                            {}
                          )
                        ).map(([size, { colors, stock }], i) => (
                          <div key={i} className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg text-sm">
                            <span className="font-semibold">Size: {size}</span>
                            <span>Colors: <strong>{colors.join(", ")}</strong></span>
                            <span>Stock: {stock}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">No variants</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-3 flex justify-center gap-4">
                    <button
                      onClick={() => navigate(`/admin-dashboard/edit-product/${product._id}`)}
                      className="text-gray-600 hover:text-black"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-gray-400">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;