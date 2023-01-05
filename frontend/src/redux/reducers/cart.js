import {
  CART_EDIT,
  CART_SEND_START,
  CART_SEND_SUCCESS,
  CART_SEND_ERROR,
  CART_POPULAR_ITEMS_EDIT,
  CART_COUPON_ADD,
  CART_COUPON_TOTAL,
  CART_COUPON_ERROR,
  CART_COUPON_CLEAR,
} from '../actionTypes';

const inititalState = {
  cartItems: localStorage.getItem('nurlan-online-store-cart')
    ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).cartItems
    : [],
  popularItems: [],
  total: localStorage.getItem('nurlan-online-store-cart')
    ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).total
    : 0,
  quantity: localStorage.getItem('nurlan-online-store-cart')
    ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).quantity
    : 0,
  isSending: false,
  totalWtihCoupon: null,
  couponName: null,
  couponDiscount: null,
  couponError: null,
  sendStatus: '',
  error: '',
};

const cartReducer = (state = inititalState, action) => {
  switch (action.type) {
    case CART_EDIT:
      return { ...state, ...action.payload, sendStatus: '' };
    case CART_SEND_START:
      return { ...state, isSending: true };
    case CART_SEND_SUCCESS:
      return {
        ...state,
        isSending: false,
        sendStatus: action.payload,
        cartItems: [],
        total: 0,
        quantity: 0,
      };
    case CART_SEND_ERROR:
      return { ...state, error: action.payload, isSending: false };
    case CART_POPULAR_ITEMS_EDIT:
      return { ...state, popularItems: action.payload };
    case CART_COUPON_ADD:
      return {
        ...state,
        isSending: false,
        couponName: action.payload.name,
        couponDiscount: action.payload.discount,
        couponError: null,
      };
    case CART_COUPON_ERROR:
      return { ...state, isSending: false, couponError: action.payload };
    case CART_COUPON_TOTAL:
      return { ...state, totalWtihCoupon: action.payload };
    case CART_COUPON_CLEAR:
      return {
        ...state,
        totalWtihCoupon: null,
        couponError: null,
        couponDiscount: null,
        couponName: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
