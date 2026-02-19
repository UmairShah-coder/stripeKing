// src/pages/Cart.tsx
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  sizes: string[];
  colors: string[];
  description: string;
  sku: string;
  stock: number; // quantity available
  discount?: number; // optional discount percentage
};

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Urban Classic Sneakers",
      price: 1112,
      image: "/sho.png",
      quantity: 1,
      selectedSize: "42",
      selectedColor: "#ae1313",
      sizes: ["41", "42", "43", "44", "45"],
      colors: ["#ae1313", "#1373ae", "#13ae73", "#ae13ae"],
      description:
        "Comfortable sneakers for daily wear. Premium material ensures durability and style.",
      sku: "UC-001",
      stock: 10,
      discount: 10, // 10% discount
    },
  ]);

  // Remove item from cart
  const removeItem = (id: number) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  // Update size
  const updateSize = (id: number, size: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedSize: size } : item
      )
    );
  };

  // Update color
  const updateColor = (id: number, color: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selectedColor: color } : item
      )
    );
  };

  // Increment quantity
  const incrementQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity
  const decrementQuantity = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => {
    const discountedPrice = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return acc + discountedPrice * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? 150 : 0;
  const taxes = subtotal * 0.1; // 10% tax example
  const total = subtotal + shipping + taxes;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-8 border-b-2 border-red-500 w-fit pb-2 text-black">
        Your <span className="golden-text">Cart</span>
      </h2>

      {cart.length === 0 ? (
        <p className="text-black text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 border border-red-500 rounded-xl overflow-hidden hover:border-[#bca000] hover:shadow-[0_0_10px_#ca0808d4] transition-all duration-300 flex flex-col lg:flex-row items-center gap-4 p-4"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-contain"
                />

                {/* Product Details */}
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="text-black font-semibold text-lg">
                      {item.name}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {/* Product Description */}
                  <p className="text-black capitalize text-sm">{item.description}</p>

                  {/* SKU */}

                  {/* Stock Status */}
                  <p
                    className={`text-sm font-medium ${
                      item.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.stock > 0
                      ? `${item.stock} in stock`
                      : "Out of stock"}
                  </p>

                  {/* Price & Discount */}
                  <div className="flex items-center gap-2">
                    {item.discount ? (
                      <>
                        <span className="golden-text font-bold text-lg">
                          Rs.{" "}
                          {(
                            item.price -
                            (item.price * item.discount) / 100
                          ).toLocaleString()}
                        </span>
                        <span className="line-through text-gray-500">
                          Rs. {item.price.toLocaleString()}
                        </span>
                        <span className="text-red-600 font-medium">
                          ({item.discount}% OFF)
                        </span>
                      </>
                    ) : (
                      <span className="golden-text font-bold text-lg">
                        Rs. {item.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Sizes as clickable text */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="golden-text font-medium">Size:</span>
                    <div className="flex gap-2">
                      {item.sizes.map((size) => (
                        <span
                          key={size}
                          onClick={() => updateSize(item.id, size)}
                          className={`px-2 py-1 border rounded cursor-pointer text-black ${
                            item.selectedSize === size
                              ? "border-red-500 font-bold"
                              : "border-gray-300"
                          }`}
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Color dots */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="golden-text font-medium">Color:</span>
                    <div className="flex gap-2">
                      {item.colors.map((color) => (
                        <span
                          key={color}
                          onClick={() => updateColor(item.id, color)}
                          className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                            item.selectedColor === color
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                        ></span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="px-3 py-1 bg-red-600 hover:text-white hover:bg-red-700 text-white font-bold rounded transition"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded text-black bg-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="px-3 py-1 bg-red-600 hover:text-white hover:bg-red-700 text-white font-bold rounded transition"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal per item */}
                
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 p-6 bg-black rounded-xl flex flex-col gap-4 relative">
            <div className="absolute inset-0 bg-black/60 rounded-xl"></div>
            <div className="relative flex flex-col gap-4 text-white">
              <h3 className="text-xl font-bold border-b border-red-500 pb-2 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
             
              <div className="flex justify-between font-medium">
                <span>Shipping:</span>
                <span>Rs. {shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-red-500 pt-2">
                <span>Total:</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <Link to="/checkout">
                <button className="mt-4 w-full bg-red-600 text-white font-semibold py-3 rounded-xl hover:bg-red-700 hover:text-white transition-colors">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
