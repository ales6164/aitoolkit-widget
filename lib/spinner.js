"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _helpers = require("./helpers");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}
var Spinner = function Spinner(props) {
    return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _helpers.classNames)(props.tiny ? "" : "flex h-full items-center justify-center", props.className)
    }, /*#__PURE__*/_react.default.createElement("svg", {
        className: (0, _helpers.classNames)("animate-spin", props.big ? "ml-0 mr-0 h-6 w-6" : "-ml-1 mr-3 ", props.tiny ? "ml-0 mr-0, h-4 h-4" : "h-5 w-5"),
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react.default.createElement("circle", {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4"
    }), /*#__PURE__*/_react.default.createElement("path", {
        className: "opacity-50",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    })));
};
var _default = Spinner;
exports.default = _default;
