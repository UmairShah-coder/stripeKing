// src/admin/pages/Products.tsx
import React, { useState } from "react";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number; // Rs
  size: string;
  color: string; // hex code
}

const initialProducts: Product[] = [
  { id: 1, name: "Urban Classic Sneakers", category: "Sneakers", price: 120, size: "42", color: "#FF0000" },
  { id: 2, name: "Leather Oxford Shoes", category: "Formals", price: 150, size: "41", color: "#000000" },
  { id: 3, name: "Casual Street Shoes", category: "Casual", price: 110, size: "43", color: "#FFFFFF" },
  { id: 4, name: "High-Top Sneakers", category: "Sneakers", price: 160, size: "44", color: "#0000FF" },
];

const Products: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6  min-h-screen">
      <style>{`* { font-family: 'Poppins', sans-serif; }`}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            <span className="golden-text">
              Products
            </span>
          </h2>
          <p className="text-gray-500 mt-2">Manage all products.</p>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard/products/add")}
          className="flex items-center gap-2 bg-red-600 text-black font-semibold rounded-xl px-5 py-3 shadow-lg hover:bg-red-700 hover:text-white transform transition"
        >
          <span className="text-lg font-bold">+</span> Add Product
        </button>
      </div>

      {/* Search Bar */}
    <div className="mb-6">
             <div className="relative w-96">
               <FaSearch className="absolute top-3 left-3 text-gray-400" />
               <input
                 type="text"
                 placeholder="Search products..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
               />
             </div>
           </div>
   
      {/* Products Table */}
  <div className="overflow-x-auto">
  <table className="min-w-full border border-gray-300 rounded-xl border-collapse shadow-sm">
    <thead className="bg-gray-100  uppercase text-gray-800 golden-text text-center">
      <tr>
        <th className="px-4 py-3 text-sm border border-gray-300">Product</th>
        <th className="px-4 py-3 text-sm   border border-gray-300">Category</th>
        <th className="px-4 py-3 text-sm  border border-gray-300">Price</th>
        <th className="px-4 py-3 text-sm  border border-gray-300">Size</th>
        <th className="px-4 py-3 text-sm  border border-gray-300">Color</th>
        <th className="px-4 py-3 text-sm  border border-gray-300">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, idx) => (
          <tr
            key={product.id}
            className={`${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-gray-100 transition`}
          >
            <td className="px-4 py-3 border border-gray-300 text-center font-medium">
              {product.name}
            </td>
            <td className="px-4 py-3 border border-gray-300 text-center">
              {product.category}
            </td>
            <td className="px-4 py-3 border border-gray-300 text-center font-semibold">
              Rs {product.price}
            </td>
            <td className="px-4 py-3 border border-gray-300 text-center">
              {product.size}
            </td>
            <td className="px-4 py-3 border border-gray-300 text-center">
              <span
                className="inline-block w-5 h-5 rounded-full border border-gray-300 mx-auto"
                style={{ backgroundColor: product.color }}
              ></span>
            </td>
            <td className="px-4 py-5 border border-gray-200 flex justify-center gap-3">
              <button
                onClick={() => navigate(`/admin-dashboard/edit-product/${product.id}`)}
                className="text-gray-500 hover:text-gray-700 transition text-lg"
                title="Edit Product"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteProduct(product.id)}
                className="text-red-500 hover:text-red-700 transition text-lg"
                title="Delete Product"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="text-center py-6 text-gray-400 border border-gray-300">
            No products found.
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
