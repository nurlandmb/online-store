import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { cartHandler } from '../redux/actions/cart';
import { searchProduct } from '../redux/actions/search';

function Search(props) {
  const [query, setQuery] = useState('');
  const formSubmitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    setQuery('');
  }, [window.location.href]);

  useEffect(() => {
    props.searchProduct(
      props.products.products,
      props.cart.cartItems,
      query
    );
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
    props.cartHandler(product, 'add', props.cart.cartItems);
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
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.23914 10.3913C4.25354 6.15071 7.7029 2.72471 11.9435 2.73912C16.1841 2.75353 19.6101 6.20288 19.5957 10.4435V10.5304C19.5435 13.2869 18.0044 15.8348 16.1174 17.8261C15.0382 18.9467 13.8331 19.9388 12.5261 20.7826C12.1766 21.0849 11.6582 21.0849 11.3087 20.7826C9.3602 19.5143 7.65007 17.9131 6.25653 16.0522C5.01449 14.4294 4.3093 12.4597 4.23914 10.4174L4.23914 10.3913Z"
              stroke="#CFCFCF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11.9174"
              cy="10.5391"
              r="2.46087"
              stroke="#CFCFCF"
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
        />
        <button className="header__search-submit">
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
        </button>
      </form>
      {!!props.search.searchProducts.length && (
        <ul className={`header__search-list ${props.addClass}`}>
          {props.search.searchProducts.map((product, i) => (
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
                  <button className="header__search-list__item-button">
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
                  className="header__search-list__item-button cart"
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
      )}
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
    cartHandler: (product, type, cart) =>
      dispatch(cartHandler(product, type, cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
