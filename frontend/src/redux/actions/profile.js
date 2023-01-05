import {
  USER_SIGNIN,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_ERROR,
  USER_SIGNOUT
} from '../actionTypes';
import axios from 'axios'

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

export const signOut = () => dispatch => {
  localStorage.removeItem('nurlan-store-userInfo');
  console.log(window);
  return {
    type: USER_SIGNOUT
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