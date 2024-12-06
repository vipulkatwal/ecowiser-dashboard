import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAuthStore } from './store/auth';
import Layout from './components/Layout';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import BrandsList from './components/brands/BrandsList';
import BrandDetail from './components/brands/BrandDetail';
import ProductsList from './components/products/ProductsList';
import ProductDetail from './components/products/ProductDetail';
import CustomersList from './components/customers/CustomersList';
import CategoriesList from './components/categories/CategoriesList';
import OrdersList from './components/orders/OrdersList';
import CouponsList from './components/coupons/CouponsList';
import ChatsList from './components/chats/ChatsList';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="brands" element={<BrandsList />} />
          <Route path="brands/:id" element={<BrandDetail />} />
          <Route path="products" element={<ProductsList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="orders" element={<OrdersList />} />
          <Route path="coupons" element={<CouponsList />} />
          <Route path="chats" element={<ChatsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;