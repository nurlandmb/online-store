import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InputMask from 'react-input-mask';
import { signInHandler } from '../../redux/actions/profile';
import { connect } from 'react-redux';

function signin(props) {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(phone, password);
    props.signInHandler({ phone, password });
  };
  useEffect(() => {
    if (props.profile.isLoggedIn) {
      router.push('/admin/products');
    }
  }, [props.profile.isLoggedIn]);

  return (
    <section className="section sign">
      <div className="container">
        <h2 className="section-title sign__title">Вход в аккаунт</h2>
        <form className="sign__form" onSubmit={submitHandler}>
          <div className="sign__wrapper">
            <InputMask
              type="tel"
              placeholder="Введите номер"
              mask="+9 (999) 999 9999"
              className="sign__form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="sign__form-wrapper">
              <input
                className="sign__form-input"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="sign__form-button"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* <p className="sign__form-info">
              Нету аккаунта? <Link to="/signup">Создать аккаунт</Link>
            </p> */}
            <button className="sign__form-submit">Войти</button>
          </div>
        </form>
      </div>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signInHandler: (user) => dispatch(signInHandler(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(signin);
