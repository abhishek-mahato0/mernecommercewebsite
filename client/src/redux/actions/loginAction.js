import axios from 'axios';
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../constants/loginConstant';

export const login = (info) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      'https://mernecommercewebsite-backend.vercel.app/api/v1/login',
      info
    );
    if (data) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const register = (info) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post(
      'https://mernecommercewebsite-backend.vercel.app/api/v1/register',
      info
    );
    if (data) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.post(
      'https://mernecommercewebsite-backend.vercel.app/api/v1/logout'
    );
    if (data) {
      dispatch({
        type: LOG_OUT,
        payload: '',
      });
      localStorage.removeItem('userInfo');
    }
  } catch (error) {
    dispatch({
      type: LOG_OUT,
      payload: '',
    });
  }
};
