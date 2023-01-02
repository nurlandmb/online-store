"use strict";
exports.id = 383;
exports.ids = [383];
exports.modules = {

/***/ 8383:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CA": () => (/* binding */ productDeleteHandler),
/* harmony export */   "D3": () => (/* binding */ editExistingProduct),
/* harmony export */   "IC": () => (/* binding */ productEditClose),
/* harmony export */   "NQ": () => (/* binding */ productEdit),
/* harmony export */   "ry": () => (/* binding */ createProduct)
/* harmony export */ });
/* unused harmony exports uploadFileHandler, productEditStart, productEditSuccess, productEditError */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3590);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2031);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_toastify__WEBPACK_IMPORTED_MODULE_1__]);
react_toastify__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const editExistingProduct = (product, user)=>async (dispatch)=>{
        if (!product.discount) product.priceWithDiscount = null;
        try {
            dispatch(productEditStart());
            const req = await axios__WEBPACK_IMPORTED_MODULE_0___default().post(`/api/product/edit/${product._id}`, product, {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("Продукт успешно отредактирован");
            dispatch(productEditSuccess());
        } catch (err) {
            dispatch(productEditError(err));
        }
    };
const productDeleteHandler = (product, user)=>async (dispatch)=>{
        try {
            dispatch(productEditStart());
            await axios__WEBPACK_IMPORTED_MODULE_0___default()["delete"](`/api/product/${product._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("Продукт успешно удален");
            dispatch(productEditSuccess());
        } catch (err) {
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.error(err);
            dispatch(productEditError(err));
        }
    };
const createProduct = (product, user)=>async (dispatch)=>{
        product = {
            ...product,
            name: product.name.trim(),
            description: product.description.trim(),
            category: product.category.trim(),
            price: Number(product.price.toString().trim()),
            priceWithDiscount: Number(product.priceWithDiscount.toString().trim())
        };
        try {
            dispatch(productEditStart());
            const req = await axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/product/create/", product, {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            });
            react_toastify__WEBPACK_IMPORTED_MODULE_1__.toast.success("Продукт успешно создан");
            dispatch(productEditSuccess());
        } catch (err) {
            dispatch(productEditError(err));
        }
    };
const uploadFileHandler = (e, user)=>async (dispatch)=>{
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        try {
            const { data  } = await axios.post("/api/upload", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${user.token}`
                }
            });
            return data;
        } catch (err) {
            return err;
        }
    };
const productEdit = (product, type = "create")=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_2__/* .PRODUCT_EDIT */ .rU,
        payload: {
            ...product,
            type
        }
    };
};
const productEditStart = ()=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_2__/* .PRODUCT_EDIT_START */ .BD
    };
};
const productEditClose = ()=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_2__/* .PRODUCT_EDIT_CLOSE */ .$t
    };
};
const productEditSuccess = ()=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_2__/* .PRODUCT_EDIT_SUCCESS */ .XZ
    };
};
const productEditError = (err)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_2__/* .PRODUCT_EDIT_ERROR */ .ZD,
        payload: err
    };
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;