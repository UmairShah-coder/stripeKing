// src/App.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/layout/Hero";
import CategorySection from "./components/layout/CategorySection";
import FeaturedProducts from "./components/layout/FeaturedProducts";
import LovedByCustomers from "./components/layout/LovedByCustomers";
import WhyChooseUs from "./components/layout/WhyChooseUs";
import Newsletter from "./components/layout/Newsletter";

import Products from "./pages/Products";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import AdminProducts from "./admin/pages/Products";
import Category from "./admin/pages/Category";

import AddProduct from "./admin/components/layout/AddProduct";
import EditProduct from "./admin/components/layout/EditProduct";

import ProductDetail from "./components/layout/ProductDetail";
import Chat from "./pages/Chat";
import CategoryPage from "./pages/CategoryPage";

import HomeLoader from "./components/layout/HomeLoader";
import PageLoader from "./components/layout/PageLoader";

import EditCategory from "./admin/components/layout/EditCategory";
import AddCategory from "./admin/components/layout/AddCategory";
import Brands from "./admin/pages/Brands";
import AddBrand from "./admin/components/layout/AddBrand";
import TagPage from "./admin/pages/Tag";
import Sizes from "./admin/pages/Sizes";
import Colors from "./admin/pages/Colors";
import AddTag from "./admin/components/layout/AddTag";
import AddSize from "./admin/components/layout/AddSize";
import AddColor from "./admin/components/layout/AddColor";
import EditTag from "./admin/components/layout/EditTag";
import EditColor from "./admin/components/layout/EditColor";
import EditSize from "./admin/components/layout/EditSize";
import EditBrand from "./admin/components/layout/EditBrand";
import OrdersPage from "./admin/pages/Orders";
import OrderView from "./admin/pages/OrderView";
import ChatsTable from "./admin/pages/ChatsTable";
import ChatPage from "./admin/components/layout/ChatPage";
import ReviewsPage from "./admin/pages/Reviews";
import ReviewDetailPage from "./admin/components/layout/ReviewPageDetail";

import AdminLogin from "./admin/pages/AdminLogin";
import UserProfiles from "./admin/pages/UserProfiles";
import AddProductVariant from "./admin/components/layout/AddProductVariant";

// --------------------------
// Protected Route Component
// --------------------------
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

// --------------------------
// Main App
// --------------------------
const App: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Admin detection
  const isAdminRoute = location.pathname.startsWith("/admin-dashboard");

  // Hide default layout on certain routes
  const hideLayoutRoutes = ["/login", "/register", "/ordersuccess", "/admin-login"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname) || isAdminRoute;

  useEffect(() => {
    if (!hideLayout && location.pathname !== "/") {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname, hideLayout]);

  return (
    <>
      {!hideLayout && <PageLoader isLoading={loading} />}
      {!hideLayout && !loading && <Navbar />}

      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <HomeLoader>
                <>
                  <Hero />
                  <CategorySection />
                  <FeaturedProducts />
                  <LovedByCustomers />
                  <Newsletter />

                  <WhyChooseUs />
                </>
              </HomeLoader>
            }
          />

          {/* PUBLIC ROUTES */}
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
  <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/category/:id" element={<CategoryPage />} />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin-login"
            element={
              localStorage.getItem("adminToken") ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <AdminLogin />
              )
            }
          />

          {/* ADMIN DASHBOARD PROTECTED ROUTE */}
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="category" element={<Category />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="category/edit/:id" element={<EditCategory />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="brands" element={<Brands />} />
            <Route path="brands/add" element={<AddBrand />} />
            <Route path="tags" element={<TagPage />} />
            <Route path="sizes" element={<Sizes />} />
            <Route path="colors" element={<Colors />} />
            <Route path="tag/add" element={<AddTag />} />
            <Route path="size/add" element={<AddSize />} />
            <Route path="color/add" element={<AddColor />} />
           <Route path="tag/edit/:id" element={<EditTag />} />
           <Route path="size/edit/:id" element={<EditSize />} />
           <Route path="color/edit/:id" element={<EditColor />} />

            <Route path="brands/edit/:id" element={<EditBrand />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="chatstable" element={<ChatsTable />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="review/:id" element={<ReviewDetailPage />} />
            <Route path="chat/:id" element={<ChatPage />} />
            <Route path="orders/view/:id" element={<OrderView />} />
            <Route path="profiles" element={<UserProfiles />} />
<Route path="add-product-variant" element={<AddProductVariant />} />
          </Route>
        </Routes>
      </div>

      {!hideLayout && !loading && <Footer />}
    </>
  );
};

export default App;
