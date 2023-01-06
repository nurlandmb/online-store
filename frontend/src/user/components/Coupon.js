import { connect } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import { cartCouponClear, countTotalWithCoupon, getCoupon } from '../../redux/actions/cart';

function Coupon(props) {
  const [coupon, setCoupon] = useState('');
  const {couponDiscount, couponError, total, isSending} = props.cart;
  const couponSubmit = useRef(null);
  useEffect(() => {
    console.log(props.cart)
  }, [])

  useEffect(() => {
    if(couponDiscount){
      props.countTotalWithCoupon(total, couponDiscount)
    }
  }, [couponDiscount])
  
  const couponSubmitHandler = e => {
    e.preventDefault();
    if(couponDiscount){
      props.cartCouponClear();
      setCoupon('');
      couponSubmit.current.focus();
    }else{
      props.getCoupon(coupon.trim());

    }
  }
  return (
    <div className="coupon">
      <div className="coupon__wrapper">
        <h3 className="coupon__title">У вас есть купон?</h3>
        {couponDiscount && (
          <p className="coupon__info success">
            Купон на {couponDiscount}% применен
          </p>
        )}
        {couponError && <p className="coupon__info danger">Купон не найден</p>}
      </div>
      <form className="coupon__form" onSubmit={couponSubmitHandler}>
        <label
          className={
            couponDiscount
              ? 'coupon__form-label disabled'
              : 'coupon__form-label'
          }
        >
          <input
            className="coupon__form-input"
            type="text"
            ref={couponSubmit}
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <span className={coupon.trim().length ? 'active' : ''}>Купон</span>
        </label>
        {coupon && (
          <button
            className={
              couponDiscount
                ? 'coupon__form-submit clear'
                : 'coupon__form-submit'
            }
            disabled={isSending}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        )}
      </form>
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
    getCoupon: (coupon) => dispatch(getCoupon(coupon)),
    countTotalWithCoupon: (total, discount) =>
      dispatch(countTotalWithCoupon(total, discount)),
    cartCouponClear: () => dispatch(cartCouponClear()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
