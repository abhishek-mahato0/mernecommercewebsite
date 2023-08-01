import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderAction';
import toast from 'react-hot-toast';
const Orderpage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartItems);
  const { shipping } = useSelector((state) => state.shipping);
  const { userInfo } = useSelector((state) => state.user);
  let shippingCharge = 60;
  let subtotal = cart.reduce((a, c) => a + c.qty * c.price, 0);
  if (subtotal > 5000) {
    shippingCharge = 100;
  }
  let total = subtotal + shippingCharge + (13 / 100) * subtotal;

  const placeOrderHandler = (e) => {
    e.preventDefault();
    if (shipping && cart && total) {
      dispatch(createOrder(shipping, cart, total));
      toast.success('Your Order has been confirmed');
      navigate('/myorder');
    }
  };
  return (
    <div className="placeorder">
      <div className="placeorder-main">
        <div className="all-details">
          <div className="shipping-details">
            <h2>Shipping</h2>
            <h3 className="flex">
              Name:<p className="p">{shipping.fullname}</p>
            </h3>
            <h3 className="flex">
              Address:
              <p className="p">
                {shipping.address},{shipping.city}
              </p>
            </h3>
            <h3 className="flex">
              Phone Number: <p className="p">{shipping.phone}</p>
            </h3>
          </div>

          <div className="carts-items">
            {cart.map((item) => {
              return (
                <div className="or-pcontainer" key={item._id}>
                  <div className="pimg">
                    <img src={item.img} alt={item.name}></img>
                  </div>
                  <div className="ptitle flex center">
                    <h3>Name:</h3>
                    <span>{item.name}</span>
                  </div>
                  <div className="singletotal flex centerv">
                    <h3>Total:</h3>
                    {item.qty} x {item.price} = Rs. {item.qty * item.price}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="or-totals">
          <h1>Order Summary</h1>
          <div className="one">
            <div className="prod">
              <h3>No Of Products: {cart.length}</h3>
            </div>
            <div className="payment">
              <h3>Total Item Price: Rs. {subtotal}</h3>
            </div>
            <div className="ship">
              <h3>Shipping Charge: {shippingCharge}</h3>
            </div>
            <div className="ship">
              <h3>Tax Charge (15%): Rs. {(13 / 100) * total}</h3>
            </div>
          </div>
          <div className="net">
            <h3>Total Payment: Rs. {total}</h3>
          </div>
          <div className="fbtn">
            <button onClick={placeOrderHandler} disabled={cart.length === 0}>
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;
