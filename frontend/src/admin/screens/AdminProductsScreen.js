import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Popup from '../../common/Popup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import Loader from '../../common/Loader';
import {
  createProduct,
  productDeleteHandler,
  editExistingProduct,
} from '../../redux/actions/adminProduct';
import { loadProducts } from '../../redux/actions/products';
import {
  productEdit,
  productEditClose,
} from '../../redux/actions/adminProduct';

function AdminProductsScreen(props) {
  const [editingProduct, setEditingProduct] = useState({
    image: '',
    name: '',
    description: '',
    price: '',
    discount: false,
    isPopular: false,
    priceWithDiscount: '',
    category: '',
    shortInfo: '',
  });
  const [imgUpload, setImgUpload] = useState(false);
  useEffect(() => {
    if (!props.adminProduct.isLoading && !props.adminProduct.error) {
      props.loadProducts();
    }
  }, [props.adminProduct.isLoading]);

  useEffect(() => {
    setEditingProduct({
      ...props.adminProduct.product,
      discount:
        typeof props.adminProduct.product.priceWithDiscount !== 'object'
          ? true
          : false,
    });
  }, [props.adminProduct.product]);

  function inputFocusHandler(e) {
    const parent = e.target.closest('.admin-products__form-wrapper');
    parent.classList.remove('invalid');
    const placeholder = parent.querySelector(
      '.admin-products__form-placeholder'
    );
    placeholder.classList = 'admin-products__form-placeholder active';
  }
  const inputBlurHandler = (e) => {
    const parent = e.target.closest('.admin-products__form-wrapper');
    const placeholder = parent.querySelector(
      '.admin-products__form-placeholder'
    );
    placeholder.classList = 'admin-products__form-placeholder active';
    if (e.target.value.trim() === '') {
      placeholder.classList.remove('active');
    }
  };
  const imgUploadHandler = async (e) => {
    const parent = e.target.closest('.admin-products__form-upload');
    parent.classList.remove('invalid');
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      setImgUpload(true);
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${props.profile.userInfo.token}`,
        },
      });
      toast.success('Image uploaded successfully');
      setImgUpload(false);
      setEditingProduct({ ...editingProduct, image: data.secure_url });
    } catch (err) {
      console.log(err);
      toast.error(err);
      setImgUpload(false);
    }
  };

  const validateForms = () => {
    const { image, name, description, price, category } = editingProduct;

    const inputs = { image, name, description, price, category };
    if (editingProduct.discount) {
      inputs.priceWithDiscount =
        typeof editingProduct.priceWithDiscount === 'object'
          ? ''
          : editingProduct.priceWithDiscount;
    }
    const inputNames = Object.keys(inputs);
    const inputValues = Object.values(inputs);
    const invalidInputs = inputValues
      .map((input, i) => (!String(input).trim() ? inputNames[i] : ''))
      .filter((item) => !!item);
    const parent = document.querySelector('.admin-products__popup');
    invalidInputs.forEach((inputId) => {
      const input = parent.querySelector('#' + inputId);
      input.classList.add('invalid');
    });
    return !!invalidInputs.length;
  };
  const formSendHandler = async (e) => {
    e.preventDefault();
    if (validateForms()) return;
    
    if (editingProduct.type === 'create') {
      props.createProduct(editingProduct, props.profile.userInfo);
    } else {
      props.editExistingProduct(editingProduct, props.profile.userInfo);
    }
  };
  const productDelete = (e) => {
    const text = e.target.textContent;
    if (text === 'Delete product') {
      e.target.textContent = 'Are you sure?';
      e.target.classList.add('active');
      setTimeout(() => {
        e.target.textContent = 'Delete product';
      }, 3000);
      return;
    }
    props.productDeleteHandler(editingProduct, props.profile.userInfo);
    e.target.textContent = 'Delete product';
    e.target.classList.remove('active');
  };
  return (
    <>
      <Popup
        addClass="admin-products__popup"
        active={props.adminProduct.popupActive}
        closePopup={() => props.productEditClose()}
      >
        {props.adminProduct.isLoading && <Loader fixed />}
        <form className="admin-products__form" onSubmit={formSendHandler}>
          <div className="admin-products__form-upload" id="image">
            {imgUpload && <Loader fixed />}

            {editingProduct.image ? (
              <div className="admin-products__form-upload__wrapper">
                <img
                  className="admin-products__form-upload__img"
                  src={editingProduct.image}
                  alt={editingProduct.name}
                />
                <button
                  className="admin-products__form-upload__button"
                  onClick={(e) =>
                    setEditingProduct({ ...editingProduct, image: '' })
                  }
                >
                  Delete
                </button>
              </div>
            ) : (
              <>
                <input
                  className="admin-products__form-upload__input"
                  type="file"
                  id="file-upload"
                  accept=".jpg, .jpeg, .png"
                  onChange={imgUploadHandler}
                />
                <label
                  className="admin-products__form-upload__label"
                  htmlFor="file-upload"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  <span>Upload image (Less than 1mb)</span>
                </label>
              </>
            )}
          </div>
          <div className="admin-products__form-wrapper" id="name">
            <label
              className={
                editingProduct.name
                  ? 'active admin-products__form-placeholder'
                  : 'admin-products__form-placeholder'
              }
            >
              Name
            </label>
            <input
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              className="admin-products__form-input"
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
          </div>
          <div className="admin-products__form-wrapper" id="name">
            <label
              className={
                editingProduct.shortInfo
                  ? 'active admin-products__form-placeholder'
                  : 'admin-products__form-placeholder'
              }
            >
              Short info
            </label>
            <input
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              className="admin-products__form-input"
              type="text"
              value={editingProduct.shortInfo}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, shortInfo: e.target.value })
              }
            />
          </div>
          <div className="admin-products__form-wrapper" id="description">
            <textarea
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              className="admin-products__form-input textarea"
              type="text"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />
            <label
              className={
                editingProduct.description
                  ? 'active admin-products__form-placeholder'
                  : 'admin-products__form-placeholder'
              }
            >
              Description
            </label>
          </div>
          <div className="admin-products__form-wrapper" id="price">
            <label
              className={
                editingProduct.price
                  ? 'active admin-products__form-placeholder'
                  : 'admin-products__form-placeholder'
              }
            >
              Price
            </label>
            <input
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              className="admin-products__form-input"
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
          </div>
          <div className="admin-products__form-wrapper flex">
            <label className="admin-products__form-text" htmlFor="discount">
              Discount
            </label>
            <label className="check">
              <input
                id="discount"
                type="checkbox"
                checked={editingProduct.discount}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    discount: !editingProduct.discount,
                  })
                }
              />
              <span></span>
            </label>
          </div>

          {editingProduct.discount && (
            <div
              className="admin-products__form-wrapper"
              id="priceWithDiscount"
            >
              <label
                className={
                  editingProduct.priceWithDiscount
                    ? 'active admin-products__form-placeholder'
                    : 'admin-products__form-placeholder'
                }
              >
                Price with discount
              </label>
              <input
                onBlur={inputBlurHandler}
                onFocus={inputFocusHandler}
                className="admin-products__form-input"
                type="number"
                value={
                  typeof editingProduct.priceWithDiscount == 'object'
                    ? ''
                    : editingProduct.priceWithDiscount
                }
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    priceWithDiscount: e.target.value,
                  })
                }
              />
            </div>
          )}
          <div className="admin-products__form-wrapper" id="category">
            <label
              className={
                editingProduct.category
                  ? 'active admin-products__form-placeholder'
                  : 'admin-products__form-placeholder'
              }
            >
              Category
            </label>
            <input
              onBlur={inputBlurHandler}
              onFocus={inputFocusHandler}
              className="admin-products__form-input"
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            />
          </div>
          <div className="admin-products__form-wrapper flex">
            <label className="admin-products__form-text" htmlFor="ispopular">
              Popular
            </label>
            <label className="check">
              <input
                id="ispopular"
                type="checkbox"
                checked={editingProduct.isPopular}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    isPopular: !editingProduct.isPopular,
                  })
                }
              />
              <span></span>
            </label>
          </div>
          <button
            className="admin-products__form-submit"
            disabled={props.adminProduct.isLoading}
          >
            Save
          </button>
          {props.adminProduct.product.type === 'edit' && (
            <button
              className="admin-products__form-delete"
              type="button"
              onClick={(e) => productDelete(e)}
            >
              Delete product
            </button>
          )}
        </form>
      </Popup>
      <section className="section admin-products">
        <div className="container">
          <div className="admin-products__top">
            <h2 className="section-title admin-products__list">All products</h2>
            <button
              className="admin-products__top-button"
              onClick={() =>
                props.productEdit({
                  category: '',
                  description: '',
                  image: '',
                  isPopular: false,
                  discount: false,
                  isVisible: true,
                  name: '',
                  price: '',
                  priceWithDiscount: '',
                  type: 'create',
                })
              }
            >
              Add product
            </button>
          </div>
          <ul className="admin-products__list">
            {props.products.products.map((item) => (
              <Product
                addClass="admin-products__list-item"
                product={item}
                admin
                key={item._id}
              />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    products: state.products,
    adminProduct: state.adminProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(loadProducts()),
    createProduct: (product, user) => dispatch(createProduct(product, user)),
    productEdit: (product) => dispatch(productEdit(product)),
    productEditClose: () => dispatch(productEditClose()),
    editExistingProduct: (product, user) =>
      dispatch(editExistingProduct(product, user)),
    productDeleteHandler: (product, user) =>
      dispatch(productDeleteHandler(product, user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminProductsScreen);
