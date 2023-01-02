(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8484:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(163);
/* harmony import */ var _styles_normalize_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_normalize_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1663);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _redux_reducers_rootReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3149);
/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1127);
/* harmony import */ var redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3412);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_Layout__WEBPACK_IMPORTED_MODULE_6__]);
_components_Layout__WEBPACK_IMPORTED_MODULE_6__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



// import thunk from 'redux-thunk';
// import { createStore, compose, applyMiddleware } from 'redux';




// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk),
//   )
// );
function App({ Component , pageProps  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_redux__WEBPACK_IMPORTED_MODULE_5__.Provider, {
        store: _redux_reducers_rootReducer__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(redux_persist_integration_react__WEBPACK_IMPORTED_MODULE_4__.PersistGate, {
            loading: null,
            persistor: _redux_reducers_rootReducer__WEBPACK_IMPORTED_MODULE_3__/* .persistor */ .D,
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Layout__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
                    ...pageProps
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ reducers_rootReducer),
  "D": () => (/* binding */ persistor)
});

// EXTERNAL MODULE: ./redux/actionTypes.js
var actionTypes = __webpack_require__(2031);
;// CONCATENATED MODULE: ./redux/reducers/profile.js

const inititalState = {
    // userInfo: localStorage.getItem('nurlan-store-userInfo')
    // ? JSON.parse(localStorage.getItem('nurlan-store-userInfo'))
    // : {},
    userInfo: {},
    // shippingInfo: localStorage.getItem('nurlan-store-shippingInfo')
    //   ? JSON.parse(localStorage.getItem('nurlan-store-shippingInfo'))
    //   : {},
    shippingInfo: {},
    isLoading: false,
    error: "",
    isLoggedIn: false
};
const foodsReducer = (state = inititalState, action)=>{
    switch(action.type){
        case actionTypes/* USER_SIGNIN */.lZ:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes/* USER_SIGNIN_SUCCESS */.GW:
            return {
                ...state,
                userInfo: action.payload,
                isLoading: false,
                isLoggedIn: true
            };
        case actionTypes/* USER_SIGNIN_ERROR */.N_:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case actionTypes/* USER_SIGNOUT */.KY:
            return {
                ...state,
                userInfo: {},
                isLoggedIn: false
            };
        default:
            return state;
    }
};
/* harmony default export */ const profile = (foodsReducer);

;// CONCATENATED MODULE: ./redux/reducers/products.js

const products_inititalState = {
    categories: [],
    isProductsLoading: true,
    isCategoriesLoading: true,
    products: [],
    errors: null
};
const productsReducer = (state = products_inititalState, action)=>{
    switch(action.type){
        case actionTypes/* PRODUCTS_FETCH */.vb:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes/* PRODUCTS_FETCH_SUCCESS */.x3:
            return {
                ...state,
                isLoading: false,
                products: action.payload
            };
        case actionTypes/* PRODUCTS_FETCH_ERROR */.SM:
            return {
                ...state,
                errors: action.payload
            };
        case actionTypes/* CATEGORIES_FETCH */.h0:
            return {
                ...state,
                isCategoriesLoading: true
            };
        case actionTypes/* CATEGORIES_FETCH_SUCCESS */.Be:
            return {
                ...state,
                categories: action.payload,
                isCategoriesLoading: false
            };
        case actionTypes/* CATEGORIES_FETCH_ERROR */._7:
            return {
                ...state,
                errors: action.payload,
                isCategoriesLoading: false
            };
        default:
            return state;
    }
};
/* harmony default export */ const products = (productsReducer);

;// CONCATENATED MODULE: ./redux/reducers/adminProduct.js

const initialState = {
    product: {
        category: "",
        description: "",
        image: "",
        isPopular: false,
        isVisible: true,
        name: "",
        price: "",
        priceWithDiscount: null
    },
    popularProducts: [],
    popupActive: false,
    error: false,
    isLoading: false
};
const adminProductReducer = (state = initialState, action)=>{
    switch(action.type){
        case actionTypes/* PRODUCT_EDIT */.rU:
            return {
                ...state,
                popupActive: true,
                product: action.payload
            };
        case actionTypes/* PRODUCT_EDIT_CLOSE */.$t:
            return {
                ...state,
                popupActive: false,
                product: {
                    category: "",
                    description: "",
                    image: "",
                    isPopular: false,
                    discount: false,
                    isVisible: true,
                    name: "",
                    price: "",
                    priceWithDiscount: "",
                    type: "create"
                }
            };
        case actionTypes/* PRODUCT_EDIT_START */.BD:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes/* PRODUCT_EDIT_SUCCESS */.XZ:
            return {
                ...state,
                isLoading: false,
                popupActive: false
            };
        case actionTypes/* PRODUCT_EDIT_ERROR */.ZD:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
/* harmony default export */ const adminProduct = (adminProductReducer);

;// CONCATENATED MODULE: ./redux/reducers/cart.js

const cart_inititalState = {
    // cartItems: localStorage.getItem('nurlan-online-store-cart')
    //   ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).cartItems
    //   : [],
    cartItems: [],
    popularItems: [],
    // total: localStorage.getItem('nurlan-online-store-cart')
    //   ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).total
    //   : 0,
    total: 0,
    // quantity: localStorage.getItem('nurlan-online-store-cart')
    //   ? JSON.parse(localStorage.getItem('nurlan-online-store-cart')).quantity
    //   : 0,
    quantity: 0,
    isSending: false,
    totalWtihCoupon: null,
    couponName: null,
    couponDiscount: null,
    couponError: null,
    sendStatus: "",
    error: ""
};
const cartReducer = (state = cart_inititalState, action)=>{
    switch(action.type){
        case actionTypes/* CART_EDIT */.Jn:
            return {
                ...state,
                ...action.payload,
                sendStatus: ""
            };
        case actionTypes/* CART_SEND_START */.es:
            return {
                ...state,
                isSending: true
            };
        case actionTypes/* CART_SEND_SUCCESS */.sR:
            return {
                ...state,
                isSending: false,
                sendStatus: action.payload,
                cartItems: [],
                total: 0,
                quantity: 0
            };
        case actionTypes/* CART_SEND_ERROR */.Do:
            return {
                ...state,
                error: action.payload,
                isSending: false
            };
        case actionTypes/* CART_POPULAR_ITEMS_EDIT */.Qz:
            return {
                ...state,
                popularItems: action.payload
            };
        case actionTypes/* CART_COUPON_ADD */.IQ:
            return {
                ...state,
                isSending: false,
                couponName: action.payload.name,
                couponDiscount: action.payload.discount,
                couponError: null
            };
        case actionTypes/* CART_COUPON_ERROR */.R:
            return {
                ...state,
                isSending: false,
                couponError: action.payload
            };
        case actionTypes/* CART_COUPON_TOTAL */.X7:
            return {
                ...state,
                totalWtihCoupon: action.payload
            };
        case actionTypes/* CART_COUPON_CLEAR */.Sk:
            return {
                ...state,
                totalWtihCoupon: null,
                couponError: null,
                couponDiscount: null,
                couponName: null
            };
        default:
            return state;
    }
};
/* harmony default export */ const cart = (cartReducer);

;// CONCATENATED MODULE: ./redux/reducers/search.js

const search_initialState = {
    searchProducts: []
};
const searchReducer = (state = search_initialState, action)=>{
    switch(action.type){
        case actionTypes/* SEARCH_EDIT */.SF:
            return {
                ...state,
                searchProducts: action.payload
            };
        default:
            return state;
    }
};
/* harmony default export */ const search = (searchReducer);

;// CONCATENATED MODULE: external "@reduxjs/toolkit"
const toolkit_namespaceObject = require("@reduxjs/toolkit");
;// CONCATENATED MODULE: external "redux-persist"
const external_redux_persist_namespaceObject = require("redux-persist");
;// CONCATENATED MODULE: external "redux-persist/lib/storage"
const storage_namespaceObject = require("redux-persist/lib/storage");
var storage_default = /*#__PURE__*/__webpack_require__.n(storage_namespaceObject);
;// CONCATENATED MODULE: ./redux/reducers/rootReducer.js
// import { combineReducers } from 'redux';








const profileConfig = {
    key: "online-store-profile",
    storage: (storage_default()),
    whitelist: [
        "userInfo",
        "shippingInfo",
        "isLoggedIn"
    ]
};
const cartConfig = {
    key: "online-store-cart",
    storage: (storage_default()),
    whitelist: [
        "cartItems",
        "total",
        "quantity"
    ]
};
const rootReducer = (0,toolkit_namespaceObject.combineReducers)({
    profile: (0,external_redux_persist_namespaceObject.persistReducer)(profileConfig, profile),
    products: products,
    cart: (0,external_redux_persist_namespaceObject.persistReducer)(cartConfig, cart),
    adminProduct: adminProduct,
    search: search
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = (0,toolkit_namespaceObject.configureStore)({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    external_redux_persist_namespaceObject.FLUSH,
                    external_redux_persist_namespaceObject.REHYDRATE,
                    external_redux_persist_namespaceObject.PAUSE,
                    external_redux_persist_namespaceObject.PERSIST,
                    external_redux_persist_namespaceObject.PURGE,
                    external_redux_persist_namespaceObject.REGISTER
                ]
            }
        })
});
const persistor = (0,external_redux_persist_namespaceObject.persistStore)(store);
/* harmony default export */ const reducers_rootReducer = (store);


/***/ }),

/***/ 1663:
/***/ (() => {



/***/ }),

/***/ 163:
/***/ (() => {



/***/ }),

/***/ 2167:
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ 3918:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 4486:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-blur-svg.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 9552:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-loader");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 2470:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils/warn-once.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 1127:
/***/ ((module) => {

"use strict";
module.exports = require("redux-persist/integration/react");

/***/ }),

/***/ 3590:
/***/ ((module) => {

"use strict";
module.exports = import("react-toastify");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [210,676,664,121,327,329,31,383,309,412], () => (__webpack_exec__(8484)));
module.exports = __webpack_exports__;

})();