"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchErrors = catchErrors;
exports.classNames = classNames;
exports.convertMessage = convertMessage;
exports.getDateString = exports.formatMoney = exports.firestampToDate = exports.daysBetween = exports.dateParser = void 0;
exports.isNumeric = isNumeric;
exports.messageTime = messageTime;
exports.partMessage = partMessage;
exports.randomIntFromInterval = randomIntFromInterval;
exports.serializeQuery = serializeQuery;
exports.useErrorHandler = useErrorHandler;
function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
}

function partMessage(content, type) {
    return {
        type: type || "text",
        content: content
    };
}
function convertMessage(data) {
    if (!data) return null;
    return {
        createdAt: data.createdAt || new Date(),
        author: data.role,
        message: data.parts || partMessage(data.content),
        media: data.media,
        isAI: data.role === "assistant",
        isSystemMessage: data.role === "system",
        context: data.context || null
    };
}
var firestampToDate = function firestampToDate(fs) {
    return fs !== null && fs !== void 0 && fs._seconds ? new Date(fs._seconds * 1000) : null;
};
exports.firestampToDate = firestampToDate;
function useErrorHandler() {
    function handleError(e) {
        catchErrors(e, window.alert);
    }

    return handleError;
}
function catchErrors(error, cb) {
    error = error || {};
    console.log(error);
    if (error.response) {
        var _error$response$data, _error$response$data2;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.body);
        console.log(error.response.status);
        console.log(error.response.headers);
        if ((_error$response$data = error.response.data) !== null && _error$response$data !== void 0 && _error$response$data.message) cb && cb("Error: " + error.response.data.message); else if ((_error$response$data2 = error.response.data) !== null && _error$response$data2 !== void 0 && _error$response$data2.error) cb && cb("Error: " + error.response.data.error); else cb && cb("An error occurred.");
    } else if (error.data) {
        var _error$data, _error$data2;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.data);
        console.log(error.status);
        console.log(error.headers);
        if ((_error$data = error.data) !== null && _error$data !== void 0 && _error$data.message) cb && cb("Error: " + error.data.message); else if ((_error$data2 = error.data) !== null && _error$data2 !== void 0 && _error$data2.error) cb && cb("Error: " + error.data.error); else cb && cb("An error occurred.");
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        cb && cb("An error occurred.");
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        if (error.message) cb && cb("Error: " + error.message); else cb && cb("An error occurred.");
    }
    console.log(error.config);
    return false;
}
var daysBetween = function daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.floor((endDate - startDate) / millisecondsPerDay).toFixed(0);
};
exports.daysBetween = daysBetween;
function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return !isNaN(str) &&
        // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}

/**
 * Date string in format DD.MM.YYYY
 * @param date
 */
var getDateString = function getDateString(date) {
    if (!date) return null;
    date = typeof date === 'string' ? new Date(date) : date;
    var m = "" + (date.getMonth() + 1).toString(),
        d = "" + date.getDate();
    if (m.length === 1) m = "0" + m;
    if (d.length === 1) d = "0" + d;
    return "".concat(d, ".").concat(m, ".").concat(date.getFullYear());
};
exports.getDateString = getDateString;
function classNames() {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }
    return classes.filter(Boolean).join(' ');
}

var decimal = ",",
    thousands = ".";
var formatMoney = function formatMoney(amount) {
    var forgetDecimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    try {
        var decimalCount = 2;
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        var negativeSign = amount < 0 ? "-" : "";
        var i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        var j = i.length > 3 ? i.length % 3 : 0;
        var decs = Math.abs(amount - i);
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (!forgetDecimals || forgetDecimals && decs !== 0 ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e);
    }
};
exports.formatMoney = formatMoney;
var dateParser = function dateParser(v) {
    // v is a string of "YYYY-MM-DD" format
    var match = /(\d{4})-(\d{2})-(\d{2})/.exec(v);
    if (match === null) return;
    var d = new Date(Date.UTC(match[1], parseInt(match[2], 10) - 1, match[3]));
    if (isNaN(d)) return;
    return d;
};
exports.dateParser = dateParser;
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function messageTime(timestamp) {
    if (!(timestamp !== null && timestamp !== void 0 && timestamp.getTime)) return "";
    var timePassedInSeconds = (Date.now() - timestamp.getTime()) / 1000;
    if (timePassedInSeconds < 5) {
        return 'Now';
    }
    if (timePassedInSeconds < 60) {
        return "".concat((Math.floor(timePassedInSeconds / 5) * 5).toFixed(0), "s");
    }
    var timePassedInMinutes = Math.floor(timePassedInSeconds / 60);
    if (timePassedInMinutes < 60) {
        return "".concat(timePassedInMinutes.toFixed(0), "m");
    }
    var date = new Date(timestamp.getTime());
    var hours = String(date.getHours());
    var minutes = String(date.getMinutes()).padStart(2, '0');
    return "".concat(hours, ":").concat(minutes);
}
function serializeQuery(params, prefix) {
    if (!params) return "";
    var query = Object.keys(params).map(function (key) {
        var value = params[key];
        if (params.constructor === Array) key = "".concat(prefix, "[").concat(key, "]"); else if (params.constructor === Object) key = prefix ? "".concat(prefix, "[").concat(key, "]") : key;
        if (_typeof(value) === 'object') return serializeQuery(value, key); else return "".concat(key, "=").concat(encodeURIComponent(value));
    });
    return [].concat.apply([], query).join('&');
}
