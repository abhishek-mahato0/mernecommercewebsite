import axios from 'axios';
import {
  ORDER_FAIL,
  ORDER_REQUEST,
  ORDER_SUCCESS,
} from '../constants/orderConstants';

export const createOrder =
  (shipping, cart, total, user) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        'https://mernecommercewebsite-backend.vercel.app/api/v1/order/my',
        {
          withCredentials: true, // Include cookies and other credentials with the request
        },
        {
          shippingInfo: shipping,
          cart: cart,
          total: total,
          user: user,
        }
      );
      dispatch({
        type: ORDER_REQUEST,
      });
      dispatch({
        type: ORDER_SUCCESS,
        payload: data.createdorder,
      });
    } catch (error) {
      dispatch({
        type: ORDER_FAIL,
        payload: error.message,
      });
    }
  };
