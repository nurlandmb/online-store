import '../styles/normalize.css';
import '../styles/index.scss';
// import thunk from 'redux-thunk';
// import { createStore, compose, applyMiddleware } from 'redux';
import store, { persistor } from '../redux/reducers/rootReducer';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import Layout from '../components/Layout';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//   )
// );
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}
