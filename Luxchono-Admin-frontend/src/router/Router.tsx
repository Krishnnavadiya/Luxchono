import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/register';
import VerifyEmail from '../pages/VerifyEmail';
import Brand from '../pages/Brand';
import AddBrand from '../pages/Brand/AddBrand';
import EditBrand from '../pages/Brand/EditBrand';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import AddProduct from '../pages/Product/AddProduct';
import EditProduct from '../pages/Product/EditProduct';
import Order from '../pages/Order';
import ViewOrder from '../pages/Order/ViewOrder';
import Offer from '../pages/Offer';
import Customer from '../pages/Customer';
import Category from '../pages/Category';
import AuthHandler from './AuthHandler';
import AddCategory from '../pages/Category/AddCategory';
import EditCategory from '../pages/Category/EditCategory';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';
import AddOffer from '../pages/Offer/AddOfferPage';
import EditOffer from '../pages/Offer/EditOfferPage';
import ViewOffer from '../pages/Offer/viewOfferPage';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <AuthHandler />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin-verify-email" element={<VerifyEmail />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/brand" element={<Brand />}></Route>
          <Route path="/addbrand" element={<AddBrand />}></Route>
          <Route path="/editbrand" element={<EditBrand />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/addproduct" element={<AddProduct />}></Route>
          <Route path="/editproduct" element={<EditProduct />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/vieworder" element={<ViewOrder />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/addcategory" element={<AddCategory />}></Route>
          <Route path="/editcategory" element={<EditCategory />}></Route>
          <Route path="/offer" element={<Offer />}></Route>
          <Route path='/addoffer' element={<AddOffer />} />
          <Route path='/editoffer' element={<EditOffer />} />
          <Route path='/viewoffer' element={<ViewOffer />} />
          <Route path="/customer" element={<Customer />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}
