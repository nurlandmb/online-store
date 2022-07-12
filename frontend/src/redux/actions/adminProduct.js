import axios from 'axios';
import { toast } from 'react-toastify';
import {
  PRODUCT_EDIT,
  PRODUCT_EDIT_CLOSE,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_START,
  PRODUCT_EDIT_ERROR,
} from '../actionTypes';

export const editExistingProduct = (product, user) => async (dispatch) => {
  if(!product.discount) product.priceWithDiscount = null;
  try {
    dispatch(productEditStart());
    const req = await axios.post(`/api/product/edit/${product._id}`, product, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    toast.success('Product edited successfully');
    dispatch(productEditSuccess());
  } catch (err) {
    dispatch(productEditError(err));
  }
};

export const productDeleteHandler = (product, user) => async (dispatch) => {
  try {
    dispatch(productEditStart());
    await axios.delete(`/api/product/${product._id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    toast.success('product deleted successfully');
    dispatch(productEditSuccess());

  } catch (err) {
    toast.error(err);
    dispatch(productEditError(err));

  }
};

export const createProduct = (product, user) => async (dispatch) => {
  try {
    dispatch(productEditStart());

    const req = await axios.post('/api/product/create/', product, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    toast.success('Product created successfully');

    dispatch(productEditSuccess());
  } catch (err) {
    dispatch(productEditError(err));
  }
};

export const uploadFileHandler = (e, user) => async (dispatch) => {
  const file = e.target.files[0];
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  try {
    const { data } = await axios.post('/api/upload', bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${user.token}`,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};

export const productEdit = (product, type = 'create') => {
  return {
    type: PRODUCT_EDIT,
    payload: { ...product, type },
  };
};

export const productEditStart = () => {
  return {
    type: PRODUCT_EDIT_START,
  };
};

export const productEditClose = () => {
  return {
    type: PRODUCT_EDIT_CLOSE,
  };
};

export const productEditSuccess = () => {
  return {
    type: PRODUCT_EDIT_SUCCESS,
  };
};
export const productEditError = (err) => {
  return {
    type: PRODUCT_EDIT_ERROR,
    payload: err,
  };
};
