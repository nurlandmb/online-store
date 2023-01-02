import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cartHandler } from '../../redux/actions/cart';

function Product(props) {
  const [product, setProduct] = useState(props.product);
  const {
    name,
    description,
    image,
    category,
    price,
    priceWithDiscount,
    _id,
    quantity,
    shortInfo
  } = product;
  useEffect(() => {
    const cartProduct = props.cart.cartItems.find(
      (product) => product._id == _id
    );
    const cartIndex = props.cart.cartItems.indexOf(cartProduct);
    if (cartIndex !== -1) {
      setProduct(props.cart.cartItems[cartIndex]);
    } else {
      setProduct({ ...props.product, quantity: 0 });
    }
  }, [props.cart.cartItems]);
  return (
    <div className={'product' + ' ' + props.addClass}>
      <div className="product__img">
        <img src={image} alt={name} />
      </div>
      <div className="product__content">
        <div className="product__content-top">
          <h3 className="product__content-top__title">{name}</h3>
          <p className="product__content-top__info">{shortInfo || category}</p>
        </div>
        <p className="product__content-descr">{description}</p>
        <div className="product__content-bottom">
          <p className="product__content-bottom__price">
            {priceWithDiscount ? (
              <>
                {priceWithDiscount}₸ <span>{price}₸</span>
              </>
            ) : (
              price + '₸'
            )}{' '}
          </p>
          {!!quantity && quantity >= 1 ? (
            <div className="product__content-bottom__cart">
              <button
                className="product__content-bottom__cart-button"
                onClick={() =>
                  props.cartHandler(
                    product,
                    'minus',
                    props.cart.cartItems,
                    props.cart.couponDiscount
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <span className="product__content-bottom__cart-quantity">
                {quantity}
              </span>
              {/* <input
                className="product__content-bottom__cart-quantity"
                value={quantity}
                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
              /> */}
              <button
                className="product__content-bottom__cart-button plus"
                onClick={() =>
                  props.cartHandler(
                    product,
                    'plus',
                    props.cart.cartItems,
                    props.cart.couponDiscount
                  )
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="product__content-bottom__button"
              onClick={() =>
                props.cartHandler(
                  props.product,
                  'add',
                  props.cart.cartItems,
                  props.cart.couponDiscount
                )
              }
            >
              В корзину
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.42226 19.8203C7.84426 19.8203 8.18726 20.1633 8.18726 20.5853C8.18726 21.0073 7.84426 21.3493 7.42226 21.3493C7.00026 21.3493 6.65826 21.0073 6.65826 20.5853C6.65826 20.1633 7.00026 19.8203 7.42226 19.8203Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M18.6747 19.8203C19.0967 19.8203 19.4397 20.1633 19.4397 20.5853C19.4397 21.0073 19.0967 21.3493 18.6747 21.3493C18.2527 21.3493 17.9097 21.0073 17.9097 20.5853C17.9097 20.1633 18.2527 19.8203 18.6747 19.8203Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.74988 3.25L4.82988 3.61L5.79288 15.083C5.87088 16.018 6.65188 16.736 7.58988 16.736H18.5019C19.3979 16.736 20.1579 16.078 20.2869 15.19L21.2359 8.632C21.3529 7.823 20.7259 7.099 19.9089 7.099H5.16388"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1254 10.795H16.8984"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartHandler: (product, type, cart, discount) =>
      dispatch(cartHandler(product, type, cart, discount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
