import {
  DELETE_REVIEW_SUCCESS,
  LOAD_PRO_FAIL,
  LOAD_PRO_REQUEST,
  LOAD_PRO_SUCCESS,
  LOAD_SINGLE_FAIL,
  LOAD_SINGLE_REQUEST,
  LOAD_SINGLE_SUCCESS,
  WRITE_REVIEW_REQUEST,
  WRITE_REVIEW_SUCCESS,
} from '../constants/productConstants';

export const loadproductreducer = (state = { prod: [] }, action) => {
  switch (action.type) {
    case LOAD_PRO_REQUEST:
      return {
        loading: true,
      };
    case LOAD_PRO_SUCCESS:
      return {
        loading: false,
        prod: action.payload,
      };
    case LOAD_PRO_FAIL:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const loadsingleproductreducer = (state = { single: {} }, action) => {
  switch (action.type) {
    case LOAD_SINGLE_REQUEST:
      return {
        loading: true,
      };
    case LOAD_SINGLE_SUCCESS:
      return {
        loading: false,
        single: action.payload,
      };
    case LOAD_SINGLE_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const createReviewreducer = (state = {}, action) => {
  switch (action.type) {
    case WRITE_REVIEW_SUCCESS:
      return {
        loading: false,
        review: action.payload,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};
