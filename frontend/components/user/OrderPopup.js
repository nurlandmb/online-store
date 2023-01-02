import React, { useEffect, useState } from 'react';
import Popup from '../common/Popup';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { cartSend } from '../../redux/actions/cart';
import InputMask from 'react-input-mask';
import Link from 'next/link';

function OrderPopup(props) {
  const [shipment, setShipment] = useState(true);
  const [name, setName] = useState(props.profile.shippingInfo.name || '');
  const [phone, setPhone] = useState(props.profile.shippingInfo.phone || '');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [address, setAddress] = useState(
    props.profile.shippingInfo.address || ''
  );
  const [coords, setCoords] = useState('');
  const [comment, setComment] = useState('');
  function inputFocusHandler(e) {
    const parent = e.target.closest('.order-popup__form-input');
    parent.classList.remove('invalid');
    const placeholder = parent.querySelector('.order-popup__form-input__label');
    placeholder.classList = 'order-popup__form-input__label active';
  }
  const inputBlurHandler = (e) => {
    const parent = e.target.closest('.order-popup__form-input');
    const placeholder = parent.querySelector('.order-popup__form-input__label');
    placeholder.classList = 'order-popup__form-input__label active';
    if (e.target.value.trim() === '') {
      placeholder.classList.remove('active');
    }
  };

  const validateForms = () => {
    const inputs = { name, address };
    const inputNames = Object.keys(inputs);
    const inputValues = Object.values(inputs);
    const invalidInputs = inputValues
      .map((input, i) => (!String(input).trim() ? inputNames[i] : ''))
      .filter((item) => !!item);
    if (phone.replace(/\D/g, '').length !== 11) {
      invalidInputs.push('phone');
    }
    const parent = document.querySelector('.order-popup__form');
    invalidInputs.forEach((inputId) => {
      const input = parent.querySelector('#' + inputId);
      input.classList.add('invalid');
    });
    return !!invalidInputs.length;
  };

  const orderSubmitHandler = (e) => {
    e.preventDefault();
    const validate = shipment ? validateForms() : false;
    if (validate) return;
    props.cartSend(props.cart, {
      name,
      phone,
      address,
      shipment,
      comment,
      coords,
    });
  };
  const getLocation = (e) => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(
      (pos) => {
        console.log(pos.coords.accuracy);
        if (pos.coords.accuracy > 100) {
          alert(
            'Не получилось получить точную геолокацию. Пожалуйста, попробуйте снова или введите их вручную'
          );
          return;
        }
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setAddress('Текущий адрес');
      },
      (err) =>
        alert(
          'Что-то пошло не так. Пожалуйста, проверьте включен ли у вас GPS и попробуйте снова'
        ),
      { enableHighAccuracy: true }
    );
  };
  useEffect(() => {
    if (props.cart.sendStatus) {
      setInputDisabled(true);
    }
  }, [props.cart.sendStatus]);

  return (
    <Popup
      theme="dark"
      addClass="order-popup"
      active={props.popupActive}
      closePopup={props.closePopup}
    >
      {props.cart.isSending && <Loader fixed addClass="dark" />}

      <h3 className="order-popup__title">Оформление заказа</h3>
      <form
        className={
          inputDisabled ? 'order-popup__form disabled' : 'order-popup__form'
        }
      >
        <div className="order-popup__form-wrapper">
          <div className="order-popup__form-radio">
            <input
              id="radio1"
              className="order-popup__form-radio__input"
              type="radio"
              name="shipment"
              disabled={inputDisabled}
              onChange={() => setShipment(true)}
            />

            <label
              className={
                shipment
                  ? 'active order-popup__form-radio__label'
                  : 'order-popup__form-radio__label'
              }
              htmlFor="radio1"
            >
              Доставка
            </label>
          </div>
          <div className="order-popup__form-radio">
            <input
              id="radio2"
              className="order-popup__form-radio__input"
              type="radio"
              name="shipment"
              onChange={() => setShipment(false)}
              disabled={inputDisabled}
            />
            <label
              className={
                shipment
                  ? 'order-popup__form-radio__label'
                  : 'active order-popup__form-radio__label'
              }
              htmlFor="radio2"
            >
              Самовывоз
            </label>
          </div>
        </div>
        {shipment ? (
          <div className="order-popup__form-inputs">
            <div className="active order-popup__form-input" id="name">
              <label
                className={
                  name
                    ? 'active order-popup__form-input__label'
                    : 'order-popup__form-input__label'
                }
              >
                Ваше имя
              </label>
              <input
                className="order-popup__form-input__item"
                onFocus={(e) => inputFocusHandler(e)}
                onBlur={(e) => inputBlurHandler(e)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={inputDisabled}
              />
            </div>
            <div className="active order-popup__form-input" id="phone">
              <label
                className={
                  name
                    ? 'active order-popup__form-input__label'
                    : 'order-popup__form-input__label'
                }
              >
                Ваш номер
              </label>
              <InputMask
                type="tel"
                mask="+9 (999) 999 9999"
                className="order-popup__form-input__item"
                onFocus={(e) => inputFocusHandler(e)}
                onBlur={(e) => inputBlurHandler(e)}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={inputDisabled}
              />
            </div>
            <div className="active order-popup__form-input" id="address">
              <label
                className={
                  address
                    ? 'active order-popup__form-input__label'
                    : 'order-popup__form-input__label'
                }
              >
                Ваш адрес
              </label>
              {/* <div className="active dropdown order-popup__form-input__dropdown">
                <button className="dropdown__text">Узынагаш</button>
                <div className="dropdown__content">
                  <button className="first dropdown__content-item">Узынагаш</button>
                  <button className="dropdown__content-item">Мынбаев</button>
                  <button className="dropdown__content-item">Каргалы</button>
                  <button className="last dropdown__content-item">
                    Жанакурылыс
                  </button>
                </div>
              </div> */}
              <input
                className="order-popup__form-input__item address"
                onFocus={(e) => inputFocusHandler(e)}
                onBlur={(e) => inputBlurHandler(e)}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={inputDisabled}
              />
              <button
                className="order-popup__form-input__button"
                type="button"
                onClick={getLocation}
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="order-popup__form-input">
              <textarea
                className="order-popup__form-input__item textarea"
                onFocus={(e) => inputFocusHandler(e)}
                onBlur={(e) => inputBlurHandler(e)}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={inputDisabled}
              />
              <label
                className={
                  comment
                    ? 'active order-popup__form-input__label'
                    : 'order-popup__form-input__label'
                }
              >
                Комментарий
              </label>
            </div>
          </div>
        ) : (
          <div className="order-popup__form-info">
            <svg
              className="order-popup__form-info__svg"
              xmlns="http://www.w3.org/2000/svg"
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
            <address className="order-popup__form-info__address">
              Мы находимся по адресу: <span>Алматы, улица Мароква, дом 56</span>
            </address>
          </div>
        )}
        <div className="order-popup__form-bottom">
          <p className="order-popup__form-price">
            {!props.cart.sendStatus ? (
              <>
                Общая цена:{' '}
                <span>{props.cart.totalWtihCoupon || props.cart.total} ₸</span>
              </>
            ) : props.cart.sendStatus === 200 ? (
              <span className="success">
                Заявка успешно оформлена! Ожидайте звонок от менеджера
              </span>
            ) : (
              'Что-то пошло не так. Пожалуйса, перезагрузите страницу и попробуйте снова'
            )}
          </p>
          <button
            className="order-popup__form-submit"
            onClick={orderSubmitHandler}
            disabled={inputDisabled}
          >
            Оформить
          </button>
        </div>
      </form>
    </Popup>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartSend: (cart, shipment) => dispatch(cartSend(cart, shipment)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPopup);
