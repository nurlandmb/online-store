import React, { useEffect, useState } from 'react';
import logo from '../img/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from './Popup';
import Search from './Search';
import { signOut } from '../redux/actions/profile';
function Header(props) {
  const navigate = useNavigate();
  const [popupActive, setPopupActive] = useState(false);
  const location = useLocation();
  const [navActive, setNavActive] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, [location]);

  const cartClickHandler = () => {
    if (props.cart.quantity) {
      navigate('/cart');
    } else {
      setPopupActive(true);
    }
  };
  const signOutHandler = () => {
    props.signOut()
    navigate('/');
  }
  return (
    <>
      <Popup
        addClass="home-popup"
        active={popupActive}
        closePopup={() => setPopupActive(false)}
        theme="dark"
      >
        <svg
          width="76"
          height="89"
          viewBox="0 0 76 89"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M52.9988 58.1078C54.6262 64.9616 50.0125 68.4052 46.2377 68.7379C43.4359 68.9874 41.0703 68.0226 39.292 65.8267C37.5304 63.6641 37.1948 61.1854 37.8827 58.4239H29.4271C30.1149 61.5014 29.662 64.2796 27.3635 66.5254C25.7865 68.0725 23.8403 68.8377 21.5922 68.7545C18.9582 68.6713 16.8778 67.5069 15.3344 65.4274C13.7741 63.3313 13.8076 60.9358 14.1767 58.4239C13.2037 58.2409 12.2809 58.3573 11.375 58.3241C9.26107 58.2575 7.98601 56.1614 8.99264 54.3648C9.49595 53.4831 10.2677 53.0506 11.3414 53.0506C18.2703 53.0672 25.216 53.0506 32.145 53.0506H50.1803C51.1869 53.0506 52.0593 52.7844 52.6968 51.9693C53.2505 51.254 53.5189 50.4721 53.1498 49.5738C52.7304 48.559 51.9922 47.9934 50.8849 47.8603C47.4288 47.4112 43.9728 46.9953 40.5335 46.4629C38.1176 46.097 35.6681 45.8641 33.2355 45.5314C30.8363 45.2153 28.4372 44.8493 26.0381 44.5332C23.5216 44.2005 21.005 43.9011 18.4884 43.5684C15.9216 43.2356 13.3547 42.9029 10.7878 42.5203C9.73083 42.354 9.05974 41.6386 8.75776 40.6405C6.99617 34.868 5.26813 29.0622 3.52332 23.2564C2.66769 20.3951 1.76173 17.5504 0.85577 14.7057C0.352459 13.1586 1.40941 11.4286 3.03679 11.2788C3.59043 11.2289 4.16085 11.2289 4.71449 11.2289C22.4478 11.2289 40.1644 11.2123 57.8977 11.2456C58.7198 11.2456 59.1392 11.0293 59.4412 10.2474C61.3035 5.30668 64.8937 2.27902 70.0275 0.998084C70.9335 0.765187 71.8394 0.698645 72.7622 0.698645C74.3224 0.682009 75.6814 1.81322 75.7988 3.22724C75.8995 4.59135 74.6748 5.9222 73.0642 6.03864C71.8227 6.12182 70.6315 6.25491 69.4739 6.75397C66.7057 7.96836 65.028 10.0811 64.122 12.8925C62.7631 17.0846 61.3873 21.2601 60.0116 25.4357C58.5185 30.0104 57.0085 34.5852 55.5154 39.16C55.1631 40.2413 54.8107 41.3226 54.4249 42.3872C54.2068 42.9861 54.3074 43.3854 54.8946 43.768C57.6628 45.5813 58.9211 48.1764 58.5352 51.437C58.1661 54.4314 56.4717 56.4942 53.7035 57.7252C53.4686 57.8416 53.2337 57.9747 52.9988 58.1078ZM46.4054 16.5024C44.6774 16.5024 43.0165 16.519 41.3388 16.4857C40.6677 16.4691 40.4328 16.6854 40.3825 17.3841C40.2986 19.1474 40.1141 20.9108 39.9463 22.6742C39.7282 25.1196 39.443 27.565 39.2584 30.0271C39.0403 32.9549 38.7719 35.8661 38.5202 38.794C38.3189 40.9732 38.1679 41.0065 40.3321 41.1562C41.0368 41.2061 41.2717 41.0065 41.4059 40.3743C41.9763 37.6794 42.597 34.9844 43.1842 32.2728C44.0902 28.1472 45.0129 24.0216 45.8518 19.8794C46.0867 18.8314 46.4558 17.8 46.4054 16.5024ZM34.9971 16.6687C34.6951 16.4691 34.3595 16.5024 34.024 16.5024C32.816 16.5024 31.6249 16.5523 30.4169 16.4857C29.5781 16.4358 29.2761 16.702 29.3264 17.5671C29.5445 20.7112 29.4774 23.8719 29.6955 27.0327C29.9639 30.6758 29.8633 34.3357 30.1485 37.9955C30.2995 39.8753 30.2491 39.842 32.0778 40.0749C32.8496 40.1747 33.1012 39.8753 33.1851 39.1766C33.4536 36.8143 33.6213 34.4355 33.8059 32.0732C34.0911 28.3968 34.5105 24.7536 34.7118 21.0771C34.8125 19.5966 35.2319 18.1493 34.9971 16.6687ZM54.6262 16.519C54.6262 16.5024 54.6262 16.5024 54.6262 16.519C54.2403 16.5024 53.8377 16.5024 53.4518 16.5024C51.9754 16.5024 51.9922 16.5357 51.6902 17.9663C50.8849 21.8923 50.0461 25.8016 49.1904 29.7276C48.3684 33.5371 47.5127 37.33 46.6739 41.1396C46.5732 41.6054 46.6571 41.9547 47.2275 42.0379C47.5295 42.0712 47.8147 42.1876 48.1335 42.2375C48.6032 42.3041 48.922 42.2043 49.073 41.6553C49.2911 40.8568 49.5931 40.0749 49.8447 39.293C51.0862 35.5334 52.3277 31.7738 53.5525 28.0308C54.7436 24.4375 55.918 20.8442 57.1092 17.2343C57.2602 16.7852 57.126 16.519 56.6227 16.519C55.9684 16.5024 55.2973 16.519 54.6262 16.519ZM17.9012 16.519C18.7904 21.1936 19.6461 25.6685 20.5185 30.1435C21.0218 32.7386 21.5083 35.3504 22.0116 37.9456C22.0787 38.2949 22.0955 38.6942 22.582 38.7607C23.2867 38.8605 24.0081 38.977 24.6959 39.0768C24.9476 38.7274 24.8805 38.3781 24.8637 38.062C24.5114 34.3689 24.6456 30.6592 24.3604 26.9495C24.1088 23.7555 24.2597 20.5282 23.9745 17.3342C23.941 16.9848 23.9913 16.5357 23.4712 16.5357C21.6593 16.5024 19.8474 16.519 17.9012 16.519ZM16.4752 37.9955C16.3913 36.3985 15.9887 35.0676 15.737 33.7201C15.284 31.2248 14.831 28.7128 14.3613 26.2175C13.8748 23.639 13.3379 21.0771 12.9017 18.482C12.5829 16.5689 12.5829 16.5024 10.6536 16.5024H8.13701C7.83502 16.5024 7.51626 16.4525 7.21427 16.7353C7.36526 17.7667 7.75113 18.7814 8.0699 19.7962C9.78116 25.4856 11.5092 31.1749 13.2205 36.8809C13.3043 37.1637 13.3882 37.4798 13.6734 37.5297C14.5458 37.7127 15.4518 37.8291 16.4752 37.9955ZM21.8103 58.3407C20.3675 58.3573 19.2602 59.4386 19.2937 60.8693C19.3273 62.616 20.4849 63.3979 21.8606 63.4811C23.2363 63.5643 24.394 62.3166 24.4107 60.9192C24.4275 59.5052 23.2531 58.3241 21.8103 58.3407ZM48.016 60.8693C47.9993 59.4553 46.9088 58.3407 45.4827 58.3407C44.0567 58.3241 42.8319 59.5385 42.8655 60.9192C42.899 62.2667 44.1238 63.4977 45.4324 63.5143C46.8081 63.531 48.016 62.2833 48.016 60.8693ZM53.6531 85.7727C53.6531 87.037 52.9317 88.0351 51.9083 88.3179C50.5661 88.6839 49.3246 88.2514 48.6703 87.0536C47.4121 84.7745 45.7847 82.8614 43.6876 81.3143C40.4496 78.9355 36.7754 77.7543 32.7825 78.0205C26.5246 78.453 21.76 81.4474 18.6394 86.8872C17.7167 88.5009 15.8377 88.9334 14.5291 87.8687C13.556 87.0869 13.254 85.6396 13.8915 84.4751C16.5255 79.6342 20.4346 76.1906 25.5851 74.1611C28.152 73.1463 30.8531 72.5142 33.5878 72.614C42.2783 72.93 48.9388 76.7728 53.3008 84.3254C53.5692 84.8244 53.7202 85.3069 53.6531 85.7727Z"
            fill="#70A177"
          />
        </svg>
        <h3 className="home-popup__title">Your cart is empty</h3>
        <button
          className="home-popup__button"
          onClick={() => {
            setPopupActive(false);
            navigate('/');
          }}
        >
          See menu
        </button>
      </Popup>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            {/* <button
              className={
                burgerActive ? 'active header__burger' : 'header__burger'
              }
              onClick={() => setBurgerActive(!burgerActive)}
            >
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
              <p className="header__burger-text">Меню</p>
            </button> */}
            <div className="header__left">
              <div className="header__logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <div className="header__content">
                <Search isAdmin={props.userInfo.isAdmin}/>
                <a className="header__contacts" href="tel:+77777777777">
                  <div className="header__contacts-svg">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.993287 2.249C1.20417 1.89915 2.36678 0.629167 3.19526 0.667506C3.44311 0.68873 3.66222 0.837979 3.84024 1.01187H3.84092C4.249 1.4117 5.41982 2.92062 5.48555 3.23829C5.64782 4.01739 4.7187 4.46651 5.00284 5.25178C5.72725 7.02428 6.97544 8.27236 8.74879 8.99602C9.53345 9.28082 9.98261 8.35246 10.7618 8.51404C11.0795 8.58045 12.5892 9.75048 12.9884 10.1592V10.1592C13.1616 10.3365 13.3123 10.5563 13.3328 10.8041C13.3636 11.677 12.0148 12.8553 11.7518 13.0059C11.1315 13.4502 10.3222 13.442 9.33557 12.9833C6.58243 11.8379 2.1826 7.52132 1.01588 4.66437C0.569463 3.6833 0.539336 2.86859 0.993287 2.249Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.71027 0.833313C11.1783 1.10731 13.1269 3.05398 13.4043 5.52131"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.71027 3.19531C9.89027 3.42531 10.8123 4.34731 11.0423 5.52731"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="header__contacts-content">
                    <span>Contacts:</span>
                    +7 (123) 456-78-90
                  </p>
                </a>
              </div>
            </div>
            <div className="header__right">
              {/* <div className="header__dropdown">
                <button
                  className="header__dropdown-button"
                  onClick={() => setNavActive(!navActive)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11.5788"
                      cy="7.27803"
                      r="4.77803"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.00002 18.7014C3.99873 18.3655 4.07385 18.0338 4.2197 17.7312C4.67736 16.8158 5.96798 16.3307 7.03892 16.111C7.81128 15.9462 8.59431 15.8361 9.38217 15.7815C10.8408 15.6534 12.3079 15.6534 13.7666 15.7815C14.5544 15.8367 15.3374 15.9468 16.1099 16.111C17.1808 16.3307 18.4714 16.7701 18.9291 17.7312C19.2224 18.348 19.2224 19.064 18.9291 19.6808C18.4714 20.6419 17.1808 21.0813 16.1099 21.2918C15.3384 21.4635 14.5551 21.5767 13.7666 21.6305C12.5794 21.7311 11.3866 21.7495 10.1968 21.6854C9.92221 21.6854 9.65677 21.6854 9.38217 21.6305C8.59663 21.5773 7.81632 21.4641 7.04807 21.2918C5.96798 21.0813 4.68652 20.6419 4.2197 19.6808C4.0746 19.3747 3.99955 19.0402 4.00002 18.7014Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Нурлан</span>
                </button>
                <nav
                  className={
                    navActive
                      ? 'active header__dropdown-nav'
                      : 'header__dropdown-nav'
                  }
                >
                  <Link className="header__dropdown-nav__item" to="/">
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Профиль</span>
                  </Link>
                  <Link className="header__dropdown-nav__item" to="/">
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <span>Заказы</span>
                  </Link>
                  <Link className="header__dropdown-nav__item line" to="/">
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
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                      />
                    </svg>
                    <span>Выйти</span>
                  </Link>
                </nav>
              </div> */}
              {!!props.userInfo.isAdmin && (
                <button className="header__signin" onClick={signOutHandler}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11.5788"
                      cy="7.27803"
                      r="4.77803"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.00002 18.7014C3.99873 18.3655 4.07385 18.0338 4.2197 17.7312C4.67736 16.8158 5.96798 16.3307 7.03892 16.111C7.81128 15.9462 8.59431 15.8361 9.38217 15.7815C10.8408 15.6534 12.3079 15.6534 13.7666 15.7815C14.5544 15.8367 15.3374 15.9468 16.1099 16.111C17.1808 16.3307 18.4714 16.7701 18.9291 17.7312C19.2224 18.348 19.2224 19.064 18.9291 19.6808C18.4714 20.6419 17.1808 21.0813 16.1099 21.2918C15.3384 21.4635 14.5551 21.5767 13.7666 21.6305C12.5794 21.7311 11.3866 21.7495 10.1968 21.6854C9.92221 21.6854 9.65677 21.6854 9.38217 21.6305C8.59663 21.5773 7.81632 21.4641 7.04807 21.2918C5.96798 21.0813 4.68652 20.6419 4.2197 19.6808C4.0746 19.3747 3.99955 19.0402 4.00002 18.7014Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Log out</span>
                </button>
              )}
              <button className="header__cart" onClick={cartClickHandler}>
                <span className="header__cart-logo">
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
                      fillRule="evenodd"
                      clipRule="evenodd"
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
                Cart
                {!!props.cart.quantity && (
                  <span className="header__cart-count">
                    {props.cart.quantity}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div
            className={
              burgerActive ? 'active header__mobile' : 'header__mobile'
            }
          >
            {/* <nav className="header__mobile-nav">
              <Link className="header__mobile-nav__item" to="/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>

                <span>Войти в аккаунт</span>
              </Link>
              <Link className="header__mobile-nav__item" to="/signup">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                <span>Создать аккаунт</span>
              </Link>
            </nav> */}
            {/* <nav className="header__mobile-nav">
              <Link className="header__mobile-nav__item" to="/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Профиль</span>
              </Link>
              <Link className="header__mobile-nav__item" to="/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Заказы</span>
              </Link>
              <Link className="header__mobile-nav__item" to="/signup">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <span>Выйти</span>
              </Link>
            </nav>
            <nav className="header__mobile-nav">
              <Link className="header__mobile-nav__item" to="/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Статистика</span>
              </Link>
              <Link className="header__mobile-nav__item" to="/signin">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <span>Заказы</span>
              </Link>
              <Link className="header__mobile-nav__item" to="/signin">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>Продукты</span>
              </Link>
              <Link className="header__mobile-nav__item" to="/signup">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <span>Выйти</span>
              </Link>
            </nav> */}
          </div>
          <Search addClass="mobile" isAdmin={props.userInfo.isAdmin} />
        </div>
      </header>
      <Link
        className={
          props.cart.quantity && location.pathname === '/'
            ? 'active cart-button'
            : 'cart-button'
        }
        to="/cart"
      >
        <svg
          className="cart-button__svg"
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
            fillRule="evenodd"
            clipRule="evenodd"
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
        <p className="cart-button__text">{props.cart.quantity}</p>
      </Link>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
