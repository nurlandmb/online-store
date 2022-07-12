import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
} from '../actionTypes';

const inititalState = {
  userInfo: localStorage.getItem('nurlan-store-userInfo')
  ? JSON.parse(localStorage.getItem('nurlan-store-userInfo'))
  : {},
  shippingInfo: localStorage.getItem('nurlan-store-shippingInfo')
  ? JSON.parse(localStorage.getItem('nurlan-store-shippingInfo'))
  : {},
  isLoading: false,
  error: '',
  isLoggedIn: localStorage.getItem('nurlan-store-userInfo')
  ? true
  : false,
};

const foodsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return { ...state, isLoading: true }
    case USER_SIGNIN_SUCCESS:
      return { ...state, userInfo: action.payload, isLoading: false, isLoggedIn: true }
    case USER_SIGNIN_ERROR:
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state;
  }
};

export default foodsReducer;
