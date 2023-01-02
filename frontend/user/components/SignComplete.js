import React from 'react';

function SignComplete(props) {
  return (
    <div className="confirm active">
      <h3 className="confirm__title">Введите код</h3>
      <form className="confirm__form">
        <label className="confirm__form-wrapper">
          <input
            className="confirm__input"
            type="text"
            maxLength="1"
            size="1"
            min="0"
            max="9"
            pattern="[0-9]{1}"
          />
          <input
            className="confirm__input"
            type="text"
            maxLength="1"
            size="1"
            min="0"
            max="9"
            pattern="[0-9]{1}"
          />
          <input
            className="confirm__input"
            type="text"
            maxLength="1"
            size="1"
            min="0"
            max="9"
            pattern="[0-9]{1}"
          />
          <input
            className="confirm__input"
            type="text"
            maxLength="1"
            size="1"
            min="0"
            max="9"
            pattern="[0-9]{1}"
          />
        </label>
        <button type="button" disabled className="confirm__form-button confirm__form-resend">Отправить код еще раз через <span>120 Секунд</span> </button>
        <button type="button" className="confirm__form-button confirm__close">Изменить номер</button>
      </form>
    </div>
  );
}

export default SignComplete;
