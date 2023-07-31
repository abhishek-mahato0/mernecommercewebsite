import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loadadminProd } from '../redux/actions/AdminProd';
import toast from 'react-hot-toast';
import './admin.css';
const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const adminproduct = useSelector((state) => state.adminproduct);
  const { adminprod } = adminproduct;
  useEffect(() => {
    dispatch(loadadminProd(userInfo._id));
  }, [dispatch]);

  const deleteProd = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://mernecommercewebsite-backend.vercel.app/api/v1/product/${id}`,
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        alert(data.message);
      }
      dispatch(loadadminProd(userInfo._id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateproduct = (item) => {
    navigate(`/updateproduct/${item._id}`);
  };

  return (
    <div className="admin-container">
      <Link to="/" className="link">
        <h3 className="red">Go Back</h3>
      </Link>
      <h1 className="ad-title">This is Admin Panel</h1>
      <div className="admin-nav">
        <Link to="/createproduct" className="link red">
          <h2>Create Products</h2>
        </Link>
        <Link to="/getusers" className="link red">
          <h2>See Users</h2>
        </Link>
        <Link to="/adminorders" className="link red">
          <h2>See Orders</h2>
        </Link>
      </div>
      <div className="admin-prod">
        <div className="ad-products">
          {adminprod &&
            adminprod.map((item) => {
              return (
                <div className="ad-product" key={item._id}>
                  <div className="primg center">
                    <img src={item.img} alt={item._id}></img>
                  </div>
                  <div className="ad-prod-title">{item.name}</div>
                  <div className="ad-flex">
                    <h3>Price:</h3>
                    <span>Rs. {item.price}</span>
                  </div>
                  <div className="ad-flex">
                    <h3>Rating:</h3>
                    <span className="star">{item.rating}</span>
                  </div>
                  <div className="ptitle centerv">
                    <h3>Stock:</h3>
                    <span>{item.stock}</span>
                  </div>
                  <div className="ptitle centerv">
                    <h3>Category:</h3>
                    <span>{item.category}</span>
                  </div>
                  <div className="ad-flex-desc">
                    <span>{item.desc}</span>
                  </div>

                  <div className="addtocart">
                    <button
                      className="viewmore"
                      onClick={() => updateproduct(item)}
                    >
                      Update Product
                    </button>
                    <button
                      className="viewmore"
                      onClick={() => deleteProd(item._id)}
                    >
                      Delete Product
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Admin;
