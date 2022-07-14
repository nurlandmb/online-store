import { SEARCH_EDIT } from '../actionTypes';


export const searchProduct = (products, cartProducts, query) => dispatch => {
  if(!query.trim()){
    dispatch(searchEdit({}))
  }else{
    const findItems = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase()));
    const cartProductsId = cartProducts.map(product => product._id);
    let filteredItems = findItems.filter(product => !cartProductsId.includes(product._id));

    dispatch(searchEdit(filteredItems))
  }
}

export const searchEdit = (products) => {
  return {
    type: SEARCH_EDIT, payload: products
  }
}