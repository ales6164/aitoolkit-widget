"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Message;
var _helpers = require("../helpers");
var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function messagePartsToString(parts, essentials) {
    if (!parts || !parts.map) return "";
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, parts.map(function (p) {
        var _p$content, _p$content3, _p$content4, _p$content$params;
        switch (p.type) {
            case "text":
                return p.content;
            default:
                if (essentials && essentials.hasOwnProperty((_p$content = p.content) === null || _p$content === void 0 ? void 0 : _p$content.command)) {
                    var _p$content2;
                    var componentFun = essentials[(_p$content2 = p.content) === null || _p$content2 === void 0 ? void 0 : _p$content2.command];
                    return componentFun(p.content);
                }
                return (_p$content3 = p.content) !== null && _p$content3 !== void 0 && _p$content3.command ? ((_p$content4 = p.content) === null || _p$content4 === void 0 ? void 0 : _p$content4.command) + "[`" + ((_p$content$params = p.content.params) === null || _p$content$params === void 0 ? void 0 : _p$content$params.join(", ")) + "`]" : JSON.stringify(p.content);
        }
    }));
}
function Message(_ref) {
    var item = _ref.item,
        itemIdx = _ref.itemIdx,
        arr = _ref.arr,
        essentials = _ref.essentials;

    function emptyState() {
        return arr.length - 1 === itemIdx ? /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("span", {
            className: "animate-[pulse_1s_0ms_infinite]"
        }, "."), /*#__PURE__*/_react.default.createElement("span", {
            className: "animate-[pulse_1s_200ms_infinite]"
        }, "."), /*#__PURE__*/_react.default.createElement("span", {
            className: "animate-[pulse_1s_400ms_infinite]"
        }, ".")) : /*#__PURE__*/_react.default.createElement("span", {
            className: "text-gray-400"
        }, "Something went wrong");
    }

    function renderMsg(className) {
        return /*#__PURE__*/_react.default.createElement("div", {
            className: "flex flex-col gap-y-2 max-width-[100%] overflow-hidden"
        }, /*#__PURE__*/_react.default.createElement("div", {
            className: (0, _helpers.classNames)(className, "flex gap-x-2 items-end overflow-hidden")
        }, /*#__PURE__*/_react.default.createElement("div", {
            className: "whitespace-pre-wrap max-width-[100%] overflow-hidden"
        }, messagePartsToString(item.message, essentials) || emptyState()), item.message && /*#__PURE__*/_react.default.createElement("span", {
            className: "text-xs opacity-75 flex-shrink-0"
        }, (0, _helpers.messageTime)(item.createdAt))));
    }

    return /*#__PURE__*/_react.default.createElement("li", null, item.isAI ? /*#__PURE__*/_react.default.createElement("div", {
        className: "flex justify-start mr-8 gap-x-2"
    }, renderMsg("bg-gray-100 dark:bg-gray-600 rounded-3xl py-2 px-4 text-sm text-gray-900 dark:text-gray-50", true)) : item.isSystemMessage ? /*#__PURE__*/_react.default.createElement("div", {
        className: "flex justify-center mx-8"
    }, /*#__PURE__*/_react.default.createElement("p", {
        className: "whitespace-pre-wrap py-2 px-4 text-sm text-gray-700 dark:text-gray-400 text-center"
    }, messagePartsToString(item.message) || emptyState())) : /*#__PURE__*/_react.default.createElement("div", {
        className: "flex justify-end ml-8"
    }, renderMsg("bg-primary-500 rounded-3xl py-2 px-4 text-sm text-gray-50")));
}
