import {
  CART_EDIT,
  CART_SEND_START,
  CART_SEND_SUCCESS,
  CART_SEND_ERROR,
} from '../actionTypes';

export const countQuantity = (cart) =>
  cart.reduce((acc, product) => (acc += product.quantity), 0);

export const countTotal = (cart) =>
  cart.reduce(
    (acc, product) =>
      (acc += product.priceWithDiscount
        ? product.priceWithDiscount * product.quantity
        : product.price * product.quantity),
    0
  );

export const cartHandler = (product, type, cart) => (dispatch) => {
  const cartProduct = cart.find((item) => item._id === product._id);
  const cartProductIndex = cart.indexOf(cartProduct);
  let newCart = [...cart];
  switch (type) {
    case 'add':
      newCart.push({ ...product, quantity: 1 });
      break;
    case 'delete':
      newCart = newCart.filter((item) => item._id !== product._id);
      break;
    case 'plus':
      newCart[cartProductIndex].quantity++;
      break;
    case 'minus':
      if (product.quantity == 1) {
        console.log('1');
        newCart = newCart.filter((item) => item._id !== product._id);
      } else {
        newCart[cartProductIndex].quantity--;
      }
      break;
    default:
      break;
  }
  const quantity = countQuantity(newCart);
  const total = countTotal(newCart);
  localStorage.setItem('nurlan-online-store-cart',JSON.stringify({ cartItems: newCart, quantity, total }))
  dispatch(cartEdit({ cartItems: newCart, quantity, total }));
};

export const cartSend = (cart, shipment) => (dispatch) => {
  const products = cart.cartItems.map((item) => {
    return {
      name: item.name,
      price: item.price,
      priceWithDiscount: item.priceWithDiscount,
      image: item.image,
      quantity: item.quantity,
    };
  });
  console.log(products, shipment);
};

export const cartSendStart = () => {
  return {
    type: CART_SEND_START,
  };
};
export const cartSendSuccess = () => {
  return {
    type: CART_SEND_SUCCESS,
  };
};
export const cartSendError = (err) => {
  return {
    type: CART_SEND_ERROR,
    payload: err,
  };
};

export const cartEdit = (cart) => {
  return {
    type: CART_EDIT,
    payload: cart,
  };
};
