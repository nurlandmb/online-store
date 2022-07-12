import { combineReducers } from "redux";
import profileReducer from './profile';
import productsReducer from "./products";
import adminProductReducer from "./adminProduct";
import cartReducer from "./cart";
import searchReducer from "./search";
export const rootReducer = combineReducers({
    profile: profileReducer,
    products: productsReducer,
    cart: cartReducer,
    adminProduct: adminProductReducer,
    search: searchReducer,
});