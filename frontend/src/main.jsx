import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { AuthProvider } from './context/AuthContext.jsx';
  import App from './App.jsx';
  import Register from './components/Register.jsx';
  import Login from './components/Login.jsx';
  import Products from './components/Products.jsx';
  import Cart from './components/Cart.jsx';
  import Checkout from './components/Checkout.jsx';
  import AdminPortal from './components/AdminPortal.jsx';
  import OrderConfirmation from './components/OrderConfirmation.jsx';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import './index.css';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Products />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="admin" element={<AdminPortal />} />
            </Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );