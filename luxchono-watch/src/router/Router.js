import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import EmailVerify from "../pages/EmailVerify";
import OtpVerify from "../pages/Otp";
import Register from "../pages/Register";
import AuthHandler from "./AuthHandler";
import ProductDetails from "../pages/ProductDetails";
import ScrollToTop from "./ScrollToTop";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import PaymentOrder from "../pages/PaymentOrder";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import PrivacyPolicy from "../pages/PrivacyPolicy";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <AuthHandler />
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/emailverify" element={<EmailVerify />}></Route>
          <Route path="/otpverify" element={<OtpVerify />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/productdetails" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/paymentorder" element={<PaymentOrder />} ></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} ></Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
