import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './product.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Orders = () => {
  let count = 0;
  const [orders, setOrders] = useState([]);

  const getallorders = async () => {
    const { data } = await axios.get('/api/v1/orders', {
      withCredentials: true, // Include cookies and other credentials with the request
    });
    setOrders(data);
  };
  async function deleteOrder(id) {
    const { data } = axios.delete(`/api/v1/order/${id}`, {
      withCredentials: true, // Include cookies and other credentials with the request
    });

    toast.success('Order deleted');
  }
  async function updateOrder(status, id) {
    const { data } = axios.put(
      `/api/v1/order/update/${id}`,
      {
        withCredentials: true, // Include cookies and other credentials with the request
      },
      {
        status: status,
      }
    );

    toast.success('Order updated');
  }
  const updateorder = async (status, id) => {
    try {
      if (status == 'delete') {
        deleteOrder(id);
      } else {
        updateOrder(status, id);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const sold = orders.reduce(
    (prev, curr) => curr.status === 'completed' && prev + curr.total,
    0
  );
  const Total = orders.reduce((prev, curr) => prev + curr.total, 0);
  const procTotal = Total - sold;

  orders.map((ele) => (ele.status === 'processing' ? (count = count + 1) : ''));

  useEffect(() => {
    getallorders();
  }, [orders]);
  return (
    <>
      {orders.length > 0 ? (
        <>
          <Link to="/admin" className="link">
            <h3 className="red">Go Back</h3>
          </Link>
          <div className="adminorder-info">
            <h2>Total sold: {sold}</h2>
            <h2>Total Orders: {orders.length}</h2>
            <h2>Processing Orders: {count}</h2>
            <h2>Processing total: Rs {procTotal}</h2>
          </div>

          <div className="allorders">
            <h1 className="red">Processing Orders</h1>
            {orders.map((ele) => {
              return (
                <>
                  {ele.status === 'processing' && (
                    <div className="processing">
                      {
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
                      }
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
                        <div className="com-btn">
                          <button
                            className="mt-10"
                            onClick={() => updateorder('completed', ele._id)}
                          >
                            Click to complete order
                          </button>
                          <button
                            onClick={() => updateorder('delete', ele._id)}
                          >
                            Delete order
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}

            <div className="completed">
              <h1 className="green">Completed Orders</h1>

              {orders.map((ele) => {
                return (
                  <>
                    {ele.status !== 'processing' && (
                      <div className="processing">
                        {
                          <div className="userInfo">
                            <h3>Shipping Info</h3>
                            <div className="info">
                              <h4>Name: {ele.shippingInfo.fullname}</h4>
                              <h4>City: {ele.shippingInfo.city}</h4>
                              <h4>Address: {ele.shippingInfo.address}</h4>
                              <h4>Phone: {ele.shippingInfo.phone}</h4>
                            </div>
                          </div>
                        }
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
                          <div className="com-btn">
                            <button
                              onClick={() => updateorder('processing', ele._id)}
                              className="green"
                            >
                              Click to process order
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <h1>No Orders Yet</h1>
      )}
      <Toaster />
    </>
  );
};

export default Orders;
