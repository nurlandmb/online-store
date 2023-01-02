import Layout from '../components/Layout';
import React, { useEffect, useRef, useState } from 'react';
import Product from '../components/user/Product';
import {
  loadProducts,
  loadCategories,
  categoriesFetchSuccess,
  productsFetchSuccess
} from '../redux/actions/products';
import { connect } from 'react-redux';
import Loader from '../components/common/Loader';
import axios from 'axios';

function HomeScreen(props) {
  const categories = useRef(null);
  const [categoriesScroll, setCategoriesCroll] = useState('');
  const [sectionFixed, setSectionFixed] = useState(false);

  useEffect(() => {
    props.productsFetchSuccess(props.serverProducts);
    props.categoriesFetchSuccess(props.serverCategories);
    setCategoriesCroll(categories.current.offsetTop);
  }, []);

  function logit() {
    if (window.pageYOffset > categoriesScroll) {
      setSectionFixed(true);
    } else {
      setSectionFixed(false);
    }
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });
  const getLength = (category) => {
    return props.products.products.filter(
      (product) => product.category === category && product.isVisible
    ).length;
  };

  const anchorHandler = (scrollElem) => {
    const section = document.querySelector(`#${scrollElem}`);
    window.scrollTo(0, section.offsetTop);
  };
  return props.products.isLoading ? (
    <Loader addClass="dark" fixed />
  ) : (
    <>
      <section className="banner">
        {/* <img src={banner} aly="banner" /> */}
      </section>
      <section
        className={sectionFixed ? 'fixed categories' : 'categories'}
        ref={categories}
      >
        <div className="container">
          <nav className="categories__list">
            {props.serverCategories
              .filter((category) => getLength(category) > 0)
              .map((category, i) => (
                <button
                  className="categories__list-item"
                  key={i}
                  onClick={() => anchorHandler(category)}
                >
                  {category}
                </button>
              ))}
          </nav>
        </div>
      </section>
      {props.serverCategories
        .filter((category) => getLength(category) > 0)
        .map(
          (category, i) =>
            !!getLength(category) > 0 && (
              <section
                className={i === 0 ? 'first products' : 'products'}
                id={category}
                key={category}
              >
                <div className="container">
                  <h2 className="products__title section-title">{category}</h2>
                  <ul className="products__list">
                    {props.serverProducts
                      .filter(
                        (product) =>
                          product.category === category && product.isVisible
                      )
                      .map((item) => (
                        <Product
                          addClass="products__list-item"
                          product={item}
                          key={item._id}
                        />
                      ))}
                  </ul>
                </div>
              </section>
            )
        )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: () => dispatch(loadProducts()),
    loadCategories: () => dispatch(loadCategories()),
    productsFetchSuccess: (products) =>
      dispatch(productsFetchSuccess(products)),
    categoriesFetchSuccess: (categories) =>
      dispatch(categoriesFetchSuccess(categories)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export const getStaticProps = async () => {
  axios.defaults.baseURL = 'http://localhost:5000';
  const { data: serverProducts } = await axios.get('/api/product');
  const { data: serverCategories } = await axios.get('/api/product/categories');
  return {
    props: {
      serverProducts,
      serverCategories,
    },
  };
};
