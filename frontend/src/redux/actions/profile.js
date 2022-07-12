import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
} from '../actionTypes';
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
axios.defaults.baseURL = 'http://localhost:5000';

export const signInHandler = (user) => async (dispatch) => {
  dispatch(userSignIn());
  try {
    const { data } = await axios.post('/api/user/signin', { ...user })
    dispatch(userSignInSuccess(data));
    localStorage.setItem('nurlan-store-userInfo', JSON.stringify(data))
  } catch (err) {
    console.log(err);
    dispatch(userSignInError(err));
    
  }

}

export const userSignIn = () => {
  return { type: USER_SIGNIN }
}
export const userSignInSuccess = (data) => {
  return { type: USER_SIGNIN_SUCCESS, payload: data }
}
export const userSignInError = (err) => {
  return { type: USER_SIGNIN_ERROR, payload: err }
}