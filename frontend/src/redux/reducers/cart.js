import {
  CART_EDIT,
  CART_SEND_START,
  CART_SEND_SUCCESS,
  CART_SEND_ERROR,
} from '../actionTypes';

const inititalState = {
  cartItems: localStorage.getItem('nurlan-online-store-cart') ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).cartItems : [],
  popularItems: [],
  total: localStorage.getItem('nurlan-online-store-cart') ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).total : 0,
  quantity: localStorage.getItem('nurlan-online-store-cart') ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).quantity : 0,
  isSending: false,
  error: '',
};

const cartReducer = (state = inititalState, action) => {
  switch (action.type) {
    case CART_EDIT:
      return { ...state, ...action.payload };
    case CART_SEND_START:
      return { ...state, isSending: true };
    case CART_SEND_SUCCESS:
      return { ...state, isSending: false };
    case CART_SEND_ERROR:
      return { ...state, error: action.payload, isSending: false };
    default:
      return state;
  }
};

export default cartReducer;
