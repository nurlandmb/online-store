import React from 'react';

function Coupon({ coupon, couponDelete }) {
  const {name, discount} = coupon;
  return (
    <div className="admin-coupon">
      <div className='admin-coupon__wrapper'>
        <h3 className="admin-coupon__title">{name}</h3>
        <p className="admin-coupon__discount">{discount}%</p>
      </div>
      <button className='admin-coupon__delete' onClick={() => couponDelete(name)}>
        Удалить
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg> */}
      </button>
    </div>
  );
}

export default Coupon;
