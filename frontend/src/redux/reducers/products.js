import {
  PRODUCTS_FETCH,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_ERROR,
  CATEGORIES_FETCH,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_ERROR,
} from '../actionTypes';

const inititalState = {
  categories: [],
  isProductsLoading: true,
  isCategoriesLoading: true,
  products: [],
  errors: null,
};

const productsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case PRODUCTS_FETCH:
      return { ...state, isLoading: true };
    case PRODUCTS_FETCH_SUCCESS:
      return { ...state, isLoading: false, products: action.payload };
    case PRODUCTS_FETCH_ERROR:
      return { ...state, errors: action.payload };
    case CATEGORIES_FETCH:
      return { ...state, isCategoriesLoading: true };
    case CATEGORIES_FETCH_SUCCESS:
      return { ...state, categories: action.payload, isCategoriesLoading: false };
    case CATEGORIES_FETCH_ERROR:
      return { ...state, errors: action.payload, isCategoriesLoading: false };
    
    default:
      return state;
  }
};

export default productsReducer;
