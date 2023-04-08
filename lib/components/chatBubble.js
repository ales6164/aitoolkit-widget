"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
}

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ChatBubble;
var _react = _interopRequireWildcard(require("react"));
var _helpers = require("../helpers");
var _solid = require("@heroicons/react/20/solid");
var _react2 = require("@headlessui/react");

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
        return {default: obj};
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}

function ChatBubble(_ref) {
    var light = _ref.light,
        open = _ref.open,
        setOpen = _ref.setOpen,
        children = _ref.children;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: "fixed right-4 bottom-4 lg:right-10 lg:bottom-12 flex items-center justify-center"
    }, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: function onClick() {
            return setOpen(!open);
        },
        className: (0, _helpers.classNames)("z-10 inline-flex items-center rounded-full border border-transparent p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2", light ? "bg-primary-500 text-white hover:bg-primary-600 focus:bg-primary-500 shadow-primary-500" : "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-800")
    }, /*#__PURE__*/_react.default.createElement(_solid.ChatBubbleOvalLeftIcon, {
        className: "h-6 w-6",
        "aria-hidden": "true"
    }))), /*#__PURE__*/_react.default.createElement(_react2.Transition, {
        appear: true,
        show: open,
        as: _react.Fragment
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "relative z-10"
    }, /*#__PURE__*/_react.default.createElement(_react2.Transition.Child, {
        as: _react.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "fixed"
    })), /*#__PURE__*/_react.default.createElement("div", {
        className: "fixed top-0 left-0 right-0 bottom-20 lg:top-auto lg:left-auto lg:right-8 lg:bottom-28 lg:w-full lg:max-w-md lg:h-[600px] lg:max-h-[70vh]"
    }, /*#__PURE__*/_react.default.createElement(_react2.Transition.Child, {
        as: _react.Fragment,
        enter: "ease-out duration-300",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "w-screen lg:w-full h-full transform overflow-hidden rounded-b-2xl lg:rounded-2xl text-left items-stretch shadow-lg transition-all flex flex-col border border-gray-100 dark:border-0 dark:border-transparent"
    }, children))))));
}
