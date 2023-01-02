// import { combineReducers } from 'redux';
import profileReducer from './profile';
import productsReducer from './products';
import adminProductReducer from './adminProduct';
import cartReducer from './cart';
import searchReducer from './search';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const profileConfig = {
  key: 'online-store-profile',
  storage,
  whitelist: ['userInfo', 'shippingInfo', 'isLoggedIn'],
};

const cartConfig = {
  key: 'online-store-cart',
  storage,
  whitelist: ['cartItems', 'total', 'quantity'],
};

const rootReducer = combineReducers({
  profile: persistReducer(profileConfig, profileReducer),
  products: productsReducer,
  cart: persistReducer(cartConfig, cartReducer),
  adminProduct: adminProductReducer,
  search: searchReducer,
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
