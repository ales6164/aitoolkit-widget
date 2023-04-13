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
exports.default = useBot;
var _react = require("react");
var _helpers = require("../helpers");

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _regeneratorRuntime() {
    "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    _regeneratorRuntime = function _regeneratorRuntime() {
        return exports;
    };
    var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty,
        defineProperty = Object.defineProperty || function (obj, key, desc) {
            obj[key] = desc.value;
        }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator",
        asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
        toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
        return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), obj[key];
    }

    try {
        define({}, "");
    } catch (err) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
            generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
        return defineProperty(generator, "_invoke", {value: makeInvokeMethod(innerFn, self, context)}), generator;
    }

    function tryCatch(fn, obj, arg) {
        try {
            return {type: "normal", arg: fn.call(obj, arg)};
        } catch (err) {
            return {type: "throw", arg: err};
        }
    }

    exports.wrap = wrap;
    var ContinueSentinel = {};

    function Generator() {
    }

    function GeneratorFunction() {
    }

    function GeneratorFunctionPrototype() {
    }

    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
        return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

    function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
            define(prototype, method, function (arg) {
                return this._invoke(method, arg);
            });
        });
    }

    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
                var result = record.arg, value = result.value;
                return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
                    invoke("next", value, resolve, reject);
                }, function (err) {
                    invoke("throw", err, resolve, reject);
                }) : PromiseImpl.resolve(value).then(function (unwrapped) {
                    result.value = unwrapped, resolve(result);
                }, function (error) {
                    return invoke("throw", error, resolve, reject);
                });
            }
            reject(record.arg);
        }

        var previousPromise;
        defineProperty(this, "_invoke", {
            value: function value(method, arg) {
                function callInvokeWithMethodAndArg() {
                    return new PromiseImpl(function (resolve, reject) {
                        invoke(method, arg, resolve, reject);
                    });
                }

                return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
            }
        });
    }

    function makeInvokeMethod(innerFn, self, context) {
        var state = "suspendedStart";
        return function (method, arg) {
            if ("executing" === state) throw new Error("Generator is already running");
            if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
            }
            for (context.method = method, context.arg = arg; ;) {
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
                    if ("suspendedStart" === state) throw state = "completed", context.arg;
                    context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                    if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                    return {value: record.arg, done: context.done};
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
            }
        };
    }

    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method, method = delegate.iterator[methodName];
        if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
        var record = tryCatch(method, delegate.iterator, context.arg);
        if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
        var info = record.arg;
        return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }

    function pushTryEntry(locs) {
        var entry = {tryLoc: locs[0]};
        1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal", delete record.arg, entry.completion = record;
    }

    function Context(tryLocsList) {
        this.tryEntries = [{tryLoc: "root"}], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }

    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
                    return next.value = undefined, next.done = !0, next;
                };
                return next.next = next;
            }
        }
        return {next: doneResult};
    }

    function doneResult() {
        return {value: undefined, done: !0};
    }

    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
        var ctor = "function" == typeof genFun && genFun.constructor;
        return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
        return {__await: arg};
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
        return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        void 0 === PromiseImpl && (PromiseImpl = Promise);
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
        });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
        return this;
    }), define(Gp, "toString", function () {
        return "[object Generator]";
    }), exports.keys = function (val) {
        var object = Object(val), keys = [];
        for (var key in object) keys.push(key);
        return keys.reverse(), function next() {
            for (; keys.length;) {
                var key = keys.pop();
                if (key in object) return next.value = key, next.done = !1, next;
            }
            return next.done = !0, next;
        };
    }, exports.values = values, Context.prototype = {
        constructor: Context, reset: function reset(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        }, stop: function stop() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
        }, dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;

            function handle(loc, caught) {
                return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
            }

            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i], record = entry.completion;
                if ("root" === entry.tryLoc) return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                    } else {
                        if (!hasFinally) throw new Error("try statement without catch or finally");
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    }
                }
            }
        }, abrupt: function abrupt(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
        }, complete: function complete(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
        }, finish: function finish(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
            }
        }, catch: function _catch(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if ("throw" === record.type) {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            throw new Error("illegal catch attempt");
        }, delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            return this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
        }
    }, exports;
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
    }
    return keys;
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {value: value, enumerable: true, configurable: true, writable: true});
    } else {
        obj[key] = value;
    }
    return obj;
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
}

