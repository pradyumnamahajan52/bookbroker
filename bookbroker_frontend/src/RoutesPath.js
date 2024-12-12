import React,{Fragment} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import Home from "./core/Home";
import NotFound from "./NotFound";
import Productdets from "./core/Productdets";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Cart from "./core/Cart";
import UserDashBoard from "./user/UserDashBoard";
import PrivateRoute from "./auth/helper/PrivateRoute";
import OrderSubmit from "./core/OrderSubmit";
import Address from "./core/Address";
import PaymentB from "./core/PaymentB";
import MyOrder from "./user/MyOrder";
import SellerOrder from "./user/SellerOrder";
import AddAddress from "./core/AddAddress";
import AboutUs from "./core/AboutUs";
import helpus from "./core/helpus";
import CallSupport from "./core/CallSupport";
import SellYourProduct from "./core/SellYourProduct";

const RoutesPath = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={App} /> */}
        <Route path="/" exact element={< Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/user/login" exact element={<Signin />} />
        <Route path="/user/signup" exact element={<Signup />} />
        <Route path="/product/:id/" exact element={<Productdets />} />
        <Route path="/aboutus" exact element={<AboutUs />} />
        <Route path="/helpus" exact element={<helpus />} />
        <Route element={<PrivateRoute><CallSupport /></PrivateRoute>}  exact />
        <Route path="/user/dashboard" exact element={<PrivateRoute><UserDashBoard /></PrivateRoute>} />
        <Route path="/order/address" exact element={<PrivateRoute><Address /></PrivateRoute>} />
        <Route path="/order/address/add" exact element={<PrivateRoute><AddAddress /></PrivateRoute>} />
        <Route path="/order/confirm" exact element={<PrivateRoute> <OrderSubmit /></PrivateRoute>} />
        <Route path="/user/order/myorder" exact element={<PrivateRoute> <MyOrder /> </PrivateRoute>} />
        <Route
          path="/PrivateRoute/product/add"
          exact
          element={<PrivateRoute>< SellYourProduct /></PrivateRoute>}
        />

        <Route
          path="/user/order/sellorder"
          exact
          element={<PrivateRoute><SellerOrder /></PrivateRoute>}
        />
        <Route
          path="/order/confirm/payment"
          exact
          element={<PrivateRoute><PaymentB /></PrivateRoute>}
        />

        <Route element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesPath;
