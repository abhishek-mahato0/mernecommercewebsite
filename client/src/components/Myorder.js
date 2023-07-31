import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './css/order.css';
const Myorder = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const orders = async () => {
      const { data } = await axios.get('/api/v1/order/my', {
        withCredentials: true, // Include cookies and other credentials with the request
      });
      setOrder(data);
    };
    orders();
  });
  return (
    <div className="myorderpage">
      {order && (
        <>
          {order.length === 0 ? (
            <h1>No Orders Place till now</h1>
          ) : (
            order.map((item) => {
              return (
                <div className="order-main" key={item._id}>
                  <div className="order-first">
                    {item.cart.map((it) => {
                      return (
                        <div className="order-single">
                          <div className="order-container">
                            <div className="order-image">
                              <img src={it.img} alt={it.name}></img>
                            </div>
                            <div className="order-desc">
                              <div className="name">
                                <h3>{it.name}</h3>
                              </div>
                              <div className="order-price">
                                <h3>Price:${it.price}</h3>
                              </div>
                              <div className="order-cat centerv">
                                <h3>
                                  Quantity:
                                  {it.qty}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="order-info">
                    <h3 className="red">Order Info And Status</h3>
                    <h4>Name: {item.shippingInfo.fullname}</h4>
                    <h4>
                      Address: {item.shippingInfo.address},
                      {item.shippingInfo.city}
                    </h4>
                    <h4>Phone: {item.shippingInfo.phone}</h4>
                    <h4>Date: {item.date.split('GMT+0545')}</h4>
                    <h4>Status: "{item.status}"</h4>
                    <h4>Total: {item.total}</h4>
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
};

export default Myorder;
