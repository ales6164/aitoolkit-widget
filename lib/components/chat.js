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
exports.default = Chat;
var _solid = require("@heroicons/react/20/solid");
var _react = _interopRequireWildcard(require("react"));
var _helpers = require("../helpers");
var _spinner = _interopRequireDefault(require("../spinner"));
var _outline = require("@heroicons/react/24/outline");
var _message = _interopRequireDefault(require("./message"));
var _reactScrollToBottom = _interopRequireDefault(require("react-scroll-to-bottom"));
var _react2 = require("@headlessui/react");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

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

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) return;
                _n = !1;
            } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) ;
        } catch (err) {
            _d = !0, _e = err;
        } finally {
            try {
                if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function Chat(_ref) {
    var _bot$data, _bot$data2;
    var bot = _ref.bot,
        className = _ref.className,
        _ref$showHeader = _ref.showHeader,
        showHeader = _ref$showHeader === void 0 ? true : _ref$showHeader,
        _ref$readOnly = _ref.readOnly,
        readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
        essentials = _ref.essentials,
        _ref$t = _ref.t,
        t = _ref$t === void 0 ? {} : _ref$t;

    function onClearChatHistory() {
        bot.resetConversation();
    }

    var _useState = (0, _react.useState)(false),
        _useState2 = _slicedToArray(_useState, 2),
        showText = _useState2[0],
        setShowText = _useState2[1];
    return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _helpers.classNames)("relative w-full h-full bg-white dark:bg-gray-700 text-left items-stretch flex flex-col", className)
    }, bot.isLoading ? /*#__PURE__*/_react.default.createElement(_spinner.default, {
        className: "text-gray-900",
        big: true
    }) : !((_bot$data = bot.data) !== null && _bot$data !== void 0 && _bot$data.id) ? /*#__PURE__*/_react.default.createElement("div", {
        className: "flex h-full w-full items-center justify-center"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "text-center"
    }, /*#__PURE__*/_react.default.createElement(_outline.ChatBubbleLeftRightIcon, {
        className: "mx-auto h-12 w-12 text-gray-400"
    }), /*#__PURE__*/_react.default.createElement("h3", {
        className: "mt-2 text-sm font-semibold text-gray-900 dark:text-gray-50"
    }, "Not found"), /*#__PURE__*/_react.default.createElement("p", {
        className: "mt-1 text-sm text-gray-500 dark:text-gray-400"
    }, "Bot is unavailable or it does not exist."))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showHeader && /*#__PURE__*/_react.default.createElement("div", {
        className: "sticky top-0 flex flex-shrink-0 items-center justify-between bg-white dark:bg-gray-700 z-10 border-b border-gray-100 dark:border-gray-600 px-4 py-3"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "flex flex-1 items-center"
    }, bot.data.imageUrl && /*#__PURE__*/_react.default.createElement("div", {
        className: "relative inline-block"
    }, /*#__PURE__*/_react.default.createElement("img", {
        className: "h-9 w-9 rounded-full",
        src: bot.data.imageUrl,
        alt: ""
    }), /*#__PURE__*/_react.default.createElement("span", {
        className: "absolute right-0 top-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"
    })), /*#__PURE__*/_react.default.createElement("div", {
        className: "ml-3"
    }, /*#__PURE__*/_react.default.createElement("p", {
        className: "text-md font-medium text-gray-700 dark:text-gray-200"
    }, " ", ((_bot$data2 = bot.data) === null || _bot$data2 === void 0 ? void 0 : _bot$data2.name) || "Chatbot"))), _react2.Menu && _react2.Menu.Button && /*#__PURE__*/_react.default.createElement(_react2.Menu, {
        as: "div",
        className: "flex-shrink-0 pr-2"
    }, /*#__PURE__*/_react.default.createElement(_react2.Menu.Button, {
        className: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-700 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    }, /*#__PURE__*/_react.default.createElement("span", {
        className: "sr-only"
    }, "Open options"), /*#__PURE__*/_react.default.createElement(_solid.EllipsisVerticalIcon, {
        className: "h-5 w-5",
        "aria-hidden": "true"
    })), /*#__PURE__*/_react.default.createElement(_react2.Transition, {
        as: _react.Fragment,
        enter: "transition ease-out duration-100",
        enterFrom: "transform opacity-0 scale-95",
        enterTo: "transform opacity-100 scale-100",
        leave: "transition ease-in duration-75",
        leaveFrom: "transform opacity-100 scale-100",
        leaveTo: "transform opacity-0 scale-95"
    }, /*#__PURE__*/_react.default.createElement(_react2.Menu.Items, {
        className: "absolute right-10 top-3 z-10 mx-3 mt-1 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white dark:bg-gray-600 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "py-1"
    }, /*#__PURE__*/_react.default.createElement(_react2.Menu.Item, null, function (_ref2) {
        var active = _ref2.active;
        return /*#__PURE__*/_react.default.createElement("a", {
            href: "#",
            onClick: onClearChatHistory,
            className: (0, _helpers.classNames)(active ? 'bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-white', 'block px-4 py-2 text-sm')
        }, t.clearChatHistory || "Clear chat history");
    })))))), /*#__PURE__*/_react.default.createElement(_reactScrollToBottom.default, {
        className: "mb-1 h-full items-stretch flex flex-col grow overflow-y-auto overflow-x-hidden max-w-full"
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "flow-root px-4"
    }, /*#__PURE__*/_react.default.createElement("ul", {
        role: "list",
        className: "pt-4 pb-4 space-y-4"
    }, bot.messages.map(function (item, itemIdx, arr) {
        return /*#__PURE__*/_react.default.createElement(_message.default, {
            key: itemIdx,
            item: item,
            itemIdx: itemIdx,
            arr: arr,
            essentials: essentials
        });
    }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "grow"
    })), !readOnly && /*#__PURE__*/_react.default.createElement("div", {
        className: "px-4 pt-1.5 pb-2 sm:pb-3 lg:pb-4 bg-white dark:bg-gray-700"
    }, /*#__PURE__*/_react.default.createElement("form", {
        className: "min-w-0 flex flex-1 items-center m-0",
        onSubmit: bot.onSubmit
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "mr-4"
    }, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: function onClick() {
            return onClearChatHistory();
        },
        className: "rounded-full bg-primary-600 p-2 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all duration-300 overflow-hidden",
        onMouseEnter: function onMouseEnter() {
            return setShowText(true);
        },
        onMouseLeave: function onMouseLeave() {
            return setShowText(false);
        }
    }, /*#__PURE__*/_react.default.createElement("div", {
        className: "flex items-center"
    }, /*#__PURE__*/_react.default.createElement(_outline.FireIcon, {
        className: "h-5 w-5",
        "aria-hidden": "true"
    }), /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _helpers.classNames)("text-sm transition-all duration-300 inline-block overflow-hidden whitespace-nowrap", showText ? 'max-w-sm ml-2 mr-2' : 'max-w-0')
    }, t.newTopic || "New topic")))), /*#__PURE__*/_react.default.createElement("div", {
        className: "grow"
    }, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "message",
        className: "sr-only"
    }, "Message"), /*#__PURE__*/_react.default.createElement("textarea", {
        ref: bot.input,
        id: "message",
        onKeyDown: bot.onKeyDown,
        onChange: bot.onChange,
        rows: 1,
        className: "resize-none py-2 overflow-y-auto block w-full bg-gray-100 dark:bg-gray-600 rounded-2xl border-0 shadow-sm outline-none focus:ring-0 sm:text-sm text-gray-900 dark:text-gray-50 placeholder-gray-500 dark:placeholder-gray-400",
        placeholder: t.typeMessage || "Type a message...",
        autoComplete: "off"
    })), /*#__PURE__*/_react.default.createElement("div", {
        className: "ml-4"
    }, /*#__PURE__*/_react.default.createElement("button", {
        type: "submit",
        disabled: bot.isTyping,
        className: "inline-flex justify-center items-center rounded-full border-0 p-1.5 text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:text-gray-500"
    }, /*#__PURE__*/_react.default.createElement(_solid.PaperAirplaneIcon, {
        className: "h-5 w-5",
        "aria-hidden": "true"
    })))))));
}
