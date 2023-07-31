import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addtocart, removefromcart } from '../redux/actions/cartAction';
import './css/cart.css';
const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);
  const { cart } = cartItems;
  const dispatch = useDispatch();
  const addtocartHandler = async (id, qty) => {
    dispatch(addtocart(id, qty));
  };
  const decreasecartitem = (id, qty) => {
    if (qty >= 1) {
      dispatch(addtocart(id, qty));
    } else {
      dispatch(removefromcart(id));
    }
  };
  const clearCartitem = (id) => {
    dispatch(removefromcart(id));
  };
  let shippingCharge = 60;
  let total = cart.reduce((a, c) => a + c.qty * c.price, 0);
  if (total > 5000) {
    shippingCharge = 100;
  }
  let subtotal = total + shippingCharge + (13 / 100) * total;

  const proceedHandler = () => {
    cart.length > 0 ? navigate('/shipping') : navigate('/cart');
  };
  return (
    <>
      <div className="orders">
        <h2>
          <Link to="/myorder">My Orders Summery</Link>
        </h2>
      </div>
      <div className="mcontainer">
        <div className="carts">
          {cart.length === 0 ? (
            <h1> Your Cart Is Empty </h1>
          ) : (
            cart.map((item) => {
              return (
                <div className="ccontainer" key={item._id}>
                  <div className="img">
                    <img src={item.img} alt={item.title}></img>
                  </div>
                  <div className="cart-desc">
                    <div className="c-title">{item.name}</div>
                    <div className="c-flex">
                      <h3>Price:</h3>
                      <span>Rs. {item.price}</span>
                    </div>
                    <div className="c-flex quantity">
                      <h3>Quantity:</h3>
                      <div className="qty">
                        <button
                          className="increase"
                          onClick={() =>
                            addtocartHandler(item.id, (item.qty = item.qty + 1))
                          }
                        >
                          +
                        </button>
                        <span>{item.qty}</span>
                        <button
                          className="decrease"
                          onClick={() =>
                            decreasecartitem(item.id, (item.qty = item.qty - 1))
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="c-flex">
                      <h3>Total:</h3>Rs. {item.qty * item.price}
                    </div>
                    <div className="c-flex r-btn">
                      <button onClick={() => clearCartitem(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart.length === 0 ? (
          ''
        ) : (
          <div className="alltotal">
            <div className="one">
              <div className="prod">
                <h3>No Of Products: {cartItems.length}</h3>
              </div>
              <div className="payment">
                <h3>Total: {total}</h3>
              </div>
              <div className="ship">
                <h3>Shipping Charge: Rs.{shippingCharge}</h3>
              </div>
              <div className="ship">
                <h3>Tax Amount: Rs.{(13 / 100) * total}</h3>
              </div>
            </div>
            <div className="net">
              <h3>Net Payment: Rs. {subtotal}</h3>
            </div>
            <div className="pbtns">
              <button
                onClick={proceedHandler}
                disabled={cartItems.length === 0}
              >
                Proceed To Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
