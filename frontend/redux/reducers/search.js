import { SEARCH_EDIT } from '../actionTypes';

const initialState = {
  searchProducts: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_EDIT:
     return { ...state, searchProducts: action.payload }
  
    default:
      return state
  }
}
export default searchReducer
