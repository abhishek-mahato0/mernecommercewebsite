import axios from 'axios';
import {
  ADMIN_LOAD_PROD_FAIL,
  ADMIN_LOAD_PROD_REQUEST,
  ADMIN_LOAD_PROD_SUCCESS,
  ADMIN_PROD_DEL_FAIL,
  ADMIN_PROD_DEL_REQUEST,
  ADMIN_PROD_DEL_SUCCESS,
  ADMIN_PROD_FAIL,
  ADMIN_PROD_REQUEST,
  ADMIN_PROD_SUCCESS,
} from '../constants/adminConstants';

export const createprod =
  (name, price, desc, stock, category, rating, img) => async (dispatch) => {
    dispatch({
      type: ADMIN_PROD_REQUEST,
    });
    try {
      const { data } = await axios.post(
        '/api/v1/products',
        {
          withCredentials: true, // Include cookies and other credentials with the request
        },
        {
          name,
          price,
          desc,
          stock,
          category,
          rating,
          img,
        }
      );
      dispatch({
        type: ADMIN_PROD_SUCCESS,
        payload: data.createdproduct,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_PROD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const loadadminProd = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_LOAD_PROD_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/v1/adminproducts/${id}`, {
      withCredentials: true, // Include cookies and other credentials with the request
    });
    dispatch({
      type: ADMIN_LOAD_PROD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOAD_PROD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteprod = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_PROD_DEL_REQUEST,
  });
  try {
    const { data } = await axios.delete(`/api/v1/product/${id}`, {
      withCredentials: true, // Include cookies and other credentials with the request
    });
    dispatch({
      type: ADMIN_PROD_DEL_SUCCESS,
      id: id,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PROD_DEL_FAIL,
      payload: error.response.data.message,
    });
  }
};
