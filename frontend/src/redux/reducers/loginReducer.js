import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../constants/loginConstant';

export const loginreducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        success: true,
        loading: false,
        userInfo: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        success: true,
        loading: false,
        message: action.payload.message,
        userInfo: action.payload,
      };

    case LOGIN_FAIL:
      return {
        success: false,
        message: action.payload,
        userInfo: {},
      };
    case REGISTER_FAIL:
      return {
        success: false,
        message: action.payload,
        userInfo: {},
      };
    case LOG_OUT:
      return {
        message: 'Log out successfull',
        userInfo: {},
      };

    default:
      return state;
  }
};
