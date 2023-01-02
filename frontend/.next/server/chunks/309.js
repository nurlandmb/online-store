"use strict";
exports.id = 309;
exports.ids = [309];
exports.modules = {

/***/ 7309:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hK": () => (/* binding */ signInHandler),
/* harmony export */   "w7": () => (/* binding */ signOut)
/* harmony export */ });
/* unused harmony exports userSignIn, userSignInSuccess, userSignInError */
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2031);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


const signInHandler = (user)=>async (dispatch)=>{
        dispatch(userSignIn());
        try {
            const { data  } = await axios__WEBPACK_IMPORTED_MODULE_0___default().post("/api/user/signin", {
                ...user
            });
            dispatch(userSignInSuccess(data));
        // localStorage.setItem('nurlan-store-userInfo', JSON.stringify(data))
        } catch (err) {
            console.log(err);
            dispatch(userSignInError(err));
        }
    };
const signOut = ()=>{
    // localStorage.removeItem('nurlan-store-userInfo');
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__/* .USER_SIGNOUT */ .KY
    };
};
const userSignIn = ()=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__/* .USER_SIGNIN */ .lZ
    };
};
const userSignInSuccess = (data)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__/* .USER_SIGNIN_SUCCESS */ .GW,
        payload: data
    };
};
const userSignInError = (err)=>{
    return {
        type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__/* .USER_SIGNIN_ERROR */ .N_,
        payload: err
    };
};


/***/ })

};
;