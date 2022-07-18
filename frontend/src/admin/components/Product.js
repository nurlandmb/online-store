import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  alertUser,
  productEdit,
  productEditClose,
} from '../../redux/actions/adminProduct';
import axios from 'axios';
import { toast } from 'react-toastify';

function Product(props) {
  const [isVisible, setIsVisible] = useState(props.product.isVisible);

  const visibilityHandler = async (e) => {
    try {
      const req = await axios.post(
        `/api/product/edit/${props.product._id}`,
        {
          isVisible: !isVisible,
          isPopular: props.product.isPopular,
        },
        {
          headers: { authorization: `Bearer ${props.profile.userInfo.token}` },
        }
      );
      setIsVisible(!isVisible);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className={'product' + ' ' + props.addClass}>
        <div className="product__img">
          <img src={props.product.image} alt={props.product.name} />
        </div>
        <div className="product__content">
          <div className="product__content-top">
            <h3 className="product__content-top__title">
              {props.product.name}
            </h3>
            <p className="product__content-top__info">
              {props.product.category}
            </p>
          </div>
          <p className="product__content-descr">{props.product.description}</p>
          <div className="product__content-bottom">
            <p className="product__content-bottom__price">
              {props.product.priceWithDiscount ? (
                <>
                  {props.product.priceWithDiscount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}{' '}
                  <span>
                    {props.product.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </>
              ) : (
                props.product.price.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
              )}{' '}
            </p>
            <div className="product__content-bottom__edit">
              <button
                className="product__content-bottom__edit-item hide"
                onClick={() => props.alertUser()}
              >
                {isVisible ? (
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
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
              <button
                className="product__content-bottom__edit-item edit"
                onClick={() => props.productEdit(props.product, 'edit')}
              >
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    adminProduct: state.adminProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    productEdit: (product, type) => dispatch(productEdit(product, type)),
    productEditClose: () => dispatch(productEditClose()),
    alertUser: () => dispatch(alertUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
