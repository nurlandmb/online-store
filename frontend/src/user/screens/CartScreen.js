import React, { useEffect, useState } from 'react';
import Product from '../../common/Product';
import food from '../../img/food.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cartHandler, getPopularItems } from '../../redux/actions/cart';
import OrderPopup from '../components/OrderPopup';
import Coupon from '../components/Coupon';

function CartScreen(props) {
  const [popupActive, setPopupActive] = useState(false);

  useEffect(() => {
    props.getPopularItems(props.products.products, props.cart.cartItems);
  }, []);

  return props.cart.quantity ? (
    <>
      <OrderPopup
        popupActive={popupActive}
        closePopup={() => setPopupActive(false)}
      />

      <section className="cart">
        <div className="container">
          <h1 className="section-title cart__title">
            Корзина
            <span>
              (в корзине {props.cart.quantity} товар
              {props.cart.quantity !== 1
                ? props.cart.quantity < 5
                  ? 'а'
                  : 'ов'
                : ''}
              )
            </span>
          </h1>
          <Coupon />
          <div className="cart__total">
            <div className="cart__total-content">
              <h3 className="cart__total-content__title">
                <span>Итого: </span>
                {props.cart.totalWtihCoupon || props.cart.total} ₸
              </h3>
              <p className="cart__total-content__subtitle">
                {/* До бесплатной доставки не хватет:
                <span>100 ₽</span> */}
                Доставка бесплатная!
              </p>
            </div>
            <button
              className="cart__total-button"
              onClick={() => setPopupActive(true)}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </section>
      <section className="cart-products">
        <div className="container">
          <h2 className="cart-products__title">Выбранные товары</h2>
          <ul className="cart-products__list">
            {props.cart.cartItems.map((product, i) => (
              <li
                className={`cart-products__list-item ${i === 0 && 'first'} ${
                  i + 1 === props.cart.cartItems.length && 'last'
                }`}
                key={product._id}
              >
                <div className="cart-products__list-item__wrapper">
                  <img
                    className="cart-products__list-item__img"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="cart-products__list-item__content">
                    <h3 className="cart-products__list-item__content-title">
                      {product.name}
                    </h3>
                    <p className="cart-products__list-item__content-descr">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="cart-products__list-item__wrapper action">
                  <div className="cart-products__list-item__action">
                    <button
                      className="cart-products__list-item__button minus"
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
                        width="18"
                        height="4"
                        viewBox="0 0 12 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 1.89993C0 1.07151 0.671573 0.399933 1.5 0.399933H10.5C11.3284 0.399933 12 1.07151 12 1.89993C12 2.72836 11.3284 3.39993 10.5 3.39993H1.5C0.671573 3.39993 0 2.72836 0 1.89993Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    <span
                      className="cart-products__list-item__quantity"
                      children={product.quantity}
                    />
                    <button
                      className="cart-products__list-item__button"
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
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_69_478)">
                          <path
                            d="M10.2771 4.69675H7.34632V1.766C7.34632 1.04596 6.74157 0.456581 6.02127 0.456581C5.30097 0.456581 4.69622 1.04596 4.69622 1.766V4.69675H1.76547C1.04544 4.69675 0.456055 5.3015 0.456055 6.0218C0.456055 6.7421 1.04544 7.34685 1.76547 7.34685H4.69622V10.2776C4.69622 10.9976 5.30097 11.587 6.02127 11.587C6.74157 11.587 7.34632 10.9976 7.34632 10.2776V7.34685H10.2771C10.9971 7.34685 11.5865 6.7421 11.5865 6.0218C11.5865 5.3015 10.9971 4.69675 10.2771 4.69675Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_69_478">
                            <rect
                              width="11.1304"
                              height="11.1304"
                              fill="white"
                              transform="translate(0.456055 0.456581)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                  <div className="cart-products__list-item__info">
                    <p className="cart-products__list-item__price">
                      {product.priceWithDiscount ? (
                        <>
                          {product.priceWithDiscount + '₸'}{' '}
                          <span>{product.price}₸</span>
                        </>
                      ) : (
                        product.price + '₸'
                      )}
                    </p>
                    <button
                      className="cart-products__list-item__button"
                      onClick={() =>
                        props.cartHandler(
                          product,
                          'delete',
                          props.cart.cartItems,
                          props.cart.couponDiscount
                        )
                      }
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_69_468)">
                          <path
                            d="M12.6035 10.1437L10.5311 8.07133L12.6035 5.99898C13.1126 5.48984 13.1018 4.64546 12.5924 4.13613C12.0831 3.6268 11.2387 3.61593 10.7296 4.12508L8.65723 6.19743L6.58487 4.12508C6.07573 3.61593 5.23135 3.6268 4.72202 4.13613C4.2127 4.64546 4.20183 5.48984 4.71097 5.99898L6.78332 8.07133L4.71097 10.1437C4.20183 10.6528 4.2127 11.4972 4.72202 12.0065C5.23135 12.5159 6.07573 12.5267 6.58487 12.0176L8.65723 9.94524L10.7296 12.0176C11.2387 12.5267 12.0831 12.5159 12.5924 12.0065C13.1018 11.4972 13.1126 10.6528 12.6035 10.1437Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_69_468">
                            <rect
                              width="11.1304"
                              height="11.1304"
                              fill="white"
                              transform="translate(8.65723 0.200928) rotate(45)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {!!props.cart.popularItems && (
        <section className="cart-add">
          <div className="container">
            <h2 className="cart-add__title">ДОБАВИТЬ К ЗАКАЗУ</h2>
            <ul className="cart-add__list">
              {props.cart.popularItems.map((product) => (
                <Product
                  addClass="cart-add__list-item"
                  key={product._id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  ) : (
    <>
      <OrderPopup
        popupActive={popupActive}
        closePopup={() => setPopupActive(false)}
      />
      <section className="cart-empty">
        <div className="container">
          <div className="cart-empty__wrapper">
            <svg
              className="cart-empty__svg"
              viewBox="0 0 76 89"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M52.9988 58.1078C54.6262 64.9616 50.0125 68.4052 46.2377 68.7379C43.4359 68.9874 41.0703 68.0226 39.292 65.8267C37.5304 63.6641 37.1948 61.1854 37.8827 58.4239H29.4271C30.1149 61.5014 29.662 64.2796 27.3635 66.5254C25.7865 68.0725 23.8403 68.8377 21.5922 68.7545C18.9582 68.6713 16.8778 67.5069 15.3344 65.4274C13.7741 63.3313 13.8076 60.9358 14.1767 58.4239C13.2037 58.2409 12.2809 58.3573 11.375 58.3241C9.26107 58.2575 7.98601 56.1614 8.99264 54.3648C9.49595 53.4831 10.2677 53.0506 11.3414 53.0506C18.2703 53.0672 25.216 53.0506 32.145 53.0506H50.1803C51.1869 53.0506 52.0593 52.7844 52.6968 51.9693C53.2505 51.254 53.5189 50.4721 53.1498 49.5738C52.7304 48.559 51.9922 47.9934 50.8849 47.8603C47.4288 47.4112 43.9728 46.9953 40.5335 46.4629C38.1176 46.097 35.6681 45.8641 33.2355 45.5314C30.8363 45.2153 28.4372 44.8493 26.0381 44.5332C23.5216 44.2005 21.005 43.9011 18.4884 43.5684C15.9216 43.2356 13.3547 42.9029 10.7878 42.5203C9.73083 42.354 9.05974 41.6386 8.75776 40.6405C6.99617 34.868 5.26813 29.0622 3.52332 23.2564C2.66769 20.3951 1.76173 17.5504 0.85577 14.7057C0.352459 13.1586 1.40941 11.4286 3.03679 11.2788C3.59043 11.2289 4.16085 11.2289 4.71449 11.2289C22.4478 11.2289 40.1644 11.2123 57.8977 11.2456C58.7198 11.2456 59.1392 11.0293 59.4412 10.2474C61.3035 5.30668 64.8937 2.27902 70.0275 0.998084C70.9335 0.765187 71.8394 0.698645 72.7622 0.698645C74.3224 0.682009 75.6814 1.81322 75.7988 3.22724C75.8995 4.59135 74.6748 5.9222 73.0642 6.03864C71.8227 6.12182 70.6315 6.25491 69.4739 6.75397C66.7057 7.96836 65.028 10.0811 64.122 12.8925C62.7631 17.0846 61.3873 21.2601 60.0116 25.4357C58.5185 30.0104 57.0085 34.5852 55.5154 39.16C55.1631 40.2413 54.8107 41.3226 54.4249 42.3872C54.2068 42.9861 54.3074 43.3854 54.8946 43.768C57.6628 45.5813 58.9211 48.1764 58.5352 51.437C58.1661 54.4314 56.4717 56.4942 53.7035 57.7252C53.4686 57.8416 53.2337 57.9747 52.9988 58.1078ZM46.4054 16.5024C44.6774 16.5024 43.0165 16.519 41.3388 16.4857C40.6677 16.4691 40.4328 16.6854 40.3825 17.3841C40.2986 19.1474 40.1141 20.9108 39.9463 22.6742C39.7282 25.1196 39.443 27.565 39.2584 30.0271C39.0403 32.9549 38.7719 35.8661 38.5202 38.794C38.3189 40.9732 38.1679 41.0065 40.3321 41.1562C41.0368 41.2061 41.2717 41.0065 41.4059 40.3743C41.9763 37.6794 42.597 34.9844 43.1842 32.2728C44.0902 28.1472 45.0129 24.0216 45.8518 19.8794C46.0867 18.8314 46.4558 17.8 46.4054 16.5024ZM34.9971 16.6687C34.6951 16.4691 34.3595 16.5024 34.024 16.5024C32.816 16.5024 31.6249 16.5523 30.4169 16.4857C29.5781 16.4358 29.2761 16.702 29.3264 17.5671C29.5445 20.7112 29.4774 23.8719 29.6955 27.0327C29.9639 30.6758 29.8633 34.3357 30.1485 37.9955C30.2995 39.8753 30.2491 39.842 32.0778 40.0749C32.8496 40.1747 33.1012 39.8753 33.1851 39.1766C33.4536 36.8143 33.6213 34.4355 33.8059 32.0732C34.0911 28.3968 34.5105 24.7536 34.7118 21.0771C34.8125 19.5966 35.2319 18.1493 34.9971 16.6687ZM54.6262 16.519C54.6262 16.5024 54.6262 16.5024 54.6262 16.519C54.2403 16.5024 53.8377 16.5024 53.4518 16.5024C51.9754 16.5024 51.9922 16.5357 51.6902 17.9663C50.8849 21.8923 50.0461 25.8016 49.1904 29.7276C48.3684 33.5371 47.5127 37.33 46.6739 41.1396C46.5732 41.6054 46.6571 41.9547 47.2275 42.0379C47.5295 42.0712 47.8147 42.1876 48.1335 42.2375C48.6032 42.3041 48.922 42.2043 49.073 41.6553C49.2911 40.8568 49.5931 40.0749 49.8447 39.293C51.0862 35.5334 52.3277 31.7738 53.5525 28.0308C54.7436 24.4375 55.918 20.8442 57.1092 17.2343C57.2602 16.7852 57.126 16.519 56.6227 16.519C55.9684 16.5024 55.2973 16.519 54.6262 16.519ZM17.9012 16.519C18.7904 21.1936 19.6461 25.6685 20.5185 30.1435C21.0218 32.7386 21.5083 35.3504 22.0116 37.9456C22.0787 38.2949 22.0955 38.6942 22.582 38.7607C23.2867 38.8605 24.0081 38.977 24.6959 39.0768C24.9476 38.7274 24.8805 38.3781 24.8637 38.062C24.5114 34.3689 24.6456 30.6592 24.3604 26.9495C24.1088 23.7555 24.2597 20.5282 23.9745 17.3342C23.941 16.9848 23.9913 16.5357 23.4712 16.5357C21.6593 16.5024 19.8474 16.519 17.9012 16.519ZM16.4752 37.9955C16.3913 36.3985 15.9887 35.0676 15.737 33.7201C15.284 31.2248 14.831 28.7128 14.3613 26.2175C13.8748 23.639 13.3379 21.0771 12.9017 18.482C12.5829 16.5689 12.5829 16.5024 10.6536 16.5024H8.13701C7.83502 16.5024 7.51626 16.4525 7.21427 16.7353C7.36526 17.7667 7.75113 18.7814 8.0699 19.7962C9.78116 25.4856 11.5092 31.1749 13.2205 36.8809C13.3043 37.1637 13.3882 37.4798 13.6734 37.5297C14.5458 37.7127 15.4518 37.8291 16.4752 37.9955ZM21.8103 58.3407C20.3675 58.3573 19.2602 59.4386 19.2937 60.8693C19.3273 62.616 20.4849 63.3979 21.8606 63.4811C23.2363 63.5643 24.394 62.3166 24.4107 60.9192C24.4275 59.5052 23.2531 58.3241 21.8103 58.3407ZM48.016 60.8693C47.9993 59.4553 46.9088 58.3407 45.4827 58.3407C44.0567 58.3241 42.8319 59.5385 42.8655 60.9192C42.899 62.2667 44.1238 63.4977 45.4324 63.5143C46.8081 63.531 48.016 62.2833 48.016 60.8693ZM53.6531 85.7727C53.6531 87.037 52.9317 88.0351 51.9083 88.3179C50.5661 88.6839 49.3246 88.2514 48.6703 87.0536C47.4121 84.7745 45.7847 82.8614 43.6876 81.3143C40.4496 78.9355 36.7754 77.7543 32.7825 78.0205C26.5246 78.453 21.76 81.4474 18.6394 86.8872C17.7167 88.5009 15.8377 88.9334 14.5291 87.8687C13.556 87.0869 13.254 85.6396 13.8915 84.4751C16.5255 79.6342 20.4346 76.1906 25.5851 74.1611C28.152 73.1463 30.8531 72.5142 33.5878 72.614C42.2783 72.93 48.9388 76.7728 53.3008 84.3254C53.5692 84.8244 53.7202 85.3069 53.6531 85.7727Z"
                fill="#70A177"
              />
            </svg>
            <h2 className="cart-empty__title">В корзине пусто!</h2>
            <Link className="cart-empty__link" to="/">
              Перейти на главную
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartHandler: (product, type, cart, discount) =>
      dispatch(cartHandler(product, type, cart, discount)),
    getPopularItems: (allProducts, cartProducts) => dispatch(getPopularItems(allProducts, cartProducts)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
