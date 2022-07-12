import React, { useEffect, useState } from 'react';
import Product from '../../common/Product';
import banner from '../../img/banner.jpg';
import Popup from '../../common/Popup';
import { loadProducts, loadCategories } from '../../redux/actions/products';
import { connect } from 'react-redux';
import Loader from '../../common/Loader';

function HomeScreen(props) {
  
  useEffect(() => {
    console.log(props);
    props.loadCategories();
    props.loadProducts();
  }, []);

  return props.products.isLoading ? (
    <Loader addClass="dark" fixed />
  ) : (
    <>
      
      <section className="banner">
        {/* <img src={banner} aly="banner" /> */}
      </section>
      <section className="categories">
        <div className="container">
          <nav className="categories__list">
            {props.products.categories.map((category, i) => (
              <a
                className="categories__list-item"
                key={i}
                href={`#${category}`}
              >
                {category}
              </a>
            ))}
          </nav>
        </div>
      </section>
      {props.products.categories.map((category) => (
        <section className="products" id={category} key={category}>
          <div className="container">
            <h2
              className="products__title section-title"
            >
              {category}
            </h2>
            <ul className="products__list">
              {props.products.products
                .filter((product) => product.category === category && product.isVisible)
                .map((item) => (
                  <Product addClass="products__list-item" product={item} key={item._id} />
                ))}
            </ul>
          </div>
        </section>
      ))}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
