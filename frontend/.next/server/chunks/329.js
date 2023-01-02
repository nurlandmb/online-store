"use strict";
exports.id = 329;
exports.ids = [329];
exports.modules = {

/***/ 7329:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Popup(props) {
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.active) {
            console.log(document);
            document.body.parentElement.classList.add("no-scroll");
        } else {
            document.body.parentElement.classList.remove("no-scroll");
        }
    }, [
        props.active
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: props.active ? "overflow active" : "overflow",
                onClick: props.closePopup
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: props.active ? `popup ${props.addClass} active` : `popup ${props.addClass}`,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        className: "popup__close",
                        onClick: props.closePopup,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                            width: "15",
                            height: "15",
                            viewBox: "0 0 15 15",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                d: "M14.0111 10.8379L10.5016 7.32843L14.0111 3.81893C14.8733 2.9567 14.8549 1.52675 13.9923 0.664215C13.1298 -0.198325 11.6999 -0.216731 10.8376 0.645492L7.32812 4.15499L3.81862 0.645492C2.9564 -0.216731 1.52645 -0.198325 0.66391 0.664215C-0.19863 1.52675 -0.217036 2.9567 0.645187 3.81893L4.15469 7.32843L0.645187 10.8379C-0.217035 11.7002 -0.19863 13.1301 0.66391 13.9926C1.52645 14.8552 2.9564 14.8736 3.81862 14.0114L7.32812 10.5019L10.8376 14.0114C11.6998 14.8736 13.1298 14.8552 13.9923 13.9926C14.8549 13.1301 14.8733 11.7002 14.0111 10.8379Z",
                                fill: props.theme === "dark" ? "White" : "#000"
                            })
                        })
                    }),
                    props.children
                ]
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Popup);


/***/ })

};
;