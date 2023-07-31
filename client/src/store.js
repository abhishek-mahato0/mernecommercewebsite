import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  createReviewreducer,
  loadproductreducer,
  loadsingleproductreducer,
} from './redux/reducers/productReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  addtocartReducer,
  shippingreducer,
} from './redux/reducers/cartReducers';
import { loginreducer } from './redux/reducers/loginReducer';
import { createOrderreducer } from './redux/reducers/orderReducer';
import { prodReducer } from './redux/reducers/AdminProdReducer';

const reducers = combineReducers({
  products: loadproductreducer,
  product: loadsingleproductreducer,
  cartItems: addtocartReducer,
  user: loginreducer,
  shipping: shippingreducer,
  orderInfo: createOrderreducer,
  review: createReviewreducer,
  adminproduct: prodReducer,
});
let initialState = {
  user: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {},
    success: localStorage.getItem('userInfo') ? true : false,
  },
  cartItems: {
    cart: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  shipping: {
    shipping: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
  orderInfo: {
    userOrder: {},
  },
  adminproduct: {
    adminprod: [],
  },
};
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
