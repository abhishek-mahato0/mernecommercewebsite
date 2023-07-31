import {
  DELETE_REVIEW_SUCCESS,
  LOAD_PRO_FAIL,
  LOAD_PRO_REQUEST,
  LOAD_PRO_SUCCESS,
  LOAD_SINGLE_FAIL,
  LOAD_SINGLE_REQUEST,
  LOAD_SINGLE_SUCCESS,
  WRITE_REVIEW_FAIL,
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
} from '../constants/productConstants';
import axios from 'axios';

export const loadAllProduct = (filt) => async (dispatch) => {
  dispatch({
    type: LOAD_PRO_REQUEST,
  });
  try {
    const { cat, val } = filt;
    if (cat && val) {
      const { data } = await axios.get(
        `https://mernecommercewebsite-backend.vercel.app/api/v1/products?cat=${cat}&&val=${val}`,
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        dispatch({
          type: LOAD_PRO_SUCCESS,
          payload: data,
        });
      }
    } else if (cat && !val) {
      const { data } = await axios.get(
        `https://mernecommercewebsite-backend.vercel.app/api/v1/products?cat=${cat}`,
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        dispatch({
          type: LOAD_PRO_SUCCESS,
          payload: data,
        });
      }
    } else if (val && !cat) {
      console.log(val);
      const { data } = await axios.get(
        `https://mernecommercewebsite-backend.vercel.app/api/v1/products?val=${val}`,
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        dispatch({
          type: LOAD_PRO_SUCCESS,
          payload: data,
        });
      }
    } else {
      const { data } = await axios.get(
        'https://mernecommercewebsite-backend.vercel.app/api/v1/products',
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        dispatch({
          type: LOAD_PRO_SUCCESS,
          payload: data,
        });
      }
    }
  } catch (error) {
    dispatch({
      type: LOAD_PRO_FAIL,
      payload: error.data.response.message,
    });
  }
};

export const loadsingleProduct = (id) => async (dispatch) => {
  dispatch({
    type: LOAD_SINGLE_REQUEST,
  });
  try {
    const { data } = await axios.get(
      `https://mernecommercewebsite-backend.vercel.app/api/v1/product/${id}`,
      {
        withCredentials: true, // Include cookies and other credentials with the request
      }
    );

    dispatch({
      type: LOAD_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_SINGLE_FAIL,
      payload: error.data.response.message,
    });
  }
};

export const createReview =
  (id, userrating, usercomment) => async (dispatch) => {
    dispatch({
      type: WRITE_REVIEW_REQUEST,
    });
    try {
      const { data } = await axios.put(
        `https://mernecommercewebsite-backend.vercel.app/api/v1/review/${id}`,
        {
          withCredentials: true, // Include cookies and other credentials with the request
        },
        {
          rating: userrating,
          comment: usercomment,
        }
      );
      dispatch({
        type: WRITE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WRITE_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteReview = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `https://mernecommercewebsite-backend.vercel.app/api/v1/delreview/${id}`,
      {
        withCredentials: true, // Include cookies and other credentials with the request
      }
    );
    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WRITE_REVIEW_FAIL,
      payload: error.data.response.message,
    });
  }
};
