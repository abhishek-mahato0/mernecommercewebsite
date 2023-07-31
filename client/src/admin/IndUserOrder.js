import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const IndUserOrder = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const Getallorders = async () => {
    try {
      const { data } = await axios.get(`/api/v1/induser/orders/${id}`, {
        withCredentials: true, // Include cookies and other credentials with the request
      });
      if (data) {
        setOrders(data);
      } else {
        toast.error('Error occured');
        navigate('/admin');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/admin');
    }
  };

  useEffect(() => {
    Getallorders();
  }, []);

  return (
    <div className="total-orders">
      <Link className="link red" to="/getusers">
        Go Back
      </Link>
      <div className="allorders">
        {orders.length > 0 ? (
          <>
            {orders.map((ele) => {
              return (
                <div className="orderflex">
                  <div className="userInfo">
                    <h3>Shipping Info</h3>
                    <div className="info">
                      <h4>OrderId:{ele._id}</h4>
                      <h4>Name: {ele.shippingInfo.fullname}</h4>
                      <h4>City: {ele.shippingInfo.city}</h4>
                      <h4>Address: {ele.shippingInfo.address}</h4>
                      <h4>Phone: {ele.shippingInfo.phone}</h4>
                    </div>
                  </div>
                  <div className="grid">
                    {ele.cart.map((item) => {
                      return (
                        <div className="order-cart">
                          <div className="img">
                            <img src={item.img} alt="img"></img>
                          </div>
                          <div className="name">
                            <h4>Product Name: {item.name}</h4>
                            <h4>Price: {item.price}</h4>
                            <h4>Qty: {item.qty}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="order-status">
                    <h3>Total: {ele.total}</h3>
                    <h3>Status: {ele.status}</h3>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h1>No Orders Place yet</h1>
        )}
      </div>
    </div>
  );
};

export default IndUserOrder;
