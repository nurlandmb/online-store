"use strict";
exports.id = 186;
exports.ids = [186];
exports.modules = {

/***/ 6186:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pc": () => (/* binding */ categoriesFetchSuccess),
/* harmony export */   "QD": () => (/* binding */ loadProducts),
/* harmony export */   "Uy": () => (/* binding */ loadCategories),
/* harmony export */   "xq": () => (/* binding */ productsFetchSuccess)
/* harmony export */ });
/* unused harmony exports categoriesFetch, categoriesFetchError, productsFetch, productsFetchError */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2031);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3590);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1438);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_1__]);
react_toastify__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




(axios__WEBPACK_IMPORTED_MODULE_0___default().defaults.baseURL) = "http://localhost:5000";
const loadProducts = ()=>async (dispatch)=>{
        dispatch(productsFetch());
        try {
            const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/product");
            dispatch(productsFetchSuccess(data));
        } catch (err) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .getError */ .b)(err));
            dispatch(productsFetchError(err));
            console.log(err);
        }
    };
const loadCategories = ()=>async (dispatch)=>{
        dispatch(categoriesFetch());
        try {
            const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().get("/api/product/categories");
            dispatch(categoriesFetchSuccess(data));
        } catch (err) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .getError */ .b)(err));
            dispatch(categoriesFetchError(err));
        }
    };
const categoriesFetch = ()=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_3__/* .CATEGORIES_FETCH */ .h0
    };
};
const categoriesFetchSuccess = (data)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_3__/* .CATEGORIES_FETCH_SUCCESS */ .Be,
        payload: data
    };
};
const categoriesFetchError = (err)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_3__/* .CATEGORIES_FETCH_ERROR */ ._7,
        payload: err
    };
};
const productsFetch = ()=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_3__/* .PRODUCTS_FETCH */ .vb
    };
};
const productsFetchSuccess = (products)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_3__/* .PRODUCTS_FETCH_SUCCESS */ .x3,
        payload: products
    };
};
const productsFetchError = (err)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_3__/* .PRODUCTS_FETCH_ERROR */ .SM,
        payload: err
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1438:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b": () => (/* binding */ getError)
/* harmony export */ });
const getError = (error)=>{
    return error.response && (error.response.data.message || error.message);
};


/***/ })

};
;