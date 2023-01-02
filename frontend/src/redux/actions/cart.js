import {
  CART_EDIT,
  CART_SEND_START,
  CART_SEND_SUCCESS,
  CART_SEND_ERROR,
  CART_POPULAR_ITEMS_EDIT,
  CART_COUPON_ADD,
  CART_COUPON_ERROR,
  CART_COUPON_TOTAL,
  CART_COUPON_CLEAR,
} from '../actionTypes';
import axios from 'axios';

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

export const getPopularItems =
  (allProducts, cartProducts) => async (dispatch) => {
    const cartProductsId = cartProducts.map((product) => product._id);
    let popularItems = [];
    if (allProducts.length) {
      popularItems = allProducts
        .filter((item) => item.isPopular)
        .filter((item) => !cartProductsId.includes(item._id));
      dispatch(cartPopularItemsEdit(popularItems));
    } else {
      try {
        const { data } = await axios.get('/api/product/popular');
        popularItems = data.filter(
          (item) => !cartProductsId.includes(item._id)
        );
        dispatch(cartPopularItemsEdit(popularItems));
      } catch (err) {
        console.log(err);
      }
    }
  };
export const cartPopularItemsEdit = (products) => {
  return {
    type: CART_POPULAR_ITEMS_EDIT,
    payload: products,
  };
};

export const cartHandler = (product, type, cart, discount = 0) => (dispatch) => {
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
  if(discount){
    dispatch(countTotalWithCoupon(total, discount));
  }
  localStorage.setItem(
    'nurlan-online-store-cart',
    JSON.stringify({ cartItems: newCart, quantity, total })
  );
  dispatch(cartEdit({ cartItems: newCart, quantity, total }));
};

export const cartSend = (cart, shipment) => async (dispatch) => {
  const products = cart.cartItems.map((item) => {
    return {
      name: item.name,
      price: item.price,
      priceWithDiscount: item.priceWithDiscount,
      image: item.image,
      quantity: item.quantity,
      shortInfo: item.shortInfo,
    };
  });
  const commentProducts = products.reduce(
    (acc, item, i) =>
      (acc += ` ${i + 1}. ${item.name} - ${item.quantity}; <br>`),
    'Выбранные товары: <br>'
  );
  const commentUser = `Коментарий от покупателя: ${shipment.comment} <br>`;
  let commentTotal = cart.couponDiscount
    ? `Цена с купоном: ${cart.totalWtihCoupon} <br>`
    : `Полная цена: ${cart.total} <br>`;
  let usedCoupon = '';
  if (cart.couponDiscount) {
    usedCoupon = `Использованный купон: ${cart.couponName} <br>`;
  }
  const comment = commentProducts + commentUser + commentTotal + usedCoupon;
  console.log(cart);
  console.log(comment);
  // try {
  //   dispatch(cartSendStart());
  //   const userLocation = shipment.coords.latitude
  //     ? `https://2gis.kz/geo/${shipment.coords.longitude},${shipment.coords.latitude}`
  //     : shipment.address;
  //   const res = await axios.post(
  //     `${process.env.REACT_APP_BITRIX_API}?FIELDS[TITLE]=Новый лид&FIELDS[NAME]=${shipment.name}&FIELDS[ADDRESS]=${userLocation}&FIELDS[COMMENTS]=${comment}&FIELDS[OPPORTUNITY]=${cart.totalWtihCoupon || cart.total}&FIELDS[CURRENCY_ID]=KZT`
  //   );
  //   localStorage.setItem('nurlan-store-shippingInfo', JSON.stringify(shipment));
  //   localStorage.removeItem('nurlan-online-store-cart');
  //   dispatch(cartSendSuccess(res.status));
  // } catch (err) {
  //   dispatch(cartSendError(err));
  //   console.log(err);
  // }
};

export const getCoupon = (coupon) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/coupon/${coupon}`);
    dispatch(cartCouponAdd(data));
  } catch (error) {
    dispatch(cartCouponError(error));
  }
};

export const countTotalWithCoupon = (total, discount) => (dispatch) => {
  let finalPrice = Math.round(total - (total * discount) / 100);
  dispatch(cartCouponTotal(finalPrice));
};

export const cartCouponAdd = (coupon) => {
  return {
    type: CART_COUPON_ADD,
    payload: coupon,
  };
};

export const cartCouponClear = () => {
  return {
    type: CART_COUPON_CLEAR,
  };
};
export const cartCouponError = (err) => {
  return {
    type: CART_COUPON_ERROR,
    payload: err,
  };
};
export const cartCouponTotal = (totalPrice) => {
  return {
    type: CART_COUPON_TOTAL,
    payload: totalPrice,
  };
};

export const cartSendStart = () => {
  return {
    type: CART_SEND_START,
  };
};
export const cartSendSuccess = (status) => {
  return {
    type: CART_SEND_SUCCESS,
    payload: status,
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
