import React from 'react';
import 'react-toastify/dist/ReactToastify.min.css';

import { ToastContainer } from 'react-toastify';
import Header from './common/Header';
import Footer from './common/Footer';
import { connect } from 'react-redux';

function Layout({children, profile}) {
  return (
    <div className="App">
      <Header />
      <ToastContainer limit={1} />
      <main className="main">{children}</main>
      <Footer />
    </div>
  )
}
const mapStateToProps = (state) => {
  return{
    profile: state.profile,
  }
}

export default Layout;
