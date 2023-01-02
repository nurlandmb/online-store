import React, { useState } from 'react';

function OrderScreen() {
  const [shipment, setShipment] = useState(true);
  const [address, setAddress] = useState(null);
  const [selectActive, setSelectActive] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <section className="order">
      <div className="container">
        <h2 className="section-title order__title">Оформление заказа</h2>
        <form className="order__form">
          <div className="order__form-wrapper">
            <div className="order__form-radio">
              <input
                id="radio1"
                className="order__form-radio__input"
                type="radio"
                name="shipment"
                onChange={() => setShipment(true)}
              />

              <label
                className={
                  shipment
                    ? 'active order__form-radio__label'
                    : 'order__form-radio__label'
                }
                htmlFor="radio1"
              >
                Доставка
              </label>
            </div>
            <div className="order__form-radio">
              <input
                id="radio2"
                className="order__form-radio__input"
                type="radio"
                name="shipment"
                onChange={() => setShipment(false)}
              />
              <label
                className={
                  shipment
                    ? 'order__form-radio__label'
                    : 'active order__form-radio__label'
                }
                htmlFor="radio2"
              >
                Самовывоз
              </label>
            </div>
          </div>
          {shipment ? (
            <>
              <input
                className="order__form-input"
                placeholder="Город"
                type="text"
              />
              <input
                className="order__form-input"
                placeholder="Улица, дом"
                type="text"
              />
              <input
                className="order__form-input"
                placeholder="Комментарий"
                type="text"
              />
            </>
          ) : (
            <div className="order__form-select">
              <button
                type="button"
                className="order__form-select__button"
                onClick={() => setSelectActive(!selectActive)}
              >
                {address || 'Выберите филлиал'}
              </button>
              <div
                className={
                  selectActive
                    ? 'active order__form-select__dropdown'
                    : 'order__form-select__dropdown'
                }
              >
                <button
                  type="button"
                  className="order__form-select__dropdown-item"
                  onClick={() => {
                    setAddress('Узынагаш');
                    setSelectActive(false);
                  }}
                >
                  Узынагаш
                </button>
                <button
                  type="button"
                  className="order__form-select__dropdown-item"
                  onClick={() => {
                    setAddress('Каскелен');
                    setSelectActive(false);
                  }}
                >
                  Каскелен
                </button>
                <button
                  type="button"
                  className="order__form-select__dropdown-item"
                  onClick={() => {
                    setAddress('Алматы');
                    setSelectActive(false);
                  }}
                >
                  Алматы
                </button>
              </div>
            </div>
          )}
          <button className="order__form-submit" onClick={submitHandler}>
            Оформить заказ
          </button>
        </form>
      </div>
    </section>
  );
}

export default OrderScreen;