function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (_typeof(res) !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this, args = arguments;
        return new Promise(function (resolve, reject) {
            var gen = fn.apply(self, args);

            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }

            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }

            _next(undefined);
        });
    };
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

var API_URL = process.env.REACT_APP_API_URI || "https://chat-gpt-374521.oa.r.appspot.com/v1";
var STREAMING_API_URI = process.env.REACT_APP_STREAMING_API_URI || "https://api2.aitoolkit.dev/v1";
var ROLE = {
    SYSTEM: "system",
    USER: "user",
    ASSISTANT: "assistant"
};

function useBot() {
    var _input$current;
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        chatId: null,
        id: null,
        startMessage: null,
        enableLocalStorage: false,
        fetchHistory: false,
        headers: {},
        customCommands: null
    };
    var _useState = (0, _react.useState)(null),
        _useState2 = _slicedToArray(_useState, 2),
        chatId = _useState2[0],
        setChatId = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        data = _useState4[0],
        setData = _useState4[1];
    var _useState5 = (0, _react.useState)(config.startMessage ? [createMessage(new Date(), ROLE.SYSTEM, [(0, _helpers.partMessage)(config.startMessage)], false, true)] : []),
        _useState6 = _slicedToArray(_useState5, 2),
        messages = _useState6[0],
        setMessages = _useState6[1];
    var _useState7 = (0, _react.useState)(false),
        _useState8 = _slicedToArray(_useState7, 2),
        isTyping = _useState8[0],
        setIsTyping = _useState8[1];
    var _useState9 = (0, _react.useState)(true),
        _useState10 = _slicedToArray(_useState9, 2),
        isLoading = _useState10[0],
        setIsLoading = _useState10[1];
    var input = (0, _react.useRef)();
    var _useState11 = (0, _react.useState)(0),
        _useState12 = _slicedToArray(_useState11, 2),
        normalHeight = _useState12[0],
        setNormalHeight = _useState12[1];
    (0, _react.useEffect)(function () {
        return init(config === null || config === void 0 ? void 0 : config.chatId);
    }, [config === null || config === void 0 ? void 0 : config.id, config === null || config === void 0 ? void 0 : config.chatId]);
    (0, _react.useEffect)(function () {
        var _window, _window$localStorage;
        if (config !== null && config !== void 0 && config.enableLocalStorage && (_window = window) !== null && _window !== void 0 && (_window$localStorage = _window.localStorage) !== null && _window$localStorage !== void 0 && _window$localStorage.setItem && (data === null || data === void 0 ? void 0 : data.id) === config.id && messages !== null && messages !== void 0 && messages.length) {
            window.localStorage.setItem("bot-".concat(config.id), JSON.stringify({
                id: config.id,
                chatId: chatId,
                messages: messages,
                timestamp: Date.now()
            }));
        }
    }, [chatId, messages, config === null || config === void 0 ? void 0 : config.enableLocalStorage]);
    (0, _react.useEffect)(function () {
        //if (data !== false) setIsLoading(false)
        data && setTimeout(function () {
            return input.current && input.current.focus();
        }, 250);
    }, [data]);
    (0, _react.useEffect)(function () {
        !isTyping && input.current && input.current.focus();
    }, [isTyping]);
    (0, _react.useEffect)(resizeTextArea, [(_input$current = input.current) === null || _input$current === void 0 ? void 0 : _input$current.value, input.current]);

    function init(defaultChatId) {
        var messages = [],
            botId = config === null || config === void 0 ? void 0 : config.id,
            chatId = defaultChatId || null;
        if (botId) {
            var _window2, _window2$localStorage;
            if (config.startMessage) messages = [createMessage(new Date(), ROLE.SYSTEM, [(0, _helpers.partMessage)(config.startMessage)], false, true)];
            if (config.enableLocalStorage && (_window2 = window) !== null && _window2 !== void 0 && (_window2$localStorage = _window2.localStorage) !== null && _window2$localStorage !== void 0 && _window2$localStorage.getItem) {
                var history = window.localStorage.getItem("bot-".concat(config.id));
                if (history) {
                    try {
                        var parsed = JSON.parse(history);
                        if ((parsed === null || parsed === void 0 ? void 0 : parsed.timestamp) > Date.now() - 1000 * 60 * 60 * 24) {
                            if ((parsed === null || parsed === void 0 ? void 0 : parsed.chatId) === chatId || !chatId) {
                                if (parsed !== null && parsed !== void 0 && parsed.chatId) chatId = parsed.chatId;
                                if (parsed !== null && parsed !== void 0 && parsed.messages) messages = parsed === null || parsed === void 0 ? void 0 : parsed.messages.map(function (m) {
                                    return createMessage(new Date(m.createdAt), m.author, m.message, m.author === ROLE.ASSISTANT, m.author === ROLE.SYSTEM, m.context);
                                });
                            }
                        } else window.localStorage.removeItem("bot-".concat(config.id));
                    } catch (e) {
                        console.error(e);
                        window.localStorage.removeItem("bot-".concat(config.id));
                    }
                }
            }
            if ((data === null || data === void 0 ? void 0 : data.id) !== config.id) {
                setData(false);
                setIsLoading(true);
                fetch("".concat(API_URL, "/bots/").concat(botId), {
                    headers: config.headers
                }).then( /*#__PURE__*/function () {
                    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(res) {
                        return _regeneratorRuntime().wrap(function _callee$(_context) {
                            while (1) switch (_context.prev = _context.next) {
                                case 0:
                                    _context.t0 = _objectSpread;
                                    _context.t1 = _objectSpread({}, res);
                                    _context.t2 = {};
                                    _context.next = 5;
                                    return res.json();
                                case 5:
                                    _context.t3 = _context.sent;
                                    _context.t4 = {
                                        data: _context.t3
                                    };
                                    return _context.abrupt("return", (0, _context.t0)(_context.t1, _context.t2, _context.t4));
                                case 8:
                                case "end":
                                    return _context.stop();
                            }
                        }, _callee);
                    }));
                    return function (_x2) {
                        return _ref.apply(this, arguments);
                    };
                }()).then(function (_ref2) {
                    var data = _ref2.data;
                    if (botId === config.id) {
                        setData(data);
                        return fetchChatHistory(botId, chatId, messages);
                    }
                }).catch(function (e) {
                    setData(null);
                    (0, _helpers.catchErrors)(e, window.alert);
                }).finally(function () {
                    setIsLoading(false);
                });
            } else {
                setIsLoading(true);
                fetchChatHistory(botId, chatId, messages).catch(function (e) {
                    (0, _helpers.catchErrors)(e, window.alert);
                }).finally(function () {
                    setIsLoading(false);
                });
            }
        } else {
            setData(false);
            setIsLoading(false);
        }
        setChatId(chatId || null);
        setIsTyping(false);
        setMessages(messages);
    }

    function resetConversation() {
        var _window3, _window3$localStorage;
        if (config !== null && config !== void 0 && config.enableLocalStorage && (_window3 = window) !== null && _window3 !== void 0 && (_window3$localStorage = _window3.localStorage) !== null && _window3$localStorage !== void 0 && _window3$localStorage.setItem && (data === null || data === void 0 ? void 0 : data.id) === config.id) {
            window.localStorage.removeItem("bot-".concat(config.id));
        }
        init();
    }

    function fetchChatHistory(_x3, _x4, _x5) {
        return _fetchChatHistory.apply(this, arguments);
    }

    function _fetchChatHistory() {
        _fetchChatHistory = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(botId, chatId, messages) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(config.chatId === chatId && chatId)) {
                            _context3.next = 2;
                            break;
                        }
                        return _context3.abrupt("return", fetch("".concat(API_URL, "/bots/").concat(botId, "/chat/").concat(chatId), {
                            headers: config.headers
                        }).then( /*#__PURE__*/function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(res) {
                                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                                    while (1) switch (_context2.prev = _context2.next) {
                                        case 0:
                                            _context2.t0 = _objectSpread;
                                            _context2.t1 = _objectSpread({}, res);
                                            _context2.t2 = {};
                                            _context2.next = 5;
                                            return res.json();
                                        case 5:
                                            _context2.t3 = _context2.sent;
                                            _context2.t4 = {
                                                data: _context2.t3
                                            };
                                            return _context2.abrupt("return", (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t4));
                                        case 8:
                                        case "end":
                                            return _context2.stop();
                                    }
                                }, _callee2);
                            }));
                            return function (_x7) {
                                return _ref3.apply(this, arguments);
                            };
                        }()).then(function (_ref4) {
                            var data = _ref4.data;
                            if (botId === config.id && config.chatId === chatId && data !== null && data !== void 0 && data.results) {
                                setMessages([].concat(_toConsumableArray(messages), _toConsumableArray(data.results.map(function (m) {
                                    return createMessage((0, _helpers.firestampToDate)(m.createdAt), m.role, m.parts || [(0, _helpers.partMessage)(m.content)], m.role === ROLE.ASSISTANT, m.role === ROLE.SYSTEM, m.context);
                                }))));
                            }
                        }));
                    case 2:
                    case "end":
                        return _context3.stop();
                }
            }, _callee3);
        }));
        return _fetchChatHistory.apply(this, arguments);
    }

    function resizeTextArea() {
        if (input.current) {
            var oneRowHeight = normalHeight;
            if (!oneRowHeight && input.current.scrollHeight > 0) {
                oneRowHeight = input.current.scrollHeight;
                setNormalHeight(oneRowHeight);
            }
            input.current.style.height = "auto";
            if (input.current.scrollHeight > oneRowHeight * 4) {
                input.current.style.height = oneRowHeight * 4 + "px";
                input.current.style.overflowY = "auto";
            } else {
                input.current.style.height = input.current.scrollHeight + "px";
                input.current.style.overflowY = "hidden";
            }
        }
    }

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            if (!e.repeat) onSubmit();
            e.preventDefault(); // Prevents the addition of a new line in the text field
        }
    }

    function onChange(e) {
        resizeTextArea();
    }

    function onSubmit(e) {
        e && e.preventDefault();
        if (input.current) {
            var message = input.current.value;
            if (isTyping || !message) return;
            input.current.focus();
            sendMessage(message);
            input.current.value = "";
            resizeTextArea();
        }
    }

    function createMessage(timestamp, author, messageParts, isAI) {
        var isSystemMessage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var context = arguments.length > 5 ? arguments[5] : undefined;
        return {
            createdAt: timestamp,
            author: author,
            message: messageParts,
            media: null,
            isAI: isAI,
            isSystemMessage: isSystemMessage,
            context: context || null
        };
    }

    function handleError(e, messages) {
        var _e$response;
        var data = (e === null || e === void 0 ? void 0 : (_e$response = e.response) === null || _e$response === void 0 ? void 0 : _e$response.data) || (e === null || e === void 0 ? void 0 : e.data);
        if (data !== null && data !== void 0 && data.error || data !== null && data !== void 0 && data.message) {
            setMessages([].concat(_toConsumableArray(messages), [createMessage(new Date(), ROLE.SYSTEM, [(0, _helpers.partMessage)((data === null || data === void 0 ? void 0 : data.message) || (data === null || data === void 0 ? void 0 : data.error))], false, true)]));
        } else {
            setMessages([].concat(_toConsumableArray(messages), [createMessage(new Date(), ROLE.SYSTEM, [(0, _helpers.partMessage)("Something went wrong. Please try again.")], false, true)]));
        }
    }

    function sendMessage(_x6) {
        return _sendMessage.apply(this, arguments);
    }

    function _sendMessage() {
        _sendMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(chatMessage) {
            var newMessage, newAIMessage, newMessages, _config$headers, queryParams, spl, query, eventSource, msgParts,
                context;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                    case 0:
                        if (!isTyping) {
                            _context5.next = 2;
                            break;
                        }
                        return _context5.abrupt("return");
                    case 2:
                        newMessage = createMessage(new Date(), ROLE.USER, [(0, _helpers.partMessage)(chatMessage)]), newAIMessage = createMessage(new Date(), ROLE.ASSISTANT, null, true), newMessages = [].concat(_toConsumableArray(messages), [newMessage]);
                        setMessages(newMessages);
                        setIsTyping(true);
                        setTimeout(function () {
                            setMessages([].concat(_toConsumableArray(newMessages), [newAIMessage]));
                        }, 300);
                        if (data !== null && data !== void 0 && data.stream) {
                            queryParams = {
                                message: chatMessage,
                                customCommands: config.customCommands || null
                            };
                            if ((_config$headers = config.headers) !== null && _config$headers !== void 0 && _config$headers.Authorization) {
                                spl = config.headers.Authorization.split(" ");
                                if (spl.length === 2) {
                                    queryParams["token"] = spl[1];
                                }
                            }
                            query = (0, _helpers.serializeQuery)(queryParams), eventSource = new EventSource(STREAMING_API_URI + (chatId ? "/bots/".concat(config.id, "/stream/").concat(chatId) : "/bots/".concat(config.id, "/stream")) + "?".concat(query), {
                                withCredentials: true
                            });
                            msgParts = [], context = null;
                            eventSource.addEventListener("context", function (e) {
                                context = JSON.parse(e.data);
                                setMessages([].concat(_toConsumableArray(newMessages), [createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)]));
                            }, false);
                            /*eventSource.addEventListener("media", (e) => {
                                media = JSON.parse(e.data)
                                setMessages([...newMessages, createMessage(new Date(), ROLE.ASSISTANT, partMessage(msg, true, false, context, media)])
                            }, false);*/
                            eventSource.addEventListener("command", function (e) {
                                var content = JSON.parse(e.data);
                                if (content) {
                                    msgParts.push((0, _helpers.partMessage)(content, "command"));
                                    setMessages([].concat(_toConsumableArray(newMessages), [createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)]));
                                }
                            }, false);
                            eventSource.onmessage = function (e) {
                                if (!chatId && e.lastEventId) setChatId(e.lastEventId);
                                var text = e.data;
                                if (typeof text === "string") {
                                    msgParts.push((0, _helpers.partMessage)(JSON.parse(text)));
                                    setMessages([].concat(_toConsumableArray(newMessages), [createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)]));
                                }
                            };
                            eventSource.onerror = function (error) {
                                setMessages([].concat(_toConsumableArray(newMessages), [createMessage(new Date(), ROLE.ASSISTANT, msgParts, true, false, context)]));
                                eventSource.close();
                                setIsTyping(false);
                            };
                        } else fetch(API_URL + (chatId ? "/bots/".concat(config.id, "/chat/").concat(chatId) : "/bots/".concat(config.id, "/chat")), {
                            method: "POST",
                            headers: _objectSpread({
                                "Content-Type": "application/json"
                            }, config.headers),
                            body: JSON.stringify({
                                message: chatMessage,
                                customCommands: config.customCommands || null
                            })
                        }).then( /*#__PURE__*/function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(res) {
                                return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                                    while (1) switch (_context4.prev = _context4.next) {
                                        case 0:
                                            _context4.t0 = _objectSpread;
                                            _context4.t1 = _objectSpread({}, res);
                                            _context4.t2 = {};
                                            _context4.next = 5;
                                            return res.json();
                                        case 5:
                                            _context4.t3 = _context4.sent;
                                            _context4.t4 = {
                                                data: _context4.t3
                                            };
                                            return _context4.abrupt("return", (0, _context4.t0)(_context4.t1, _context4.t2, _context4.t4));
                                        case 8:
                                        case "end":
                                            return _context4.stop();
                                    }
                                }, _callee4);
                            }));
                            return function (_x8) {
                                return _ref5.apply(this, arguments);
                            };
                        }()).then(function (res) {
                            if (res.data) {
                                if (res.data.chatId) setChatId(res.data.chatId);
                                if (res.data.message) {
                                    setMessages([].concat(_toConsumableArray(newMessages), [createMessage(new Date(), ROLE.ASSISTANT, res.data.message.parts, true, false, res.data.message.context, res.data.message.media)]));
                                    return;
                                }
                            }
                            handleError(res, newMessages);
                        }).catch(function (err) {
                            handleError(err, newMessages);
                        }).finally(function () {
                            setIsTyping(false);
                        });
                    case 7:
                    case "end":
                        return _context5.stop();
                }
            }, _callee5);
        }));
        return _sendMessage.apply(this, arguments);
    }

    return {
        data: data,
        isTyping: isTyping,
        messages: messages,
        resetConversation: resetConversation,
        isLoading: isLoading,
        onSubmit: onSubmit,
        onKeyDown: onKeyDown,
        onChange: onChange,
        input: input
    };
}
