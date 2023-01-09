import './normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { Route, Routes } from 'react-router-dom';
import HomeScreen from './user/screens/HomeScreen';
import OrderScreen from './user/screens/OrderScreen';
import ProductsScreen from './user/screens/ProductsScreen';
import SignInScreen from './user/screens/SignInScreen';
import SignUpScreen from './user/screens/SignUpScreen';
import CartScreen from './user/screens/CartScreen';
import PrivateRoute from './PrivateRoute';
import AdminProductsScreen from './admin/screens/AdminProductsScreen';
import AdminCouponsScreen from './admin/screens/AdminCouponsScreen';
import Header from './common/Header';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import Footer from './common/Footer';
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

function App(props) {
  return (
    <div className="App">
      <Header userInfo={props.profile.userInfo} />
      <ToastContainer limit={1} />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          {/* <Route path="/products" element={<ProductsScreen />} /> */}
          {/* <Route path="/order" element={<OrderScreen />} /> */}
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/admin/signin" element={<SignInScreen />} />
          {/* <Route path="/signup" element={<SignUpScreen />} /> */}
          {/* <Route
            path="/admin/orders"
            element={
              <PrivateRoute user={{ isAdmin: true }} adminRoute>
                <AdminOrdersScreen />
              </PrivateRoute>
            }
          /> */}
          <Route
            path="/admin/products"
            element={
              <PrivateRoute user={props.profile.userInfo} adminRoute>
                <AdminProductsScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/coupons"
            element={
              <PrivateRoute user={props.profile.userInfo} adminRoute>
                <AdminCouponsScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(App);
