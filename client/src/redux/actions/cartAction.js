import axios from 'axios';
import {
  ADD_CART_SUCCESS,
  DECREASE_QTY,
  REMOVE_CART_SUCCESS,
  SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addtocart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `https://mernecommercewebsite-backend.vercel.app/api/v1/product/${id}`,
    {
      withCredentials: true, // Include cookies and other credentials with the request
    }
  );
  dispatch({
    type: ADD_CART_SUCCESS,
    payload: {
      id: id,
      name: data.name,
      img: data.img,
      price: data.price,
      qty: qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cartItems.cart));
};

export const decresasefromcart = (id) => async (dispatch, getState) => {
  dispatch({
    type: DECREASE_QTY,
    payload: {
      decid: id,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cartItems.cart));
};

export const removefromcart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_SUCCESS,
    payload: {
      id: id,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cartItems.cart));
};

export const shippingAddress = (data) => async (dispatch, getState) => {
  dispatch({
    type: SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem(
    'shippingInfo',
    JSON.stringify(getState().shipping.shipping)
  );
};
