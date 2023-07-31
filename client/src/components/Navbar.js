import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './css/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/loginAction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
import { loadAllProduct } from '../redux/actions/productActions';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
function Navbar() {
  const [updates, setUpdates] = useState('none');
  const [cat, setCat] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cartItems);
  const { userInfo } = useSelector((state) => state.user);
  const [ham, setHam] = useState(false);
  const signoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success('Logout Successfull');
  };
  const getCat = async () => {
    try {
      const { data } = await axios.get(
        'https://mernecommercewebsite-backend.vercel.app/api/v1/getcat/'
      );
      if (data) {
        setCat(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    !cat && getCat();
  }, [cat]);
  const searchProd = (e) => {
    e.preventDefault();
    dispatch(loadAllProduct({ val: e.target.value }));
  };
  const filterProduct = (e) => {
    e.preventDefault();
    setHam(false);
    if (e.target.value == 'all') {
      dispatch(loadAllProduct({}));
    } else {
      dispatch(loadAllProduct({ cat: e.target.value }));
    }
  };
  return (
    <div className="navbar">
      <div className="title">
        <Link className="link" to="/">
          Shop with Us
        </Link>
      </div>
      <div className={ham ? 'none' : 'mobile-menu'}>
        <div className="ham-btn" onClick={() => setHam((prev) => !prev)}>
          <AiOutlineClose />
        </div>
        <div className="mob-flex-col">
          <div className="mob-search">
            <select onChange={(e) => filterProduct(e)}>
              <option value="all">All</option>
              {cat &&
                cat.map((ele) => {
                  return (
                    <option value={ele} key={ele}>
                      {ele}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mob-btns">
            {userInfo && userInfo._id ? (
              <div className="first-grp">
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  className="rounded-full"
                ></img>
                <Link
                  to="/updateprofiile"
                  className="mob-link"
                  onClick={() => setHam(false)}
                >
                  Update Profile
                </Link>
                <Link
                  to="/changepassword"
                  className="mob-link"
                  onClick={() => setHam(false)}
                >
                  Change Password
                </Link>
                <button className="mob-link-btn" onClick={signoutHandler}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="sec-grp">
                <Link
                  to="/login"
                  className="mob-link"
                  onClick={() => setHam(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mob-link"
                  onClick={() => setHam(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="category center">
        <select className="center" onChange={(e) => filterProduct(e)}>
          <option value="all">All</option>
          {cat &&
            cat.map((ele) => {
              return (
                <option value={ele} key={ele}>
                  {ele}
                </option>
              );
            })}
        </select>
      </div>
      <div className="searchbox">
        <input
          type="text"
          placeholder="Search for Products..."
          onChange={(e) => searchProd(e)}
        ></input>
      </div>
      <div className="cart center">
        <Link className="link" to="/cart">
          <FaShoppingCart></FaShoppingCart>({cart.length})
        </Link>
        <div className="for-ham" onClick={() => setHam(!ham)}>
          <GiHamburgerMenu />
        </div>
      </div>
      {userInfo && userInfo._id ? (
        <>
          <div className="login">
            <img
              src={userInfo.avatar}
              alt="avatar"
              onClick={() =>
                updates === 'none' ? setUpdates('show') : setUpdates('none')
              }
            ></img>
            <div className={updates}>
              <h3 className="updatepass">
                <Link
                  to="/updateprofile"
                  className="link"
                  id="red"
                  onClick={() =>
                    updates === 'none' ? setUpdates('show') : setUpdates('none')
                  }
                >
                  Update profile
                </Link>
              </h3>
              <h3 className="updatepass">
                <Link
                  to="/changepassword"
                  className="link"
                  id="red"
                  onClick={() =>
                    updates === 'none' ? setUpdates('show') : setUpdates('none')
                  }
                >
                  Change Password
                </Link>
              </h3>
            </div>
          </div>
          <div className="logout" onClick={signoutHandler}>
            <button>LogOut</button>
          </div>
          {userInfo.roles === 'admin' ? (
            <div className="logout">
              <button onClick={() => navigate('/admin')}>Admin</button>
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <div className="login">
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="logout">
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
