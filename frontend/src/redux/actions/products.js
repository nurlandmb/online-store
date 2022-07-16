import axios from 'axios';
import {
  PRODUCTS_FETCH,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_ERROR,
  CATEGORIES_FETCH,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_ERROR,
} from '../actionTypes';
import { toast } from 'react-toastify'
import { getError } from '../../utils';

// axios.defaults.baseURL = 'http://localhost:5000';

export const loadProducts = () => async (dispatch) => {
  dispatch(productsFetch());
  try {
    const { data } = await axios.get('/api/product');
    dispatch(productsFetchSuccess(data));
  } catch (err) {
    toast.error(getError(err))
    dispatch(productsFetchError(err));
    console.log(err);
  }
};

export const loadCategories = () => async (dispatch) => {
  dispatch(categoriesFetch());
  try {
    const { data } = await axios.get('/api/product/categories');
    dispatch(categoriesFetchSuccess(data));
  } catch (err) {
    toast.error(getError(err))
    dispatch(categoriesFetchError(err))
  }
};



export const categoriesFetch = () => {
  return {
    type: CATEGORIES_FETCH,
  };
};

export const categoriesFetchSuccess = (data) => {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload: data
  };
};

export const categoriesFetchError = (err) => {
  return {
    type: CATEGORIES_FETCH_ERROR,
    payload: err
  };
};

export const productsFetch = () => {
  return {
    type: PRODUCTS_FETCH,
  };
};

export const productsFetchSuccess = (products) => {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    payload: products,
  };
};

export const productsFetchError = (err) => {
  return {
    type: PRODUCTS_FETCH_ERROR,
    payload: err,
  };
};
