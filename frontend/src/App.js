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
import AdminOrdersScreen from './admin/screens/AdminOrdersScreen';
import Header from './common/Header';
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'

function App(props) {
  return (
    <div className="App">
      <Header />
      <ToastContainer limit={1} />
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
      </Routes>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps)(App);
