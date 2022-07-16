import React, { useEffect, useRef, useState } from 'react';
import Product from '../../common/Product';
import banner from '../../img/banner.jpg';
import { loadProducts, loadCategories } from '../../redux/actions/products';
import { connect } from 'react-redux';
import Loader from '../../common/Loader';

function HomeScreen(props) {
  const categories = useRef(null);
  const [categoriesScroll, setCategoriesCroll] = useState('');
  const [sectionFixed, setSectionFixed] = useState(false);

  useEffect(() => {
    props.loadCategories();
    props.loadProducts();
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
  // useEffect(() => {
  //   console.log('abc');
  //   if(window.scrollY === document.querySelector('.categories').scrollHeight){
  //     console.log('action');
  //   }
  // }, [window.pageYOffset])
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
            {props.products.categories.map((category, i) => (
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
      {props.products.categories.filter(category => getLength(category) > 0).map(
        (category, i) =>
          !!getLength(category) > 0 && (
            <section className={ i === 0 ? "first products" : "products"} id={category} key={category}>
              <div className="container">
                <h2 className="products__title section-title">{category}</h2>
                <ul className="products__list">
                  {props.products.products
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
