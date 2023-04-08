"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Product;
var _react = _interopRequireDefault(require("react"));
var _helpers = require("../helpers");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function Product(_ref) {
    var _item$params;
    var products = _ref.products,
        item = _ref.item;
    if (!products) return null;
    if (!(item !== null && item !== void 0 && (_item$params = item.params) !== null && _item$params !== void 0 && _item$params[0])) return null;
    var params = item.params[0].split(",");
    return /*#__PURE__*/_react.default.createElement("div", {
        className: "overflow-x-auto max-w-[100%]"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "my-2 flex gap-x-4 gap-y-4"
    }, params.map(function (item, index) {
        var product = products.find(function (p) {
            return "" + p.id === ("" + item).trim();
        });
        if (!product) return null;
        return /*#__PURE__*/_react.default.createElement("div", {
            key: product.id,
            className: "min-w-[200px] max-w-[200px] group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-700"
        }, /*#__PURE__*/_react.default.createElement("div", {
            className: "aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-48"
        }, /*#__PURE__*/_react.default.createElement("img", {
            src: product.thumb,
            alt: product.h,
            className: "h-full w-full object-cover object-center sm:h-full sm:w-full"
        })), /*#__PURE__*/_react.default.createElement("div", {
            className: "flex flex-1 flex-col space-y-2 p-4"
        }, /*#__PURE__*/_react.default.createElement("h3", {
            className: "text-sm font-medium text-gray-900 dark:text-white"
        }, /*#__PURE__*/_react.default.createElement("a", {
            href: "#"
        }, /*#__PURE__*/_react.default.createElement("span", {
            "aria-hidden": "true",
            className: "absolute inset-0"
        }), product.h)), /*#__PURE__*/_react.default.createElement("p", {
            className: "text-sm text-gray-500 dark:text-gray-300"
        }, product.desc), /*#__PURE__*/_react.default.createElement("div", {
            className: "flex flex-1 flex-col justify-end"
        }, /*#__PURE__*/_react.default.createElement("p", {
            className: "text-sm italic text-gray-500 dark:text-gray-400"
        }, product.brand), /*#__PURE__*/_react.default.createElement("p", {
            className: "text-base font-medium text-gray-900 dark:text-gray-300"
        }, (0, _helpers.formatMoney)(product.price), " \u20AC"))));
    })));
}
