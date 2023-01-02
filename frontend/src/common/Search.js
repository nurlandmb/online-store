import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cartHandler } from '../redux/actions/cart';
import { searchProduct } from '../redux/actions/search';
import { ReactComponent as FoodSvg } from '../img/food.svg';
import { productEdit } from '../redux/actions/adminProduct';
function Search(props) {
  const [query, setQuery] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  const productEditHandler = (product) => {
    setQuery('');
    props.productEdit(product, 'edit');
  };
  useEffect(() => {
    setQuery('');
  }, [window.location.href]);

  useEffect(() => {
    props.searchProduct(props.products.products, props.cart.cartItems, query);
  }, [query]);

  const addToCart = (e, product) => {
    const cartButtons = document.querySelectorAll(
      `#header-search${product._id}`
    );
    cartButtons.forEach((btn) => {
      btn.classList.add('clicked');
      btn.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      `;
    });
    props.cartHandler(
      product,
      'add',
      props.cart.cartItems,
      props.cart.couponDiscount
    );
    setSearchActive(false);
  };
  return (
    <div className="header__search-wrapper">
      <form
        className={`header__search ${props.addClass}`}
        onSubmit={formSubmitHandler}
      >
        <label className="header__search-label">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11.7666"
              cy="11.7666"
              r="8.98856"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.0183 18.4851L21.5423 22"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
        <input
          className="header__search-input"
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
        />
        <button
          className={
            query ? 'active header__search-clear' : 'header__search-clear'
          }
          type="button"
          onClick={() => setQuery('')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </form>

      <ul
        className={props.search.searchProducts
          .length && searchActive ? `header__search-list ${props.addClass} active` : `header__search-list ${props.addClass}`}
      >
        {props.search.searchProducts.length &&
          props.search.searchProducts.map((product, i) => (
            <li
              className={`header__search-list__item ${i === 0 && 'first'} ${
                i + 1 === props.search.searchProducts.length && 'last'
              }`}
              key={product._id}
            >
              <div className="header__search-list__item-wrapper">
                <img
                  className="header__search-list__item-img"
                  src={product.image}
                  alt={product.name}
                />
                <h3 className="header__search-list__item-title">
                  {product.name}
                </h3>
              </div>
              <div className="header__search-list__item-wrapper">
                {props.isAdmin && (
                  <button
                    className="header__search-list__item-button"
                    onClick={() => productEditHandler(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                )}
                <button
                  className={'header__search-list__item-button cart'}
                  onClick={(e) => addToCart(e, product)}
                  id={`header-search${product._id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    cart: state.cart,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchProduct: (products, cartProducts, query) =>
      dispatch(searchProduct(products, cartProducts, query)),
    cartHandler: (product, type, cart, discount) =>
      dispatch(cartHandler(product, type, cart, discount)),
    productEdit: (product, type) => dispatch(productEdit(product, type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
