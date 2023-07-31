import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Cart from './components/Cart';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Orderpage from './components/Orderpage';
import Productpage from './components/Productpage';
import Register from './components/Register';
import Shipping from './components/Shipping';
import Singleproduct from './components/Singleproduct';
import axios from 'axios';
import Myorder from './components/Myorder';
import Updateprofile from './components/Updateprofile';
import ChangePassword from './components/ChangePassword';
import Admin from './admin/Admin';
import Products from './admin/Products';
import ProductUpdate from './admin/ProductUpdate';
import Orders from './admin/Orders';
import GetUsers from './admin/GetUsers';
import IndUserOrder from './admin/IndUserOrder';
import { useEffect } from 'react';
function App() {
  axios.defaults.withCredentials = true;
  const { cart } = useSelector((state) => state.cartItems);
  const { userInfo } = useSelector((state) => state.user);
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.removeItem('userInfo');
    }, 24 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Productpage />}></Route>
          <Route path="/single/:id" exact element={<Singleproduct />}></Route>
          <Route path="/cart" exact element={<Cart />}></Route>
          <Route path="/login" exact element={<Login />}></Route>
          <Route path="/register" exact element={<Register />}></Route>
          {userInfo ? (
            <>
              <Route
                path="/shipping"
                exact
                element={
                  userInfo ? (
                    cart.length > 0 && userInfo ? (
                      <Shipping />
                    ) : (
                      <Cart />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route
                path="/confirmOrder"
                exact
                element={
                  userInfo ? (
                    cart.length > 0 ? (
                      <Orderpage />
                    ) : (
                      <Cart />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route
                path="/myorder"
                exact
                element={userInfo ? <Myorder /> : <Login />}
              ></Route>
              <Route
                path="/updateprofile"
                exact
                element={userInfo ? <Updateprofile /> : <Login />}
              ></Route>
              <Route
                path="/changepassword"
                exact
                element={userInfo ? <ChangePassword /> : <Login />}
              ></Route>
              <Route
                path="/admin"
                exact
                element={userInfo.roles == 'admin' ? <Admin /> : <Login />}
              ></Route>
              <Route
                path="/createproduct"
                exact
                element={
                  userInfo ? (
                    userInfo.roles == 'admin' ? (
                      <Products />
                    ) : (
                      <Login />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route
                path="/updateproduct/:id"
                exact
                element={
                  userInfo ? (
                    userInfo.roles == 'admin' ? (
                      <ProductUpdate />
                    ) : (
                      <Login />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route
                path="/adminorders"
                exact
                element={
                  userInfo ? (
                    userInfo.roles == 'admin' ? (
                      <Orders />
                    ) : (
                      <Login />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route
                path="/getusers"
                exact
                element={
                  userInfo ? (
                    userInfo.roles == 'admin' ? (
                      <GetUsers />
                    ) : (
                      <Login />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route
                path="/getalluserorder/:id"
                exact
                element={
                  userInfo ? (
                    userInfo.roles == 'admin' ? (
                      <IndUserOrder />
                    ) : (
                      <Login />
                    )
                  ) : (
                    <Login />
                  )
                }
              ></Route>
            </>
          ) : (
            <Route path="/login" exact element={<Login />}></Route>
          )}
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
