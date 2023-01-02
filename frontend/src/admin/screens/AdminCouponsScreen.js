import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../../common/Loader';
import Popup from '../../common/Popup';
import Coupon from '../components/Coupon';
axios.defaults.baseURL = 'http://localhost:5000';

function AdminCouponsScreen(props) {
  const [couponName, setCouponName] = useState('');
  const [couponDiscount, setCouponDiscount] = useState();
  const [popupActive, setPopupActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addCoupon, setAddCoupon] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ name: '', discount: '' });
  const [validate, setValidate] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const couponDelete = async (name) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/coupon/${name}`, {
        headers: {
          Authorization: `Bearer ${props.profile.userInfo.token}`,
        },
      });
      setCoupons([...coupons.filter((coupon) => coupon.name !== name)]);
      setIsLoading(false);
    } catch (error) {
      alert('Что-то пошло не так');
      console.log(error);
    }
  };
  const getCoupons = async () => {
    console.log(props.profile);
    setIsLoading(true);
    const { data } = await axios.get('/api/coupon/', {
      headers: {
        Authorization: `Bearer ${props.profile.userInfo.token}`,
      },
    });
    setCoupons(data);
    setIsLoading(false);
    console.log(data);
  };
  useEffect(() => {
    getCoupons();
  }, []);
  const couponSubmitHandler = async (e) => {
    e.preventDefault();
    const isValid = validateInputs();
    if(!isValid) return;
    setIsLoading(true);
    try {
      await axios.post('/api/coupon/save/', newCoupon,{
        headers: {
          Authorization: `Bearer ${props.profile.userInfo.token}`,
        },
      });
      getCoupons();
      setAddCoupon(false);
      setNewCoupon({name: '', discount: ''})
    } catch (error) {
      alert('Что-то пошло не так');
      console.log(error);
      
    }
    setIsLoading(false);
  };
  const validateInputs = () => {
    let inputs = [];
    let isValid = true;
    if(!newCoupon.name.trim().length){
      inputs.push('name');
      isValid = false;
    }
    if (!newCoupon.discount.trim().length) {
      inputs.push('discount');
      isValid = false;
    }
    setValidate(inputs)
    return isValid;
  }
  return (
    <>
      <Popup
        addClass="admin-coupons__popup"
        active={addCoupon}
        closePopup={() => setAddCoupon(false)}
      >
        <form
          className={
            isLoading
              ? 'admin-coupons__popup-form disabled'
              : 'admin-coupons__popup-form'
          }
          onSubmit={couponSubmitHandler}
        >
          <label
            className={
              validate.includes('name')
                ? 'admin-coupons__popup-form__label wrong'
                : 'admin-coupons__popup-form__label'
            }
          >
            <input
              type="text"
              value={newCoupon.name}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, name: e.target.value })
              }
              onFocus={() =>
                setValidate([...validate.filter((item) => item !== 'name')])
              }
            />
            <span className={newCoupon.name.length ? 'active' : ''}>
              Название
            </span>
          </label>
          <label
            className={
              validate.includes('discount')
                ? 'admin-coupons__popup-form__label wrong'
                : 'admin-coupons__popup-form__label'
            }
          >
            <input
              type="number"
              value={newCoupon.discount}
              min="1"
              max="100"
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discount: e.target.value })
              }
              onFocus={() =>
                setValidate([...validate.filter((item) => item !== 'discount')])
              }
            />
            <span className={newCoupon.discount.length ? 'active' : ''}>
              Процент
            </span>
          </label>
          <button className="admin-coupons__popup-form__submit">
            Сохранить
          </button>
        </form>
      </Popup>
      <section className="section admin-coupons">
        <div className="container">
          <div className="admin-coupons__top">
            <h2 className="section-title">Все купоны</h2>
            <button onClick={() => setAddCoupon(true)}>Добавить купон</button>
          </div>
          {isLoading ? (
            <Loader addClass="dark" fixed />
          ) : (
            <ul className="admin-coupons__list">
              {coupons.map((coupon) => (
                <Coupon
                  key={coupon._id}
                  coupon={coupon}
                  couponDelete={couponDelete}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
export default connect(mapStateToProps)(AdminCouponsScreen);
