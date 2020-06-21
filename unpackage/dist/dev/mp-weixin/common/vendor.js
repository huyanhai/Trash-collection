(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*****************************!*\
  !*** G:/外包/垃圾分类/pages.json ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************!*\
  !*** G:/外包/垃圾分类/libs/request.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get = get;exports.post = post;var _index = __webpack_require__(/*! ../config/index.js */ 11);

function get(url, data) {
  var authCode = String(uni.getStorageSync("authCode"));
  return new Promise(function (resolve, reject) {
    uni.showLoading();
    uni.request({
      method: 'GET',
      url: _index.BASE_URL + url,
      header: {
        authCode: authCode },

      timeout: _index.TIMEOUT,
      success: function success(res) {
        if (res.data.code !== 0) {
          uni.showToast({
            title: res.data.msg,
            icon: "none" });

        }
        resolve(res.data.result);
      },
      fail: function fail(err) {
        uni.showToast({
          title: err.msg,
          icon: 'none' });

        reject(err);
      },
      complete: function complete() {
        uni.hideLoading();
      } });

  });
}

function post(url, data) {
  var authCode = String(uni.getStorageSync("authCode"));
  console.log('开始请求post，authCode:', authCode);
  return new Promise(function (resolve, reject) {
    uni.showLoading();
    uni.request({
      method: 'POST',
      url: _index.BASE_URL + url,
      timeout: _index.TIMEOUT,
      header: {
        authCode: authCode },

      data: data,
      success: function success(res) {
        if (res.data.code !== 0) {
          uni.showToast({
            title: res.data.msg,
            icon: "none" });

        }
        resolve(res.data.result);
      },
      fail: function fail(err) {
        uni.showToast({
          title: err.msg,
          icon: 'none' });

        reject(err);
      },
      complete: function complete() {
        uni.hideLoading();
      } });

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 11 */
/*!**********************************!*\
  !*** G:/外包/垃圾分类/config/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.TIMEOUT = exports.BASE_URL = void 0;var BASE_URL = "http://103.66.216.78:18881/"; //请求地址
exports.BASE_URL = BASE_URL;var TIMEOUT = 30000; // ms
exports.TIMEOUT = TIMEOUT;

/***/ }),
/* 12 */
/*!************************************************!*\
  !*** G:/外包/垃圾分类/static/img sync ^\.\/.*\.png$ ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./complatebg.png": 100,
	"./icon-notice.png": 13,
	"./khs.png": 14,
	"./knowledge-s.png": 15,
	"./knowledge.png": 16,
	"./knowledge1-s.png": 17,
	"./knowledge1.png": 18,
	"./me-bg.png": 19,
	"./me-fl.png": 20,
	"./me-hz.png": 21,
	"./me-s.png": 22,
	"./me-tx.png": 23,
	"./me-xbg.png": 24,
	"./me.png": 25,
	"./notice.png": 26,
	"./qt.png": 27,
	"./question-bg.png": 28,
	"./shop-s.png": 29,
	"./shop.png": 30,
	"./yf.png": 31,
	"./yh.png": 32
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 12;

/***/ }),
/* 13 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/icon-notice.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACUUlEQVRIS72XS6hNYRTHfwuFSIiiGCAlFK5QJCluREaEgTCQJDIwoGRA0mVABh4xoCSPkIxuyYyJZCKPMiDkkRtlII/6s7R2vk7n3H22e76zpmfv9Tvr+V/byGySVgKzgE4zW1jgLCdX0jjgJvAeWGFm/bKDJQ0A7gKjgRftBJ8GtgLP2gKW5Ok8AWyPtOYHS/K0XgCWJ72TDxz13AQcBkbVNGzrwZImAmuBLcCEBhPSOzhqsyrS9Bx4AswDfgE9wHdgMDAGmA7MABxcZo3BksYD14E54eUS8AnYWea1id/rgyUNBR4AUxInl4GPucH7gIM1//wK8KHFYF+db4Ez3oQm6TEwrQZ8NdZcK1Pt4MIOOPgbMKgGfA14lyHiAtPjYK+lD35q3miellwRf3awR7e6BnwDeJMR3OXgucB9oH8Cdyl7nQH8JZpr/189lrQDOA4UenkLeNVicH09ltQJHAJmA7eBl20BF2mWNBYYFgtlUmThZ4yXd7o34mTAS7QIGFmyvaqJhKSHQEfi9KKZbUghkrwvloXg+5zWO6Uqg48CuxPQHTNb2ig6SfOBY5GJ9LHKYK95d+LhqZlN7S2toctHgF1J9JXBvs1coYYE7KuZee1LTdJm4GyMaDVwjJmPlWt0YSPMzGex1CRtA07+17EnaSNwPqF0mNmjUmo8IOkcsKDylSlpeIzRwPC1zsxcMpuy0Hrf+z8q39WS/BpZH6QuM9vTFPVf1DMdCiwxs8XFu6WfMDEm9+KFbjPzue2zlYKjybxD1wB7zexUn6l/HPwGpZD0+uqqUMMAAAAASUVORK5CYII="

/***/ }),
/* 14 */
/*!*************************************!*\
  !*** G:/外包/垃圾分类/static/img/khs.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/khs.png";

/***/ }),
/* 15 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge-s.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFGNDA0NUNBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFGNDA0NURBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOENCQkNGRkFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOENCQkQwMEFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqJD7uYAAAM3SURBVHja7N2/TxNhHMfx7/fagjEkOKCDChRkMSwmEMPg4sbA5ODkbGJ0NGqMSY2DJsqo/iUmygaJAzpqokw6mDgIiT8gEWjv+fpcAy1IRGPbe67c+5M8vbaU54573ffunuMCamZCspOIVQAIAQQQAgggBBBACCCAEEAIIIAQQA5Aiq188/mnF2W1uH5440t8x7+cEbHT9lufKvrIT24kzwfOnW3Md/nlq2pHfzKVm/7x4X4f6fEfcn6bjNX9rbeKObu7q3vV2MyWVOV5f6l074eLV5P339x6Fg7Ep89jvDYPkbct2WMU/GTcTMa/V2sXtKCT/vXXoLuslW9r97sVI6mOxkooHmoVZ9RiN+tb2GOIOZ1mr7+NItO9RwfDgqhauduro7lGS612e9y3UlAQwmlvZ6pjK72FCBCSY5D9qiMrVZL3Chn27QQVko3qGN4Um69JPO+fn9z5hZIBknplJBhiUvZtzFV/JiiDVEiY6mhiNAd1p0SqCcrQ9nvFqAeQVCtjz0jbRjdqbhcKIJ2tjj9i7EAZWa/FC1sHe4lcAZC0K2OvipQ3RRKUMhXSmer4d4xmqQxXa5sJyohGCkiQytirMuS0lqCMAtKGqCa7nv/FaJx9DVrNLYiTsbSWu3hQQczJlbb0Ux802iUqJKcBBBACCCAEEEAIIDlIpgeGfrS9qCKLwQeZIlN+1D7FSN10TnT3Tc6BtoyKmKUCkvldlpkG3ibSnX9XXMtKUEzSv/Mg7UvvXXNQD4FRn68zQLKCEQqlmHGMip9Ugi9HiiiMQxgYEkAAIYAAQgDJQbJ96STSJ5EWHodeDGfxNf9wNfcg6mRFCrIUfDlEltMaGmb/0kkch52/pTv/7rhz0ZzkJZmvkBCXwHfvrvh9yM5M+HY5fIXaBCBSv9o7Y85mGIcQQAgggBBAACGAAEIAAYQAQgABhAACCAkFYqIfWYWNfPatGhRE1eZw2F4X8mJj+VPYChk40ndbRd+DoR+0EF3XNvxV7FZ7WOs9Vpj0KA98e6sitRwhxKLyzlfGbH+peEba8N916v2amRDOsggggBBAACGAAEIAAYQAQgABhAACCAEEEJJWfgkwAGsk9yjsk5jjAAAAAElFTkSuQmCC"

/***/ }),
/* 16 */
/*!*******************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QThDQkJDRkRBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QThDQkJDRkVBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBOENCQkNGQkFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBOENCQkNGQ0FBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsU4tToAAAQiSURBVHja7J3PixxFFMffq57tRZNcggSyCSxGQcUQF39APJhrwIOXQMD8AbmsmFXUyx72IAgiaEBZyCEHwVP24K9DdA857E3IYZE9BNwccgqJHjRkZ9aZqvr6umfUzdCzuD+mZ7r9fpfaHnpqu6rrU++9ejXTrAIQanzkOAQEQhEIgVAEQiAUgRAIRSAEQhEIRSAEQhEIgVAEQiAUgRAIRSBUoRrDuOja+trEn2jNa1MvQnF063uquhKif/3ggUMbzz39fH7u9p31H+7/eu9smqb70r618Z0dzlnxhbMwnRCJQaIPWeWiKh8g4uOtJwC0Etf4Pk0m5+GxfvLUyepYiG/5BWxgoR9GT83s/vrOtfa5C63BsLq3rEisF66gK7naBZAfC/DnN0PzR5tQxyrlsgLab6vTMXXSmkNQSazs7PbVfgzVCX/Yv1GxGOIOjSMLdS4bVcOBHEpDoux42piXk8flOIP6nmn0St+pXV0nCAhkL4p/W4cWurBdjC6B7FrIYOig1VR3ZMco3P0/LCQH8siZg31LKAIpL3bYYCf6r5MBXottvxpDeO8fEHbMXRqBlH6Hr8CHLy2mPOXhPwka39Kx7m4NraM78zMLwSl0wpIZypOSezCIh3weIbP2Xl4vrxsjgQwv7+gFc+CF6P11ANOPRnTD4/GFQi51Q00XyiifmakzkJgH84iX0e4sm0FMFa6mMl4+Xo4hzrnEsvfEjXTdVU8gkKiNJBqSGXj/rc33I9uupDJu3n/mQ3gnQb6hsjGqrjdqCUSlaX7nVYRw1WBM/ZdlrVqd0PGfmlE17bW3v882SRIC2Q8DAWbEh2sG4/jOOCLbr19U6Kp0t+4JZJ/00q7DMsRB8CJjCEUgBEIRCIFQBFInVWHZGyxnu2FZwi/2Oi2hPcs/MAPIaQIZNEDQRcvavikv09c5yy5HAqQqLiuUByP/PbI9+Kpk6kn2iR8EJRiHjnSiVsVCWmXAyISYt7NJCxms1GBcseODsho0KE8QyPZefZp5CEUgFIEQCFX9oJ6tQ+/3Vlll9DdLQg/3CoEUqG3J2rsQXZLsyYwy2hPMAfiIQAbbyANLoDtmKn8MP1PPDw9lRN+Vq8rWies+hlb/2FoVIFHKmrLIzYSbi9v3EW/a8VkrkyW05w3/GQIZrMQm7QWbuRfKXdgxD6EIhEAoAiEQikAIhCIQAqEIhCIQAqmBdHjjNpQLQ9CuNZAov1cKiBO3LLF+HLKvsyJFx/3mVioFJE3T95HKzQG72McK2p2qhH9XdzdtTM5OxPSnYbUxnM9DUr2loh9qW2aheKYPQPZQfv/jBT9bOTrm9nHPaePrCZd+5YMfXnjif4vmKosiEAKhCIRAKAIhEIpACIQiEIpACIQiEAKhCIRAKAIhEIpAKAIhEGrH+kuAAQCQ3zw1WXH7jgAAAABJRU5ErkJggg=="

/***/ }),
/* 17 */
/*!**********************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge1-s.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFGNDA0NjBBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFGNDA0NjFBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMUY0MDQ1RUFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMUY0MDQ1RkFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pvjck0wAAAX4SURBVHja7J1/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"

/***/ }),
/* 18 */
/*!********************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge1.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFGNDA0NjRBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFGNDA0NjVBQUQyMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMUY0MDQ2MkFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMUY0MDQ2M0FBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoZMvfgAAAXESURBVHja7J1tbFNVGMef59zbLkNkvgwWA2okBDGwzrWbJmaixCgxgh/8IjEGjRgUP0kiMcSXYEiIMSboJ2OEYASCX3z7omzqFCfRQFt0nSOEOBM00YmSgWxZ23vP43O6TrdK1811W8/t82/uvU/PfVnP+fV/Xu5Lh0QEosqRkiIQICIBIkBEAkSAiASIABEJEAEiEiAiASJARAJEgIjKLXemQCdT8aeIYAMCrCSgK/7XUVC9yPOd49Iuff2mi1e0zWA5efxhUoDUDvVqZ+hsaMgkRiIRK4BgIhX/hAvunlz5BeaLS82cmWY4qx/g93fx9IsVVdaJnsQTozACquUepPf4jm9HG0JEG4Jez7Pr1/KiyQ4gxtpVINJ0ix29LIIFVQEE/Xrp9so4RCRABIhIgIgEiAARCRABIhIgAkQkQASISICIBIgAEQkQ6+Xa9oFjkZb/pCW64wJkVkS0LIyTyAPC9UG536jCqyx6iGdLJ9riRE98I4O7VtqQWXJwFuC5idZrmnC9ACl/rUUbi7kk746lAqQyXBI4d1jT7b2US4LoDpvGIYUuCaQ7rBoYjnVJmd1hHjXY6yhc47rhVVwkMUC1ndN/EiCTc4mrNT1fliMinMuPxZaqheHjIQj9wHGSp5fn1yxoQoSDAqSES5I98R0c3jBtFoj72Am78kdek+3PHOZgft28OoDLcol/RRtb2ZX4tQCZwCWkadptByr1erSxZVNsVWw3Au7PQ2kb9ofaOcjdLJ7JZMxC87abBcgMigG8xIunYeThLh2NtDw6CoUdeNv5oYEODuvM+97eXrM4yXb6UYCUGwQiccFv5XBHwapxUBjLrTioP+PgypG1PiDRaQFSXvlc0Jt4+VqR9QVOgZYMpA2Uq0A5xlZ1AqR8zsgoBx/kcF+JTcc7hSg67A92cnQTHyUqQMqDYwiUup+D9ya5Q6FTmkDrI9y21AiQ6cM47zhgngZun+KOI1C4J8b2+pWAFs5qNzKYPSn4XbnuWiDvu2LbJPoS0BBugP4l/RDjl7nqqHhPyr1Qc3iUj7Nltq97Bc8hiD+7gKs5KgrDrQ2VOsrjjOZdrqrCMlKfnjNOg4PmJzZOFR3tuyWvCW/jWusthjEnZaOCYwz4Pqxqb+fwTFEYWBLGLq6wXpnLfKiAwPhGXR66k8P+4ls5pcrhDQ16+1znRQWAxqfuopq7ORoo3m+asGkOJbvjB9k/T1ZCdqwGwuOF92udees4HCy60cTdpFpM0UdcTVXM77Moi2lc4GnIc7zF3p8e4DBCmtLcj3chm28rSnRZ6/rP/dbBjfe9lZQtK4EgYtosuDAfzmYyRzheNsVDLIKL+ssZ/tGzqnJIJ6B61pzBzd0k5/lcuLB8kvtelx1Md/Hy5krMmJ1ACI6ZXhFPWwwUrpoWe9msgbKixJ4rwNdHpwBPgEyu+XC6lM599DeJcHPeKddwd8pAWVlktxhv08Uwl1Ry3pSFNC7oiP6Kp9GUPZyNxxiK5sJu8L3sF5zWWLDXHQR+J1urvtKzZx8Qwg95ni1IfZub+Ed46efOzhJ1jmkj1jG6w7b8sJp1Z3sVOO9A95j3jgda50bhBxSgzzbZb5ygPa8DHXiGtL/XpnzaBQSxr7mxuXP0bTIVh9yIgzSY50jSQIdQOT5pfYBXXK19U53ZlUfXLh5waHS8l0wlC1ebZ0TWM5wmhtHHY5QbbaySLauyKJnsOZ5H8s/JwlaeXkhrhgG5W3nAZtn1DSJsI43/dmMBPvZ9OMYN+XoIiKxyCH/7t3LFZRxRS+THIICy8Jo6tQX5/ynLc+pBB4KAA1VSdIN2OATpZDXgQMRTdgAh/KAKYFykECWsABKNtOw2Nx0EGQghmUca/rClUfeija2r+cjbGMy35pbOADhC8+wM5+dzB/E+Tnp1xv4WBbkPKb0skQARICIBIkBEAkQkQASISIAIEJEAESAiASJARAJEBPC3AAMApaPkVQhVLVwAAAAASUVORK5CYII="

/***/ }),
/* 19 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-bg.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/me-bg.png";

/***/ }),
/* 20 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-fl.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/me-fl.png";

/***/ }),
/* 21 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-hz.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 22 */
/*!**************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-s.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDhFODZFMjdBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDhFODZFMjhBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowOEU4NkUyNUFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowOEU4NkUyNkFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrAnYs4AAAfzSURBVHja7J1pjBRFFMdfVc/OsI6AsAfZAxCU0xMjaggkmGiMRF3R6AcxxqjxjBqJRgQCKuKBeB9RP3h98IOgsJ4EwweDMUIQQdQAggiyu8CuiguzmaO7nv+a2V0wyloD9E53b/03b6Zn6OmZrl+9V/V6Xg2CmckqOJK2CSwQKwvEArGyQCwQKwvEArGyQCwQKwvEygKxQKwsEAvE6ngr5teBH8FfMfrw8XWk8KclcMfoK/2T5dTekaIyJ045L0PXzDlfLlu4bpJHXgP2GsfMtUKIWmYaJIj34aUtLESzFPwtOWI5u7SJ8I+xExPkpnI0dMBIaknvIC/DpASed2LkqeLPbdPsxvABOc46GfbQ0oVrpqN9qwpPFb5Y6/qCDbf1pA2PFVMDbh4FrB147j3YYth+G7KOXYNhz8A7NqPFbz0Ew0yANQKg5rip7C94eD8sYYEcvaa2dxzciladCRjH1JAAM4hZPf1b+/YNeDjKAilet5HwVgJExfE8KMCMdbNqDTYvskDMNV8Rv4bwVObHwfPeIngFNq+2QP5f17Lih/1+E0BxMMl6F5sTLJAj6xyEqLd7682Y+ATPy+n56xAL5D8+h2LvLfTc8t58U4TFoaTcxQ5aoRgLZWK45qXfjffddWDb9eiyZ5aiJ2A8mYG7Z2HfWQ8pKIG0eUHJ3p0xn/PcpwhpvbGF0UN+a99muuuVsGGl7BEIlRcTidHY3Frq3ukbkETVUKP90q27G7oug5RSrmLdMRZFFoihygTxtCCUe2MafOXAeFl0gWRam0x2m4iZzsAgDKYs6ALc9YcdiCQQnKCJhlFQVkNgcG/3uA5bmyMJRJq1dI2i4Eh4bm1kgRguBKoNUpaspCz55/FvUGejFAeBLUg+Unr5BkRIIw9p4gDxkEo1RxaIYchqDlLvVHHZEmEPcUx228WeZ35MQTlmsURK3oxpXK7nDkHjmPiGIj6xGkjO7sgCiVcYjY/rMvt270fDnWRI5AFM3l4wbmISg3Hsy8z25TWlzkEKs9PSKofA9lkRDdyvqr6avp/d80tiMkmOkPoFg809Wja2ux6ZWCg9JGuWqZMUYrlivs4oxrO6F3faQ9LlMkEdKpOPYwLGnC/mIo7JronbZIxjk4qIsY0UAPkGpH7ASNNdP9r11/ZdaMr/v+LLVNPWtPcVbN1CPV+RrPJYvWE+NokvSp0QBiVkaWXQweeaz97optMXTnsLm0eqSDkr56VWYewYZxgH2XFiD8JTydR8vVrg109rFFlKKpc+tnY9GvGsIl7Tjp79Nrr3RtzvQcgaBZ+ZgmNcpa9LFdEE78VisRnFfNgNs6JfSqqklDcppVbr4gPD1wxAZ7pHu8zRdilQ200yNtMLUnIaoLxsPXr6jTqE9MabYSrQIaXTgM29QUpOg1aXtUQKmu87DCG8PHx0goCdfyArFxdIErfrrNwnz9hPLKdp+AE898DW9r4uZEwXHrQdXxi0xXHofGyuDOh5+zeof7h44z/JZzP5tFwK3IhYflUOK4WMWtD0h877r0N8mXQSY1NeZg7mgnceSwW89goW/ERl3ZAX/2zZlz7ylNOlsaOTtGWnSwIZuee5lBD9qLp/Xd/ykKUL1+bzPBb/Gs91td3MOIkxaNU3ivYYQb9iwHiyfzJ5ChUqSv4BQ6/YKgMEJjf6HnLU819MQeMiX5ZzeHfZCbtt/JjknVu2dUzC9PgKpBqngV8tunUtWnQQC2oVLJqBtUlIsR4n1phj3vDv44vCUrlUinzO8aIB5HB1cCYf4nK6YqLQePrK3upOMwtWOoPUjQ+6bU2tJCjYCssaw7x+2po6NDxTV2VLN6zux/riQ47CqaACGQ6bTIUiiC6r6CZRnLRXtcL0t4F7OsPfKtgfFkjPOp0Kq5oasswT8u3I3WttOzeKT+K5+567D3OgI6UhfQ37GPZ+JySbh3RKFzkv9ZTa1Ll6yvdVTXoFFW6n4P0W5Yh/xlMvU0AW7pQSyCDYq57HP6KBSrbeL7+WUfFdxLnt+ioBLN4XgYxVnlrLiu7ggIRNgEkq5rk/bT2ox5fqvgTkUlbuNwjmpwZyOsE0WWXS66hEC0J7G8jVSMw+CUrFew/eMtRz3a+weW6UgZyNDOEd0xrT0jtK/ouy5bCaKAKpzilq1HE6TEkaJht1aZVeRr34GynC7/+u4ozHLset+ti0YC2YEs+VxeIzux59N2tZqD1karhh5HUXFX4iKvQhSyDjXkShF8ddN7tAqRxpC+WlkzOeyDvFdATEiRQB4Tx0deVTsB9C6SGVNVVwDp5BkRFLT6nrPeVvzZCfIasfpgyXUIQkSFyRiJWFE0hby76LwjbNNchNdHnqqaEEwkpEyju6lHW9S0MJRJAaHkUg8JIR4RxDWNRGEYggrgklENbVIJEk4m9H89NDKqLIg5krwgmEuC2SDoIJZEiBiO0RDVnbwglE8CeRBELy01ACccrK9Y/gp6PlHKKpsq7y85CGLNK/ivACRYvIPL87mW9AxoxwaPyYE+ehV30dERra49/0PSD6faUh0c9pCDsUfP4Pquqrb66sraKwA9FqGzc6eSEVvktIhwzEnyTkfZvmfHpNb3323ipyyMJmOfHyUZjIP4hT1csJmvXiy4AhyOaXSguxQgq6OxFL6utWz1Mv/o6t70UOVsH0ECsLxAKxskAsECsLxAKxskCsLBALxMoCsUCsLBALxMoC6UP6W4ABADzFAiZpoWIuAAAAAElFTkSuQmCC"

/***/ }),
/* 23 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-tx.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 24 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-xbg.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABXwAAAEyCAYAAABJbBhUAAAgAElEQVR4XuzdWYwl153n9/8/bmbtG4tVrJVFiiJFiRLVkthSq6Ve1JvGM/AY9osXwLAHsF96YHgMv9iGDRgGbNh+GMCDAaZfbNgwDHh5sTFtzHh636SWWk1JLVKUuKpYrJW170vmPX/jnBMn4sS9cZfIyqyMzPymxKrMe+NGnPicyLz3/uqf/6Oyjh/n71875WT515aHy6+6oXvZTJ4XsadUZIeI7DCR7Wa24Ieo5ThtHcfLoRFAAAEEEEAAAQQQQAABBBBAAAEEEEBgawmM5pKquqwiD0XkgYk8ENHrqnK6GBRvLwwW3ihk4Y+P7zx4Zr2U0nifyPEvm+29f/Piv+0K903n7OdN7ISZqaiWgW75t5moxqFNC3jTo57I4DkIAggggAACCCCAAAIIIIAAAggggAACCGwJAZuSSlYBsJn4XDPml+UjYq7pA89zRaF/Xbji93buP/q/HVa9/aTg1jzw9YHuR3cu/RvLw+V/38R93Ux2eIiiqtn11bsaSnjr2Nczxdv4QAABBBBAAAEEEEAAAQQQQAABBBBAAAEEeiUQUl4f8qaiVQuVq3lQ7MINPgCWByrFtxYGC//js3uO/J8+EF7Lc1mzSNXMdp65e/G/XF4e/ntm7lAe8vpg11fwhvw7VPJmFb6NEWlAaftYs4GvpTb7RgABBBBAAAEEEEAAAQQQQAABBBBAAIENITAxlQ15Zn1vjC9T1BtDXh8EW/g7bleHv8WVhYXB/3Rq99H/SlXvrwXEquemvm3DvVvn/5tlG/47YrJftJAijLwMeatK3tDJIdiEQWRtHaoTHQ1/yztWfdBrIcs+EUAAAQQQQAABBBBAAAEEEEAAAQQQQGBDCzRD3+yrxh11O4dwc1XDGgNfHwj78NcHoS5kw85vc3NBB//rrn3H//PVbvewqtnpmRsXfnvJlv9rETvog16/86L8O1T4VtW8PuOOlb11K4eolHr3xoHN7uO7oa8YBo8AAggggAACCCCAAAIIIIAAAggggAACG0agDlPr5g0xzI1ZZri1qvhNLR9MXEx9w13OQr1vDH5Fry3qwn9x6sCx31kthFUJfC8+vPbqvQf3/2fnhq9pHvSW1byhfUPo3lC2byhLe2Nbh9jYuFHlO9bGoR7mqgx4tfTYDwIIIIAAAggggAACCCCAAAIIIIAAAghsaoGJVb4h4y0XbSvD3NjQwFf1xsQzVfaG9g6h8reu+k3Br5mTohi8vrBj5987tf3gm4+L+dj56Yd3Lv6D5aVH/62p7vQ1vSnE9dW86fO4KFuMdqvQN1Xz+sbFqZI3pr5T12p77AE/rhiPRwABBBBAAAEEEEAAAQQQQAABBBBAAIEtIzBthbV4n4Vi1/hZXLMsBrvlLWVP31jhmwLfWPWbwmFf86tm9xcWt/1nz+05+o8eB3fF+amZ7Th969z/NXTu7zaremPrhljLW4Q+vY2QN4y2DHVDpW9q3JANJVQGj1KueKiP48NjEUAAAQQQQAABBBBAAAEEEEAAAQQQQACBxkJtZcybr92WLdzmP80C3+qRsfI3dHeIy7jF0Nd8+Bu/9tW+g6L43ef3nfjXVfXBSthXlKJ+dO/eiaVH1/7EzL0YmjIURRnyZn17Q4VvGe6Glg5lJW8V8qb+vVVDh7q1Q3UmKxreShx4DAIIIIAAAggggAACCCCAAAIIIIAAAgggMKdAXaxap5sxBvYpaGzlm8p+y0resvI33FMu5FYFveJi+Ot88Ou7JBTvLW47+I1nd+06N+eAVp6onn945TP3793/Q1M5NggtHHwVb6rqTW0cfFVvvD2UM6devtUibU2GqsaXfLfr/LE9AggggAACCCCAAAIIIIAAAggggAACCKyzQL0kWd61oBn+pgXdql6+VVVvDIRTta+v8h3GNhEXdu7a+RvHtx/6SZfT6xSxnr158asPbfmfmdhTvpa30FTZWwa+jb69sWlx9b+U/IbRperffKh5e4cup8C2CCCAAAIIIIAAAggggAACCCCAAAIIIIDA+gg0a33rMcQQON3rq3p9E9v4v9TyIfXwjW0d6uDXV/6Gvr6i17frwt85uf/od+Y9u7kD31DZe//+t0wkhL2DEO6GZdpkoEWs4k0BcCjgLaPeiUHv9MXZ5j0BtkMAAQQQQAABBBBAAAEEEEAAAQQQQAABBPokkBZsC5HvhOA3hL6a+vi6kA0PQ9WvD4edDH0IHBtEXN+5c+fX5630nSvw9T17Hy1d+56ZHavD3oEUecibLcQWOvmWC7dF6Lyil6C3TxcfY0EAAQQQQAABBBBAAAEEEEAAAQQQQACBtRGYFPzGDLhcuq1c4K1u6+D7+fq7h3Xoq3ph2+LBL8/T03dm4GtmO35289wbzuzFQlNlb1vYm/r3+r9Tj16C3rW5VNgrAggggAACCCCAAAIIIIAAAggggAACCGwUgfbgN2vzULZzmBj6mkmh+t4n9p94VVUfTDvvmYHvz26e/afOub/r+/Wmlg0++K3aN/g2Do0WDvFwfsG28jNf78sHAggggAACCCCAAAIIIIAAAggggAACCCCwpQWawW/5la/mLfv6OvWVvb7CN7Z18H/XnzspiuJ3P7H/5L+y4sD3wzsX/8HS0qP/ISzQVviqXpXQtdeHvEX5dwp7qxYOdVUvzRu29PXLySOAAAIIIIAAAggggAACCCCAAAIIIIBAi0AIeLP+vv4rv3BbaPOQQl9Xhr4SQ1/nhqGn7+Litv/ouT1H/9Ek2InFtxcfXnv17r073xUtdoagN4S9RVigzVfv+v+qXr2EvVy4CCCAAAIIIIAAAggggAACCCCAAAIIIIDA3AJTQ9+wcFv8zy/kFv5XVvuKufuLu/Z85dT2g2+2HWxi4PvBzXN/7cy9FhZpKwrxLR1idW9Z2Vt9nup4U2Uvdb1zzyobIoAAAggggAACCCCAAAIIIIAAAggggMCWFUgtHnxxb9nYoQp6fTWvb+vgQ1//uTMnQ+ejX9/Pt3j9hf0nfn7uwPfMjQu//ciW/kkIeav/YpVvaOcQevSG+Fdiq17C3i17VXLiCCCAAAIIIIAAAggggAACCCCAAAIIILBigbHQt+zpG3r4hlYPdXWvD33Tf9t08e+fOnDsd0YPPFbhe9ls760bZ0+L6sHYyiFW9hahyjd+7T/CrYS9K55IHogAAggggAACCCCAAAIIIIAAAggggAACCHiBttA3xr1SBry+h2+s7o2Bb+j3e23fgZPPH1a9nSuOBb6nr5/7x0MZ/gehkleL2M6hDHebbR38bmKLh/IzZgcBBBBAAAEEEEAAAQQQQAABBBBAAAEEEEBgBQJ1T9+whJtfv63RzsF/7SPf0NYhtHpwslAM/vFz+0/8hxMDXzPb+cHNjy6IFPv94mzVYm06KBdpK1s5lCGvv5+wdwWzx0MQQAABBBBAAAEEEEAAAQQQQAABBBBAAIERgRT6hgre0M4h9vGNrR18de+wWrzNL+Ym4m6+sP/ZY6p6P+2qUeH74Z0L/93y0tJ/4qt764XaCimK2LvXb0wrB65DBBBAAAEEEEAAAQQQQAABBBBAAAEEEEBg9QUmtXYINb8++HV+AbdY4esrfUOV7+Lif//cnmP/6Vjga2b6wc1zH4vIoUHq3Vu2dfBtG8ISbeF2/9DUysEv28YHAggggAACCCCAAAIIIIAAAggggAACCCCAwGoI1KFvbO3gstYOscq3XrhtGCuBr7yw/8Qzqhq+qPLaM7cv/puPlh/977GVg6/qjb17p1X3EveuxhSyDwQQQAABBBBAAAEEEEAAAQQQQAABBBBAoBbwrR1ilhv/jsu1jVT5lr18fWuHbQvb/q1Te4/+H43A94MbZ//AxH4jhryFDHwVbzGIfXx9MhyC4PiQuFAbcS8XIQIIIIAAAggggAACCCCAAAIIIIAAAgggsNoC7VW+sZev7+9rbihDX/3rQ19xPqn9wxcOnPzNKvC9bLb31s2PPlYpdvjq3tC/t2rhkD4vJK7R5gNf4t7VnkT2hwACCCCAAAIIIIAAAggggAACCCCAAAIIJIHRKt+4eFts6RBaO4iFPr7ha3EP9u1/9pnDqrdDhHvmxoXffmRL/6QKe3UQAl/fziEGvz7sjRW9VPdy0SGAAAIIIIAAAggggAACCCCAAAIIIIAAAmsrkFf5xnYOvr1DGfqGxdt8+DusQt9tuvj3Tx049jsh8D1969z/vezcv+pj3lDdGxZnG8RF2hqLtcUqX5o5rO1ksncEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCu8vWVvDH09UFvXLxtGNo7+CrfoThZKIr/5/l9J/61EPh+cOPsRyJyMizW5ls6+GreEPo22zlQ3ctFhgACCCCAAAIIIIAAAggggAACCCCAAAIIPBmBRpVvCHybbR2GIfiNbR1E5OwLB04+q+fvXzt1/+Hd0z7i9UFv4RdqCwu3xcDXV/Pm7Ryo7n0yk8lREEAAAQQQQAABBBBAAAEEEEAAAQQQQACBWOXr/yzbOpR9fF1o6+DE+QXcwv1mO7fvfl7P3v/4333w4MH/Ui/W5sNeX+Xrw17fs9dX/XrYFPyGL/hAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQWGOBFPhKCHpjla8Pf4e+stcv2iau6uO7Y8eOv6en75z/h8vLw/841PX6oDcs1hb79/rPQ3Wvb9wbPqd/7xrPH7tHAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQqgbqPb1np6/v2pj6+vrrXB8Gpj+/C4B/q6Vvnfnfo3L8ce/fGHr5x0bZm/966whdtBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgSchkFo5+ApfG+nj6xdt8/17Q7WvORkUxf+r71//6E1R/WwKe6sF23yVr0jo5+s/8SEw9b1PYgo5BgIIIIAAAggggAACCCCAAAIIIIAAAgggEAXSwm0+3PVfxGXbJPTu9b1908JtPvQVsx/r+zc+OquiJ5o9fGOFrw94w7JtvpWDb+0QImA+EEAAAQQQQAABBBBAAAEEEEAAAQQQQAABBJ6UQLVwWwh8Q81vqOhNC7cNfS/f0NvXzukHNz66IiZPDwrfwzd08pWiSEFvUQa9BL5PavI4DgIIIIAAAggggAACCCCAAAIIIIAAAgggkAtUga+Pes23doh1vinw9dW+PvQVlas+8L2jortDz14f+o4EvkUo6i0Xb6PClysNAQQQQAABBBBAAAEEEEAAAQQQQAABBBB4ogIp8I2VvT70HQ18qwrfu76lw1IhuqB+0TZf4asqoY9vCHn9Am5+7L7Slw6+T3QWORgCCCCAAAIIIIAAAggggAACCCCAAAIIIBAaOMQF20IH3zLw9bfF/r0mw9DPN4TAy/re9TPW7N9biF/ALSzRRuDLBYUAAggggAACCCCAAAIIIIAAAggggAACCKyrQHvgK+IXanO+f6+40NLB9/FtDXxDe4eyjQMVvus6lxwcAQQQQAABBBBAAAEEEEAAAQQQQAABBLa4wHjga7GHb1vg+/71MxbbOaT+vbGtA4HvFr+KOH0EEEAAAQQQQAABBBBAAAEEEEAAAQQQ6IXA5MDXL9w2rCp8fVsHnR34huYO9PDtxdQyCAQQQAABBBBAAAEEEEAAAQQQQAABBBDYagJ14Bt79prv3RsqfDsEvoOypYP61doIfLfaNcT5IoAAAggggAACCCCAAAIIIIAAAggggEBPBPLA14e9/r/hpMDXL9o20IEUhcpACimKgfiQl8C3J7PJMBBAAAEEEEAAAQQQQAABBBBAAAEEEEBgSwtMCnxDpa8bSmjq4EyGNoyLthH4bunrhZNHAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBF+3BCUAACAASURBVL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CBL5dtNgWAQQQQAABBBBAAAEEEEAAAQQQQAABBBDosQCBb48nh6EhgAACCCCAAAIIIIAAAggggAACCCCAAAJdBAh8u2ixLQIIIIAAAggggAACCCCAAAIIIIAAAggg0GMBAt8eTw5DQwABBBBAAAEEEEAAAQQQQAABBBBAAAEEuggQ+HbRYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKDHAgS+PZ4choYAAggggAACCCCAAAIIIIAAAggggAACCHQRIPDtosW2CCCAAAIIIIAAAggggAACCCCAAAIIIIBAjwUIfHs8OQwNAQQQQAABBBBAAAEEEEAAAQQQQAABBBDoIkDg20WLbRFAAAEEEEAAAQQQQAABBBBAAAEEEEAAgR4LEPj2eHIYGgIIIIAAAggggAACCCCAAAIIIIAAAggg0EWAwLeLFtsigAACCCCAAAIIIIAAAggggAACCCCAAAI9FiDw7fHkMDQEEEAAAQQQQAABBBBAAAEEEEAAAQQQQKCLAIFvFy22RQABBBBAAAEEEEAAAQQQQAABBBBAAAEEeixA4NvjyWFoCCCAAAIIIIAAAggggAACCCCAAAIIIIBAFwEC3y5abIsAAggggAACCCCAAAIIIIAAAggggAACCPRYgMC3x5PD0BBAAAEEEEAAAQQQQAABBBBAAAEEEEAAgS4CnQLf96+fMdVCBkUh4X/FQApVKUTD36oqIv7v8GeXcbAtAggggAACCCCAAAIIIIAAAggggAACCCCAwGMKjAa+zkycmIS/3VCcOBk6J2ZO9L3rZ6xoBL6FDNTHvSI+CC5CxlsQ+D7mpPBwBBBAAAEEEEAAAQQQQAABBBBAAAEEEEBgJQJ14OvEmYRg10RkaE6c83FvDHxdCnxDwFuGvgMf7haxwtffFqp6VUK1LzW+K5kOHoMAAggggAACCCCAAAIIIIAAAggggAACCKxMwAe7Ulbz+pQ3hr8+4jUxZ+Lre1N1rw+A9d3rH5oPeX0rh9jWIbZx8FW/6fOQ9Za3E/qubGJ4FAIIIIAAAggggAACCCCAAAIIIIAAAggg0EUghb1m/jMf9Prq3tTOwbdwiJ+H6l43DOGvvnvtjBWFb+NQhryhb+8gfB1z3hT8+p2mnr6jw6K7b5eJYlsEEEAAAQQQQAABBBBAAAEEEEAAAQQQQCAXSOHuqEod9moId6Vq5+AD4GHs42tOhqGfrxN959qHIfD11byhwldDU4fQs9dX+aZevj7SVY2hb/0RP48VwPlHeTtzhgACCCCAAAIIIIAAAggggAACCCCAAAIIINAQiOGu/6g/C19VX+a3+2BXq1YO/h4f8Ppt48Jtw1jh6z8Pge/V01Xg69s6+F69IfAN4W+IeWPoG3r5pq/8p+mg/mApBp4UAPvhUgXMdY0AAggggAACCCCAAAIIIIAAAggggAACW09gcvVuHfzWGWu5tcWs1ffs9elu/F/82lf1Wgp5Q2Wvb+ZQBr4/vfozG/iq3rBQm+/lG1s7xIreGP6GoNf/ZzHYtdTuIY9xw9puoxXAMegNf1IFvPWuZM4YAQQQQAABBBBAAAEEEEAAAQQQQACBLSbQrXo3RbpaFfvGWDd+qSHo9Xls7N3rg9+wWFsZAPtKX+f8bfHvoQ1FfeAbqnp9r14f9IbPU+jr41p/mw9sqzrf+HmoL45Vu/6AqX43b+bQXgUcQ+DxALi8fYtdAJwuAggggAACCCCAAAIIIIAAAggggAACCGxcgenVu1l4W8W4PlpN1bEp3o2Vu77gtnqEahnslqGwD3nD/aGTb2jrECp9yx6+6Wt968r7lsLeuFCbD2Pr4Dd83mjpYLHaN6TMaWE3X/0bh5KCX6qAN+5FysgRQAABBBBAAAEEEEAAAQQQQAABBBBAYFxgtat3yyg3RsFlkW0ssy0re0Mlbyy+rVo6ZEGvhQXcfGVvXLjN/6c/vvy+xXYOMehN1b3+ILHiN4a4qaVD3sc3fl7GvuV2VVOH0AKCKmC+MRBAAAEEEEAAAQQQQAABBBBAAAEEEEBgYwqsVfVuM9xNfXrj3yngrcJgH/aWLR3C/X6xNnMBtK7yTYu2mejb10+/O3TulIps8/FtrPb1MXIhhe/ZW1b7+h2kyt7U3sHvvbrNR78h9I0fq1UFzIJwG/ObgVEjgAACCCCAAAIIIIAAAggggAACCCCwkQS6LayW4tjJvXerwHZK9W7cxvfqTWFv2as39MNNvXrL2/wtoYWDExfu9hW9MfQtq38fDYriTMhnzUzP3bn4jaG5by4P7RdM3WfE5EhqthuXcAsxbhXkpmQ3Vf+Gu0NAXG5XbbC2VcAxXB69dPJOwhvpsmKsCCCAAAIIIIAAAggggAACCCCAAAIIILDWAvO2ZqiLUcs4eI7eu52qd8uK3RSlpsXYUtYaFmwLXRRii4fQvTe21vWFwJfUip8sDPS7Ay1+78Seo3+iqtUIxwwv2u1nlh/c/9tLS8NfFXNfNLOXnNjuEPCWlb2hnje1fIg5bx0Nl4u8tVcBlx2A23oBh+FW3YFD74qqajiMMh0zTYtvKlFXFqfPCIHX+tuC/SOAAAIIIIAAAggggAACCCCAAAIIINB/gRWHu6F3bsxW0z5iNW6qBY7Vr3GTuE3eezd9Na16t9p7uVhb2Es6ZmjlEPdYiN5V1XdFix8sLg7+dGHHzn9+VPd+3KY/Vhs7aYp8FfCl+1e/8siWvjlcHv6imX7O1E6IWVFHslm/31SOnPUATsn0pCrgEOeWC8fN0ws4xr/lKYTjNDP3vM53PABuPLr/VyYjRAABBBBAAAEEEEAAAQQQQAABBBBAAIGZAqvVmiGFsTGwLb9qLKxWtmGoAuC4uFoV4k6o3vWbxHLYskVDFSeX0bKqU9NzqvbmYGHwl9t08feO7Hz6r3z17syTbxTGzrP1yDY37MZTN+7e+zvmil9Rda+5oXvZie2ZXAUcU++qQURLFXBeNRwqk6uktoxvU8XvHAvCxWJgQuAVTC0PQQABBBBAAAEEEEAAAQQQQAABBBBAoPcCjxvuNqt3reylGyPbVL0bWyqUt1UtFspa3qwCOGyX9d6tgt9Q/TuyfbN6904xKN42K17Xwv3Zgd27/tkBPXB9pfhzV/jOe4Dzjy6/tvRg6Ztm9jUn9qqInDSzQecqYH/ALBwuOzmEYbQuCBcEZ7SCCA9uhsD1eaVAue1M89HPK8F2CCCAAAIIIIAAAggggAACCCCAAAIIILBaAvOEu81jxaC1LqBdaWuGqstC2H1su1Duq0xXU+/dWdW7qjoUkbOF6Buq+u3FHYu/d3zb4ddXy6iMP1dzd+P7umq2786di/+SOvvGUN1r5uzTTmRfXgUcanDLcDdU5JaVv96rqvANN9eLx8VODvMsCFe3fWjtBxyO0bUfcDr22tqxdwQQQAABBBBAAAEEEEAAAQQQQAABBLaiwLzh7nyLqo303fWhbUtrhtg+twyJ8166qaq3Ee7G6DcGv7F614e+oVVDo3pXbmmhPx1Y8boV+id79hz9/55WvbWWc7rqFb7zDPbiwzuvLj28+7eH4nsBy+eduOdkQhVw2p+fgxj3asyDQzofWz5UvXqrbcpK3/Lr8X7AaxEC5x2D51FgGwQQQAABBBBAAAEEEEAAAQQQQAABBBBY8aJqlqLNKZW7M8Ldapm1ia0ZYrAbA916rlJFb7oljEB1WEjxoar8aCCDv1zcvvufH92+540nPcPrEviOnqSZ7T5758LfGjr7hol92Tn7tKkcGKsCDmFvGfBWa7XF28JH2fA4toIo63/zEHi0H3DIjbVcWS8+Jl4ndQuH8UXh4v31vx6U4XPc1cgHIfCTvqA5HgIIIIAAAggggAACCCCAAAIIIIBAfwVWHO5mrRlSvJuqgCctqlYFhiN9d+P25V4mtGZIWWO+sNpo9a6a3CgK/amKfm9Q6J+c3HPsX6jq3fXW70Xg24Zw4eHVV5aWlv7WcHn5l0zl82byvIgthDC2rOzNF3ib3gqiDnFDE4gQAsePvB9w/nWM7OsQeLQHcXzwpEXhyuO16hICr/dFz/ERQAABBBBAAAEEEEAAAQQQQAABBNZeYFK4648cq2Xrxg11jNbsu1vX7saQNg93RxdVK5dFCy0V0t4b4W6q0p3RmiEOK7ZoCK0fYunnsqqcVpMfDRYW/mJxcfFfHNv+9Ftrr9j9CL0NfEdPxcx2nHt45TeXHy79mpl8ydQ+bWJHxPLOvDGiTS0fUueHqulDXglcVfJWpcKtIXDcrNzDKoTA5e5GTo8QuPulyyMQQAABBBBAAAEEEEAAAQQQQAABBPoi0L1ytwxVWyp3q3tCJW4Z3Wr8jfu0WFpbuJsWZ4shcdmCIQt3036r9rzlNqOhsl/wS0UvqelPVeX7C9sX//jE9kN/oKoP+uI9bRwbJvBtO4lbduvQjbv3fkuG9ktDcV8UsU8NzZ5O7RzSY2IInIWqVZuHtChcSz/gKuiNl1VeCTwaAqdAOVYO5+FtHiY3W0jX8OX2E6qBN/QEbYTvAMaIAAIIIIAAAggggAACCCCAAAIIINBJoPuCauPhbqzXjR+pcrcKZGeGuzHLqx8dF0qLVaCxMrfaVxUal4upVUet2zoMVK+K6DsDKX4gA/2LA7t3/f4+3XelE0qPNt50eeL5+9efG7qHvzUc2tdE7fNuOHzJiewLoW/swlD23637AYcods5F4crOwHFvj7Eo3Kx2EDFkbrtS8uYSPbqSGAoCCCCAAAIIIIAAAggggAACCCCAwKYTWP1wV8r1tOrIN7RNKHvplpFtCPBin90yzZtzUbWU/aVF1aqvy2C5ELlVDAbviumPBgP99qDY/vvHdz714WaauE0X+LZNju8HvPxo6TeWxf2iDeVVs+EnTWXntEXhWkPgkUXh8h7C/hKcPwTOl4XLPq96Aoe4d86F4eK29Z+b6fLkXBBAAAEEEEAAAQQQQAABBBBAAAEEnoTA7H67fhSjPXerZdPSXVndbkvlrt/DlHA35mGpJHd8UbXU9zcEwWVON2NRtfuqg/d1IG8sSPGXC9sW/7CvfXdXc463ROA7CmZmevb+xS+7Zfk1E/uKM/uciXveTLaNhcChf29Y6q0quc1bRISbQ9qaKojTonDx3w8eOwQOu07fcoTAq3nxsy8EEEAAAQQQQAABBBBAAAEEEEBgKwo8Vrjre5qWH20LqsVYuAyC5wh3G4uqlVW+aaGtVKUbDhfui4Gwvz0kb+WiauEelUcqxelC9U0V/atiQf745M6j39M6WNsyU70lA9+22TWzwcU7V375kVv+NSfDL5vIKyZyUswGoQa37AOSB7h1CFyGvfmicCsJgcuLN9X8xu+fuoVDoztwFgLHb6Rmne+kdhBxj3wggAACCCCAAAIIIIAAAggggAACCGwFgS7hbu1RBrZVuJv3241JVAxqy1RqrOduGfqWbRlS5e7scLfcXxbuptYOIfAte/SK6lBFzqrIW4UMvretWPjjo3sO/bmqDrfCnM46R7K/KUJmtvPcvSu/vjxc/lUR95qZfdpEjppZkXfSjRW/WTibfZ4WixutBJ7cDqKqC66qhmMT6vqI/uJOE9do5lC1hIi31iFwHfPSF3jWtwT3I4AAAggggAACCCCAAAIIIIAAAhtTYG377U4Kd1PrhVTZO70tQ9hLquQt2zdUS6xVAXH0j5W76lTkoqr+VKR4fWGw8Kcndh36I1W9vzFnae1HTeDb0fiG3Xjq1p0H3xQZ/pIz+YIze9k5O1wv+hZ3+DghcFoYLuynDHdjoXrWPqJcbTBFv2sRAlfH62jE5ggggAACCCCAAAIIIIAAAggggAACayfQpWq3WRBYLoJW7aBZuRt+w31CS4aYE8XtfWAbtxtfUC0tvtZsyxC3rtrzlj14R1tC+N0WhV4uVN8uVH4oMviLfXt2/N4BPXB97TQ3354JfFdhTs/eu3pSdPiby0vu62LDLzhzLzmR/R53ciVw6gk80g7Cfzf4PiRVFW85ReHr+M1UVQ3PDIFZHG4VppddIIAAAggggAACCCCAAAIIIIAAAusmsLJw9/EWU4snm9o65PtKo8mC39RmYaxytwyXJ4W7IlKI3Cy0eFd08MOFxeJbYoM/OLnr6bPrhr1JDkzgu0YTee7B5ZeXHj76LVH9ivlF4cy9MCkE9rlt28Jw4dayPUQKgUPgm/6JJDwufqQQOMXC1UJy5b+45H2BR0PoRJAvDpe+resLpKwwbr1iGo0l1kiU3SKAAAIIIIAAAggggAACCCCAAAKbV2BlwW4ezE5fTC1v9xB64ZZtFWKN7mi4W+W9zfvKcDfGTWH5tDghbT13y6lKW/lwV7X4QFXfFLO/Wty+7fdP7Dj89uad0fU7MwLfJ2h/4f71591w6deW3fIvOLPPO7MXReWQWNmQoazsDaX2oaI3RrPx6zrobfQFzvsF+xrgajtfVB8T4bEQuPxGnGdxuPj4uvh//r7AIYZmgbgneH1xKAQQQAABBBBAAAEEEEAAAQQQ2BgCk3rtVpFNTFGrP5tRrg9r03muwWJqZUVu3pKhinf9L6yXIwtBrs+yUouHsHBb+I12/9eVQvW9QvVHC8XCd4vB4h8f2/nU6Y0xOxt/lAS+6zyHt+zWoet37v66mX1VRH/OueGnROWYmQ1CYJqHwKHiN6u5nRQCh6w1ha116FstB1dWBpeR8MjicHVMm/cFHo1vqQZe5wuHwyOAAAIIIIAAAggggAACCCCAQO8F1q5qV0JmlILY8EkIXFO1bd1vN/bNjSV84e+qOrfedlK4W8XKoYK3DndDhXBcUG0oJheKYvCOiP2Nqn7nqT27/2if7rvS+8nZxAMk8O3h5JrZzgt3L//qsi1/3Tn3RZPi006Gz5rJtlD1OyEETt0fUmTbqAQeDYGrr+frC9ytGjjGw23VwOVhW9RpC9HDS5EhIYAAAggggAACCCCAAAIIIIDAHALzBbsxnk1/xiRkvNdu3WAhuzfltGn7rCVDHN7sfrvzLaYWF2QbDXfD1yqPChl8pOJ+WhTFDxZ04VvHdh/+U1W9PwcRmzxBAQLfJ4j9OIfyFb/nb3/81WWxXzbnXjMbvmKqzzuxXan1Q9p/+Lpq9ZAWhyv7BFcVwvXicP5xrX2BZ7aEyKuBRxeIi3sNH7SFeJyp57EIIIAAAggggAACCCCAAAIIINAjgbVoxxAjWxNNLXFTz4axqt0yDq6qdquC3TL2zYLfscXUmv12w56y/aTY2I+jEL2nZqdVB29pUby+IPrnx/c+851Q0ctH7wUIfHs/RdMHePHhnVeXHt3+VWf2ZWf2OefcJ01lv5/YscXZZi4OF/9BqA6Ly/6/WV/gkN+WofGs3sDhB0XVWiLFv6MhcB0Mz98fmGrgDX7ZMnwEEEAAAQQQQAABBBBAAAEEei8wX9Vue5/dGJ5O7rVbt2MoY9ZJwW7qjxu0YksGHwrXy6XF0LZuyZCi4/kXU1OTm0VRvF+ovlmofm9x294/Pbp9zxu9nyAGOFGAwHcTXhx+cbihLH1j+Gj4CybuVWf2kqkcbl0cruwLPHNxuJj0lj8/8tC27NlSVQOXP9DSzxr/mLKnTHp0vbBcxG/Et3NUA5dDaZk5guBNeDlzSggggAACCCCAAAIIIIAAAgisqcB8wW4ZzJbNE+ZZRC1Fr6NVu6H/bWibkHKR8vPWXrtpL7P77VaLqY20ZIi9feNiampyuVB9V6V4Y7Bt8N2BLP4Ji6mt6eW1Ljsn8F0X9id/0Jt28+DtO/d+fdnZL2ohnx8O7WVTO+5bRbT3BY5RbOjEm1X0htvSVTNSDVz2bqgf9xjVwOnoSWrli8SNRcpPHp8jIoAAAggggAACCCCAAAIIIIDAugtMC3ZDrFptMKVq11exlR91ZBvbKqykardcBq25kFrZamFW1W7ekiGEvT7oLcNd33pBTc8PBvq2OfnRQqF/uXfPrj/ar/uvrftEMIA1FyDwXXPi/h4gLg537VeWh4++7sR90Yl92sT84nDbp7eEKH+QVX2C6zYPIfQNi8qlyDbW9dZVvfUicak2uIpks2rglSwSF34417/FUNcOT7zKqQju79XJyBBAAAEEEEAAAQQQQAABBBBYmcCqBLtT2jGE322esYhaWVMbQtj4kbdjSMuypXYMqTY3LZgWEw7/0Kpq1yceY/12Y+SsKg9V9KNC9KeFFD9YGGz71rHdB/+MxdRWdv1shkcR+G6GWVzFczAzPb905Yvu4fLXhiZfdOZeEbFPiMhhMytCEBsC3VD7G2qAJy0QF36cpXLg8odUe1uI9KMv9HNIdcXxH7JSG4kVtYWoomSC4FW8RtgVAggggAACCCCAAAIIIIAAAn0QWMtgt4xcH3sRtRTtVi0cyiQuBcFVlXBowxDj3bSQWl61G0JmVScil0X0Z4UWbw1UflBsX/j28cVDP9D6V6P7MDWMYZ0FCHzXeQI2yuHNbM+Fu5d/acmGXzWzz5vZp5yz50xtT1UNPBYEZxW0WTVw3RZitBq4DGirbetq4HhPCplHg+B6ebr5+gNPD4LLnLllaqgI3ijXK+NEAAEEEEAAAQQQQAABBBDYPAKP22M3hrftC6iNB7vxltj3tu6bW0axAbUOa8v627hh2ZO3WbUb69fq+8pC3Wo/VcwbynljFXBsD6F3ikI/VNV3VPVHizr4zrHdh/9CVe9snpnlTNZKgMB3rWS3yH4vPbj0woNl98s2dK+JFp915j5pZidMbCFU/2YO4auygjf9SoIvAK6WgsuqgWPoWi8S16ktRPkDud5z3lIiDqgR3VYLxdX3tLWGiGNqm1iC4C1yuXOaCCCAAAIIIIAAAggggAACayjQh2A3JgMxdJ3UjqFqyJDaNbRU7c5uxxD3oqLLqnqu0OJ9MfdjHRSv71go/vzIjiMfrCE1u97kAgS+m3yC1+P0/EJw529//NVhIV91NvyimLxs5j4xdPZ01f5h7rYQI4vElanreGCbgtwUKpf/epfC3ZW0hggBb91rJ+TILT2CJwfB8WmCb7L1uAo5JgIIIIAAAggggAACCCCAQF8F6iXRxkdYL5yW3oWPvhcvH50tnlZX0Mb9hSC1fDtftUwYqdjNg928N25ZkFsOrHx0aLdQBwJ11W46yOx2DP4xg0KvqhY/E5W3Cx38YODkO8f3PvMdv8BaX+eKcW1MAbKojTlvG3LUt+zWoZt37vzKsulX1Iafc6IvmdmzJrYzbwsR+/bW1cDVz9QubSHKB6ULvN7f/EFwHtaO1fBWVcHxnpUEwdlzxYacTwaNAAIIIIAAAggggAACCCCAwCSB+fvrpnfV48Fusw1DinLjEVNovKrBbtk/N/56b9maYVI7hnwRtdF2DKL3Vf0iavau6eDNBbW/2r9nz5/t031XuGIQeBICBL5PQpljTBX46OG1V92jB19zVnxJZPgZMfukiRxxZoMQ/Y5UA7e1hUjhbLVIXOjN4xuax1h1vCI4NZWoF5ab3CO43kP8B8SWVhXpDKcGwXXE294aIrufawYBBBBAAAEEEEAAAQQQQACBDSAwf7Db3LIOpMrq2PruKmLtEuy29ditmjNU+27vsxuOk6p4y6A3Iu4F6wAAIABJREFUpQbhEeH/5ZJqfruy126hOlSRS6L6vsjgJ4W67xfbdnz72e0H39gAU8cQN7EAge8mntyNfGpmtvPM3Y+/bjr8BRnKzznnXhax55zJ/tltIcp/FczC2ToILnuvh2x1PYLgOtSlKngjX6GMHQEEEEAAAQQQQAABBBDYOgLzh7p5RJvWz2nEtqk0N+BV7RY6VOx2CnZHWjFMC3ZTRe9osJtuL1RuiuiHRVG8LQP5G7XBd0/tfuZbqnp/61wJnOlGESDw3SgzxTiDwLl7V59dcg9/RZy8ZiafE3GfdGbHTWRH3hbCB7wxUE09gGO4G25rbQ3RHgRPWiwuxrbpGPVqbr4aOX7UVcD+X/7yb7RuC8bVAXH4bOJ3LAvH8S2CAAIIIIAAAggggAACCCCwcoGVhLopys2rdeNt/rdu01jyWLd8X16+d857+fr3zuGjDGmnBbu+jUN6bOy5O6nHbhxNvoBaW7Dr32z7PZSFWQ8K1fMixfuq8qYU8vpisf3PTux6+qOV6/JIBJ6sAIHvk/XmaGskcOHh1VeGbviV4fLyF5yTT5vYC2p2fCi2e1IQPK01RAhs03eHlf8qmVUEzxMEV1Gtf1xrEDy+pFsjGq7aQ9Shb7MquL6dIHiNLix2iwACCCCAAAIIIIAAAghsMoH5g93JLRjGQ93RZdNGF06Ljwh/+jewVfuE+H67arSQvXdOC6+tNNhta8WQB7sD0bumel5FPygK+elgYeGHg2LwV8e2P/3WJptyTmcLChD4bsFJ30qnfOnBpRfuLw9/UZx+QWz4GRF9YejsWVPbk2pip/UIDlZzVATHzcoq4mr7+LTUdcG49AQ4sSq4HFOsL64GyMJxW+nC5lwRQAABBBBAAAEEEEAAgSkC84e64R1o2FOzwKhaEq3RgmE01g2PqULa7N7yt26bwW4Z65b9cOMxY9ybKnarWuAZFbvp7bA//qQeu2k0anpnUOhHIvaB6OAnUtgPdy4M/vLIjiMfcBEhsFkFCHw368xyXlMFzt67elKGj77qRL/ozL3ihu5FE3vWZHKP4FQRXEWs5XdP1Qm4+vWTMoYtv66aLUwIguP+svYQ4YbJVcHji8bVoW8c43gQnG2REuwYFdMigu8UBBBAAAEEEEAAAQQQQGBDCqw01G2+P2wLdsdbMKRQthkP19W6eWBch7ZZ5W5qshj7L1TvWv1CafHNafwrfd3cR3nfhMXTspYNN1X0o2JQvFdo8VYh9gMZbPvOyV1Pn92QE8ygEXgMAQLfx8DjoZtP4ILdPrx079bXbLn4kpm9YmovitizTuSgmIU4tVl5G26qbi0z3fL5qox6q1Q1/trKaA/h9ORWdxmeXhUcngvXrUVE/UzMD4/Nd/1zRggggAACCCCAAAIIINAvgVmhbgxJ05jXsAVDeaC6vGi8WjeWH1XNdfNGDXGM4c1wGTBXPXzLPWYPyyt2m2fm+y2qFSLXRPQjNX1PVd/SBff9A7v2fmuf7rvSr9ljNAisnwCZzfrZc+QNJHDNbP/de5e/NpTlL5nTz6nZi865U6JyyMw/3zSD4BiL+j7Aqb43PDE1guBJfYLHItUqUC5bRGT7adTyph7DXReOKw84vUVENqqpPzVYPG4DXdYMFQEEEEAAAQQQQAABBHogsJah7rQWDPmCabG3bbb4WVl0O6m3buuCbBPaMITdVj0YQmfeoO6reZu1xHVzCVV1YnKlKIozpvqeFvbmQBa+v3vX4W8fVL3Zg2ljCAj0WoDAt9fTw+D6LmBmuz+8c+kXBqY/P5Th55y5T5nYcyp62JkNUl/fWNmb2jakBeGykHhSe4iwsmn5dNiyaFzdDKKuCk5hc6P/0kgYnI7sa5antojoGAaHzQmE+37ZMj4EEEAAAQQQQAABBBB4ggLdAt0Yj6aPlfbVbbZgSG0T6lA3HSVfMC0W52YtHrLeutU9Vag7vVq3PgsL1b0p5g0tG8r3xv62QnVoYpdV9MNCi3cGMnhzqPbXz+058l1VvfsEp4lDIbCpBAh8N9V0cjJ9ETCzbedvf/zl5cK+bM5eFXGfcs6ed2pHxGRx4oJxITCtq4J91DvaAqIKVOvn7Cy0rZLjrDPwyltErDQMLnPicjrqHzOEwX25QhkHAggggAACCCCAAAIIrKbASkPd5goseUzqi3/yEXbsqxt2VT+mbLYQ9jka6o5X68aQNnxUvXXj2FIcHHLbKsZt9t4NUbA/dtnCITxGZakwvVQUelqkeEcLfWPB6feO733me6r6aDXngn0hgED1rQsFAgg8CQEz00uP7n7u0dLt15yTz6rZS0NznxCRE6LylDMrJlUFz+oVPNoiIjynji4cVz5hN/oFZ9ukX62Jhb9l8DyhX/BKwuD08qX5L00Ewk/i2uMYCCCAAAIIIIAAAgggsHKBlQa67e+B2hZKywPVOM5qq7rNbX1rtWh4S6ibLX42ua9uHdKOhrqNkUzorZtC3ZFqXd+G4bqInBto8TNTfbco5MfbFve+fmTb7jdVtRFhr3w2eCQCCMwSoMJ3lhD3I/CEBMxs54Xbl39+ydwXRewzJu5FJ3JKzI47sz3NSt/4rzXx13tW3iIi5r9l/Fu1d6ifg/PAeHoY3Ix//b/kjv5wGevuG3oTN//ZuPnrSmU6XfpTHfyELkQOgwACCCCAAAIIIIDAFhVYvVB3vkC3CoPrVdcaPW1jheyESt1GqBsaOIR3iD5S9Udv9sydvWBaHjA3WjCU10Je2Vuo3hHV84XIGZXiPRH9yaIWPzi29/Bfq+r9LXr5cNoI9EqAwLdX08FgEGgXuGR3jiw9vP/l5eHS52UonxGzF5zZs6Z2xEy2rbxFRF0FHCLk0Gs4xcD1381ev6OLx6UXF9mvDExdQC7ffzzfecLg6sVQg4jqYL5nEEAAAQQQQAABBBBAYD6B1Qt083h05a0X8oXS6j1WNbnhpELP2/JdU17xWwWwcavYgqFsoZA/bqUtGFTlkfoWDKofieoHMpCfLAwWf7S4fef3juieS/OJsxUCCKyXAIHveslzXARWQcC3iLj46NpnHi09/JJz+jkVe8liGOxbRDxtc7eIiI3z0wuJKkCufkI0F4/z2zVC2lCtWzftD59X7YRH6ng7hsHtx8p/EygeaOXVwWNHWIWZYRcIIIAAAggggAACCCDwpAXmCXRjGJqPrPmoOiTJb89D3WYv3fRepLlIWn1rHurmv99YV+Bm1bhlV9zxnrpZlW8j1I3HSaFufGOUlkcr75myYJqq+hYMVwvVc6r6gYlvwWBvblvc/v2j2w7+hBYMT/oK5ngIrJ4Age/qWbInBHolYGY7Lt269oVH8uhLrnCvmNMXTew5MXfcmeyb1iKi2S+4LQxuqQwOuWkeA6+gVUS5j7CX8lVY3hzCVxqPNouYXh1ch7nTAuFs6BPmMKsk7tUsMxgEEEAAAQQQQAABBLaGQLP56+RWsM0wNwtex4pEJgW6eYha24YYNTtsFdhqWeBSHjivx02f11W6460X8ri3WmRtSqXuzFC3HHKzBYPcEi3Oq+iHWth7hSve2ibbvn9k38EfquqDrXEFcZYIbC0BAt+tNd+cLQJB4JbdOnTz3oMvu+Hw875fsBN7wcxOmdhRM9leVfiWXnm/4NEw2PeKSsXBKYxNvX/ji5G4k8mtItqrg9MYGl1+H7c6OAwk7x1c3lAPc6T38LwtI+r98EOVbzIEEEAAAQQQQAABBLoLrEZ1bv2qPHsjEjvbVu9L4shWp0q32k9ZRVu+86n2nvrp5lW4WYeGCikFwlWtrq+5CXtJv80YG/OmW6ogOTsXVXmoohdV9Uwh+oHvq1sMBj/av2vH9/bpvivdZ4RHIIDARhYgm9jIs8fYEVgDgY8ffPzSgyV9TWTps0Oxl8TJKRM5bmbPmNjORhgcev7Gf9Guw974MivvBtG8pQ6Iq77BYYNmdXA4taqfcNk3eFqriHIfeXVwPo5mH+Iarq1COB66ETWXL6WyPsX1AONnM3+ajh1pDWaPXSKAAAIIIIAAAggg0E+B1Qh0my+5q4628YRH2jSM1gDn/W/rzevqlPDZWJVuvvhZHtuWJTHVQbIAObRUGO2nmx+xfFDjr7IHbxlFh737saTq4TJCVtH7qvqxipyXQs4MRN8VWfzxjkV7/Zkdz7zbz5lnVAggsB4CMyOK9RgUx0QAgX4KnL139eTQ3BeKoXtlKPai2PATInLC+cpgkQO+p7D/oRLi3vIFSjoTf1uq8g2vf/zLoLG+wXmriHmqg1OwPEcgnAfK2T+r5z8E/ehHfyi2xrSNKuFml6/m40e+mvkTl1C4n1c+o0IAAQQQQAABBBCYJrCyMLeZ0o63YMsC3bEODu0Vupr1c2j0ta2C06wXbllfMrmXbhxf9yrd7LyyfrppYbXGyKtQN97qe+aqyI1C9KKInBMd/Gwg+p4bFG8NtPjhyV1Pn+VKRAABBOYRmBk/zLMTtkEAAQTMbOelW9d+7uHC0qu27D4tKp8QlVPm3DFn7rCJLk6tDs7681YtJMqfUHUMm1UHp3+MD+nx7OrgGDJPWUyu3M+kCuHwsq2qOG7Od1uVcF0hHI+cv5ydFArPrhKu99X8jOsPAQQQQAABBBBAAIHVF2jmrGOp69gBpy2G1nz9mkfE3dst1K+tV1ahGx8/R5VuNuh4blVn3Pj6PrReqIuLQ2w7YZG0VB+sYkuFFpe1KC6IyRkx+ZkuFD/dvrz4xpF9B/9GVe+v/kyyRwQQ2GoCBL5bbcY5XwTWQcBX/p5/eOVTtrT8qivkM25oLzlnz6nqCefcERPb0+jxm7WKiK+x6urg6odW9kn6dFrv4Pq12uhicvULt2YgnF4ERrCY9ZbRbuOVbB1HdwmE4z7b20Y0Xwy3fDXzJ3e9wcxN1+F64JAIIIAAAggggAAC6y/QJcydtRDa+CvWVWy3EAovyle1qV1CyRf73JYfY3104+v88QrdePv0Xrr1e4R0gCrqzY4Twt7R1gshBNY7RVFcMrNzRaEfFgN9t3DyE11ceOP49kPv+Ere9b8CGAECCGxmAbKAzTy7nBsCG0Tgpt08eOPugy8VZp8ZyvBlc/aCOTkphRwVkYPObFBVB5cvqKoq4LJqt+ohnM553kA4D3LDY/NAuLmgXNy0WU3ciGxX2DaifoGc/UiuqpvXKhRuPeoGuWIYJgIIIIAAAggggMA0gXlbLIRYs6VdQtr3+CvROghNC4rN6p2bHrGSdgv54mppYbM4tjrqbQ1082A4e4ldL45Wn0cz0C2POLpAmt9feK0fA+ZCdSgi18TJRS3krBb6wUAGbzvVnxzYveP7+3X/Na5QBBBAYD0FCHzXU59jI4DATAEzWzy3dPmz8mj4eWf68lCGL5qz58TkmKk8Y852jFYH5yuopardzoFw2Ye47OKQL0tXj7lq8VC/Ss6rjP0xx14kpz7BHauEJ8azjX7C9VbVC+sx4az6d65nAKqFZ16kbIAAAggggAACCDwhgS5VueH1YOMB449uvhyc1mYhvrpsK0utannLOxu9c8PL0/I18bQF0VKlbOk43m4hP35qm9BcGC2eb370xoCqsedtF6ppa6vSLfSBmnwsKhe00A8HMnivUHtbtg1+dGLx8I9VdekJTTuHQQABBDoLzPV2v/NeeQACCCDwhATO3bv6rBXu5+yRe2VZ7JNmw1MxDHZHVOQpZ7K9qg5Or3rL0DUsjFD21x1dUM6/yEy/OdbaQzgtTFd1esgXfJu/bURrY4cZoXA4jSpsbkLn9cfVPTNC4fA6vLGbka/meqaYtocndDFwGAQQQAABBBBAYAMKjIeos3/bf6VVuTE2He2Zm4epNeBokBu3qv8Mn04JcxsB8RztFvL91+0W0u/1pfC6rYeuj3DTa9G6VUO6NbbejQtG548uVB6ayHW14lIIdXVwZkH0fd1WvKWu+JsTu57+aANeTgwZAQQQiD+ecUAAAQQ2s4APhNXJK0vDpZeduBfULyQn7oSZHlGzQ0Oz3WkttxDTtrWMyELd+IMzvnycHgjXqzfEbLbZCqJ66dpWJdxYXC4dMc5S3ami3N+ESuHwunZCKFzvZ1oLieZTRAzHRz9WEgw398uT0Gb+7uPcEEAAAQQQ2NoCXatxw+u3Ke0Vwv1jr8lGqnLTRhX9fFW59cOy/WV9c/Pdxtdvk3rnNhdDy+LarNdu9tjsxeDkRdG6BLrlvk1koHrXVK+o2iWV4pyZnCmk+GBxsPi2FfIWge7W/v7k7BHY7AK8197sM8z5IYDAVIFrZvsf3L78+eHAvbw8tBdF5TkxHwjbMXN2WAvd68yK0Sph37qhbtcQSmjrauF0xDqdrcLSxsJyLVXCeRg7HgrXL7XzBebiY+rxVPto7Smcto6DTKFwfdyaa1K1cNw2fzdSP5W093kb33t6/zD78qz3zRPWbC22QAABBBBAAIG1FVirEHf81dKsIDe+LhzNhxuPmtViIeyiuY/4+jPb64TKXL9Ja5jbWAyt3iIeqnu7hbCH1upcdebsthZ6WVUviBbnxOTDhYG+NxgWb+/Ye/hHB1Vvru3VwN4RQACB/grw/rm/c8PIEECgBwJmtu3c0uVX3CP3GVF70Q3lE2LuWRM55syeEZWnzGxhNBCe1kc4BabtVcL1wnDx9Muq41TNMVIpXBGVP83LZhLZzTGMTm8i6l93a1YLh00eq1p4/G1KDMFH34YQDvfgsmYICCCAAAIIIJAJrEeIG156TWitEO8b/3icFgv1689yv40gd+TexsHzSt68Mrc9zI1jL0caQuG8Ore5IFp1hi2Brqoui8n1QvVjFfGB7kfFQH4mpu8V24qfnFg8/JaqPuJCRgABBBBoFyDw5cpAAAEEHkPAzPTyw8svPhguvSK28JIMhy84cadM9LiJHTGRg35huUbbiDJcnVYlXL/srltH1DXE8d5GlWz5wrzs4pB1Jy63TW8cHreFRDn2mizvXZwqhutjjtK2Vg3HzSdWDedvekaaSIzN3PyVw+VByz3wZPgY3wQ8FAEEEEAAgZ4JrCTAHXuJU51TXjMbbxx/3TBSjdvagnd6a4Ww32ZhbTP2zX67LP0jffM3q7q3WKhfY2WLoI2cYLPNQvaIOcLcvDo3PrJut6B+QTSRayp6ScXOF1KckcHgA9Hld3cMFt86vP3we6q5SM8uMoaDAAII9FyA97g9nyCGhwACG1/gst09du/unc/q0H3KiX3SqTynZsdN5LCIPS0i+5zZoFElXL7rGAuFW/oJl2lpBdW+yFz56r2s4m0uUjfyyr4KhesX9XGLZrXwxIh2jlYSYc8tLS/y2V5JS4l8xONPcC23dH4WpMXExv+O5AwQQAABBDaSwErD2/KlVMuptu9xZojbfFlU7nftQtz61dnkILd+LRYD2/ojH1e9iFmsFsjC6fBpqhseTZsn981NY0utFkb3UqgOReSWiF5Vkcumer4w+bAQfd8GxTu7du/58WHdfWEjXYeMFQEEENhoAp3f6m60E2S8CCCAQN8FzKy4/PDyCw+H8qnh8tILosUpUfMLyx0Tc8+YyNMm7ilzsr3OXMtYd65F5qKAfxlfV8BmsfBoWWyjWng04MyaRswRDNdvViZ0/dXsPBoT1VY53Lwt33z+yuF6ROnxk/sOj28bbun0zDmrJrnvVyfjQwABBBBAYPUExgtfW0thWw84vphZHTPmD5j8vD4a9Pq2WW2Hag9x66PZ9Erc8sVCzFLznrXxWPGVwcgxWtsrlEec2Ct3pP/uyOuTtn654WVjecp5TXKyTRFvNfaqqjivzJWHKsV1FbkqWnysahfE9JyYOzNYWPxg+0DeObz98Aeq6lbvymFPCCCAAAJdBTq9be26c7ZHAAEEEFg9gQt2+7C7fe9Ty4V7UUyeN9OTZssntCiecc4OmbOnpZDdvs1Eo1p4JBSObzaaC83F2+LL/LZQOL53GX0nkb1xqXtJZL/m+PjhcF0EnEW6I72G6zdPcTzTFqJrbtvyFFjeNK33cPn2K3vTls/xalQRj55R26+Ort51xZ4QQAABBBDoKvA4wW061jwBbqfwNn+CbpzQeOhajaHari3EHdlhl5YK5UNHl0OrRjIS4jaPNLm9Qtgug8vPLIa50/vlVvW97T1zTZzc1UKvFoVeMec+Vl04p2pnReX0giveK/bueueY7r3c9XphewQQQACBJy9A4PvkzTkiAgggsGYCZrbj0qO7Ly09uvWS6eATZsunxPS4mR1zvoWE2dOmsj9faK6KF81CqFu/uSpD1rEwdzQYbnYXHusvPLbwXB1o5pW54U3IWJuH+i1l3lIi7mFy1XB9hOmL0YU3TmPHHJ+eqY0cWkPi5tNr/sa4JRJuvR66VRKP7oLK4jX7JmPHCCCAwCYQWI3ANjG0B7cjYenIImTjz4UjPXDHH14ebnJ4Wz8kbjPa/XXskeUTbXXkCdW4jdB2WiVuecxG5Wx1rYyGuFX0GrbI++TG82i2XYivePLXPXWbhrRt2GMjyK335BdAU5Obonq1ELmsqhdE7bzqwhm14c8Wt+1798i23e+q6oNNcHlzCggggAACrf3mYUEAAQQQ2NQCvgL44oMbzz0aPnrJ2fCTA5VTzslJVTk2HLojqvK0M3nKzHa2tpAoq31Hg+F82/BGK3trNqlqeHY4PBq11hFxt3A4jmhi8Dqx73B83Ogb07UJiXO1iDc9KB7fPr9wVx4YzxtJb+pvE04OAQQQ6LVAeyOE+dsj5Cc3ObAdfSaa57mppW1C+26y3rHt1HlAOzO8DU+J2fP8WBVsPEZ8huvQTmFqiDvaUmFWiFtDTGytkFmNBbmNc8xaLKjeL1Sum8nVwaC4ZCYXikLODk3OFDp4f9tg27tHdxz4kAXQev0tzeAQQACBVRegwnfVSdkhAgggsDkEbtiNpx7cX/7UA/foRXVyStWOu6EeNZFDZu6QqTwlJvtFZbdJaiMR306FJ5dJrSTKd1x5jDpPODzWUmKscnhKOFy/y8sC3JHq4cY26U3h9Cri6iFj75YnhcR5TfP4dTK1kjgb33jLiZHBl7teaWC88rA4PyeC483xk4CzQACB1RRYzaA2H9e8VbZZnhge3v5msK3+t9xyYqY8T+VtPHrn8Da9pmj9h9Dx8DYepfkM2Bhdo53C+Nb+9Uv16JFFzuJQ8hreWrQ9xC3HUj6kEeJmr5UarRniKxW/6V1Ruakm11WLKypypRjYRTM9b4Wc2VFse2/HzoV3DuiB66t5jbIvBBBAAIHNIUDguznmkbNAAAEE1k3AzBYvP7z8/P1le75wy6ecFifFyVFTOyJih31vYaf2lDjZbyKNquHqzWancDj+WmPzXWozYJ0WDodjZm0qmm94swri6o607+a73PEWE/WeWoPWLEWtAvHGrLUvSjdPNXHazVoFxtNfLEy+d3WC4/Gzm3zLun0bcGAEENikAmsV0CaurtW11ePKT55UYNs8bnvLhJBfhg1H1PLK23D3+Fb1ecyqvo3PtdUeWsLb8RHU7Q/C8DqEuPXptPfGjccqPdKZT2ir4DdTkftSyM3C9LrvlSuil9X0khRysTB31hULZ3Yu6OnD2w+fVtWlTfptxWkhgAACCDwBAQLfJ4DMIRBAAAEEooBvE3Hm0bUXBsvueeeWT4nYcWfFMbHhERM7ZKIHzewpUdtnTra3tonoFA6nt2L5YnTxzeJol9vxcNKv3l2/iYsPaItURxeny/c/T0icv3mtr5TqSKNBcfZmeXTrtif1WYvYpX3MDIuz02+vMG765Nf87Erj8VG0fc+sboA85zH55kUAgd4KzG5gMHuLric3PaCNzzmTPub7WTgpYp5VYVsfe9pZ57Wpo5W2zdGPh7ZjZ9cS3NbPBC3R71j/2/z5ryqBDc+0oxWvten0Xrj1U2R7FW66f7wnbpdK3PTaIg5UC3koprdU9bqKXVPRK6KDS4W6CyJ6vigWzgwXitOnth38QFXvd73m2B4BBBBAAIGVCBD4rkSNxyCAAAIIrLnANbP995eufNI9WHpOtDjpVE+IGx4bmj1T+LYSYgdFZL+zuAjdrHA4f6Naxb2hUHg0+o0VxOHPxl1rHRLHN76pv2AOnI833Z4HtKNv7pvDHolyW9OK2dXF9Zv4yVM/Kjn1Isk2XrsAeZ5Rx1GuTZjcJjD7pdfsLdb8248DINBZYL5odb6tOh985AGzQ9n0gOnjWZWANn/ymXhio+HkZIHRLSeHti3nNqHStm2I+XNRY09VLjv+zDMW8Taqb1sCYP9MG/+f/SBu7nd8MbPmaOs2Cs0K3LhVvfO8Crfaw7RKXNXlQuWmiNxU0WtO5MpA9WMpBhcKs3Ni7myxY/HDnYuH3j+o6rfjAwEEEEAAgV4J8J6iV9PBYBBAAAEEViJwye4csfsPnn80XH5eVE+64fC4qRxSc0+L6FPm3AFT3Sdie011t7k8IPZHzALPlgrifIv2dhAxJB5thjgeo45WGsc9p0ri8qtyP+3VxGmb8Ja4NZAef5M/2n6ifmhbvDy62/kC47HhjExk3ppi1rbpoasfIM8+clv8M/+LpQ5bzr/pSr4lHuMxqzew1dvTY5zOBnjo6kagq7u31eKbP4D1R5zvHFb2vTp535b/QJ05hPkD2uYZxce1hbTJeuqeOwe28ehjp9NaaRt/Pk4PbeuzGYllm8Ft2FVdp1udW3jQ6CNHRldtM/pPgXVbhvyMqqOUz92jI0y700KX1eyuiN5Ws1taFDdE7LppcVXN98YdnBezs9sGC6d1547TR3TPpdW6/tkPAggggAAC6yHAa/H1UOeYCCCAAALrKnDLbh26tfTgpCzpCZPhsaG4I+rsGRM95HsOi8oBMzsgIr61xF4pZJeZFfHt8MifKcnQrLXDSNOIaSFxiIqnVhLH47VXoHYJi5vjbgbG+Vl1CYzzgKA5pWMvMEZOoLp/QsVxPdr2S2UlAXLaU6cgOT/8yElNrkxuP9K3Rr3MAAAL5ElEQVSki35lwdWsb6HVeYn35CqfZ50P97cJdAtSpxnOTDinTsDjXcPTj90IYv0oOg21WzCbTnL0UY8T0LYOeWTiJvuNxa9xiDMD2+yoE3rcjo9rpNo2/BAeD23D41qD2+Ye88rbOkiuhXOC1h645fHzuUifq6oTJ/e0kNsi4lsp3BCTG74nropdsUI/HkhxSWVwQRbt3L7FHWf36b4r/BRBAAEEEEBgKwmszruBrSTGuSKAAAIIbDkBM9Mrcu/Yg/u3TsqynTDVoyZyRJ0cHhbukDo5KKoHnLkDIrpXzPb6BepMxjvohifeCSFxeH+bqsyqguG2eDLExC1tJxp7KOdpSlicjyWF2eFwbdXF9e2NCKDadHpoPHpuoxdRfsRJeU4zF58Q205MwCad0/jlXIfJ6b75H9v2zbHigDnf2YRXbLND59kj6voN3Slva9n5Vn3xuf5u3UcwFrbWeV3Xy6bcfmUBbPthm+czLZQNP+oaI55gUf4Lx3hF7Oxxx+t6QkCbDaCl3rb6WT12lPKGllrZ7GiZTt4eIfzQTd9t4+c7q1VCenqoz6vtp015NuXuJ1belmNpDW9F/Y/c+6J6W8RuF1rcELMbVsi1gSuuWCGXVeSSml2UBT23Y+e+s4dk1wXVWTO+wkuUhyGAAAIIILBJBLbqa+5NMn2cBgIIIIBAXwXMbHDxwY1n3dKjE8vqTojTo1a4Z8yKw+KWD0kxeErMPSXifB/ivYXoTqey05wVWeY7UlM8Z1gc3lw3q5GTU75QTdtCdeMvDCYFxuVBRgLWZl48LerMA+IyJmkmumHIeYjSNtdt7Srqx82zh7FOHPEwLaWtjeHNLK3sFhJPC5mb57N6V/zkF4E9e3nYs+FUM9A9P129yWvdU/uA1mKYLfFhY0TzRHFzBbDVD676Img9n5bvx2nnPbq39n22NkPIzjMPQLM9lBW1fsO2mHii3WhYW/0cmjCvc1TZhjFU4xnvcVudYWP49RdV0Jz9I+XoeVVbh8XL1BUm953Y/UJ99W1xU7S4Lm54XYqFK6rusrriYyns4oIV54rFbeeO7jjwkaoO1/ibg90jgAACCCCw5QT6+hJ6y00EJ/z/t3cuXG0jSRS+t1ryA4MnCRNmdv//b9uzS4aEMRg/pK7a0zLYli1bsiETJlOc44PU6kfVp5bSXFeqnYATcAJOwAkkAindxLdl8VtvqZ8LxN+QUkxkuI5qn8Tsg4EpingM07HCrmAYgRiZVWkn+nWxeCMVrv/B38pRXP/DfWcDu7MjjFdjNi8wjonHz7a+UkB+8XgtQhwUkXe9b55/TRvm7dZskna7iU07PR3Jn7DHs1VwbvLnTWKNax3vC9XHnuPXLTtf1/rt3i+vF1C799BFOG3zrE2cbWtfXd+Zm0c9ODA3uz8TR6JkX4xtiCg97Mfu10Z1cXbvnVF11CTV7g2+n13iQAqEdcsGkXYzWnMU7ikRtqu+6oLtuv+9HLcNIyfRllyQeIJhCmIq4AMoE8AmhN0reR+EX1HiDsK7HOF/y558+djL/+dpEzo9TV7JCTgBJ+AEnMBfQuC9rJ3/Emd9ECfgBJyAE3ACPzMBM8v/M/v6OzO9iYXd0OJnBa/V9FqUH1XsA1Yb2CWh+CqlnzBY2sRuBKmii7NOgvGzANT0n4X3pN4DwvGLyLISVjaRcodyFZ8tIFeaRl1IWfe1f1CbHk3RztsV9vzfa1CPYu6afLTG8ISVWpu93WXGlZedh/7OiX4727F9c04VxM/w4VSeJ797Ovpwqh37PE+Kta27cSAy9LivRwTYjQa5nn9tgvVh/9eqcGXOXr0j6Q5e7G/KVbvpq1mgPfRu2wXXpP0eFWuf37t1X3bE8VWUbQnFjMIpwWlKkwAibVT2AJF7Ud6r2Deh3Anszhi+hJy3Vsrtv4ef/kuyOHmuegMn4AScgBNwAk7g3RE4aw397rxwg5yAE3ACTsAJOIFXEzCzyy+LL/8qlnajiDca5FdEXBvsGimyOInFAWOqXRpwkT4wG4IYmGIIsb4p8sqQ5xXGbvRrbeGxk8t4LbJseXKegLwyoJKSD650dsXYJnzPdTqtlp4rNYh0XQXmLWw7xhw2YPtKTX46avPuXdke7lT5sH3aHYr3bmzZiXX7mD+sxgn4DudyfY31dYCdpdytigfn1J5ZbVLsboMWAbZ6AJq+RmrmsXnUWiXfgzu91TcW27w39kes56rdvKv2o2nTtZWY+3xt6yW0Gze8Pn+pKiigXFAwg2EOckbgKX1M+MiISRJtAbsneIeAO4n6hyDc5j3efu5/TrltH18zg7ytE3ACTsAJOAEn8HMQ+Lsvq3+Ou+BeOAEn4AScgBP4SQik3MW3mP6qy8W1LsqPFuRDtOKjRfuAjGOLHAfDldKuAFya2YjAyICRml0QGKQN72AYgDowSwLyOky4cTu59WJmR2A5Jh01Cckrueflp01kfZFqNtGKx4NEuwjMGwvOCDh9NnzL7o4RojVPD590nqFvt7h8u546G39WxRNU3iP9n99LLcx2PULn/mqTrXOrmiddxNe1EFq1PCLSbuXA3dRr255wP9J128AmcX3v/XAwT+3G3rpAa0mfLmAyBzFPG48ZMBcyCbRTA6ZkirDFoxgfYoqyDTZBaRMG3gfm3xj1XvrZN+n1724w+sNz2Z71AHojJ+AEnIATcAJOoIHA32Ul7TfPCTgBJ+AEnIAT+AcSqDa/w+MnWy6ubRE/aeCHaOVHifzFaL9QcKVmY1pKT5EEZIxISzmNRwa7QBV5jL4ZegRy0HID82pzvI2+unt4XPrdFlK5H7/aJGU1RrkeiII+dps3C7ftUQ6UnrTK6yJ1d52Axwc+X8zuOv77rNeuv58ntr542zmadwdPbTrXZdyts80XG+10j4uvK/l039fdWVOLkq2e1W7Ry7We15GzVMIKGAsDChJLKBYQzAg+kZiacZp+E3g02oOQE9OUCoF/arA/A7NvEu2e/fCVvf7d77j86gJt+2zwGk7ACTgBJ+AEnMCPIXDSnwI/xkQf1Qk4ASfgBJyAE3ACb0vAzIa3mI65eLpaCi5ljqsYcEmNo0iMGDFCkAszHYEytFhegGEI6tCipjQWQzL0zXRAYV8j+qD1AfQM2hcwV0UPgjwJzaoWdlXl/UVYvaRxkdakGm4JYU1t2mTETikXtjpus/tt79Tx3r73QraN3ff19YiE28GwtpQRrXOlZa41C80rOXf7p0mAFWFMwisUhQiWCisIWQBYwriQgIWpLUiZm8UFDDMGmcHSJ84YsieYzkiZIuqTBUyDYWoSpiHiUQd46CkerX/xcIPRhOTs+94r790JOAEn4AScgBNwAu+LwPdeJ78vb90aJ+AEnIATcAJOwAn8AAJpQ70JJldPcx2XYleyKK7Yyy5jsbgkw6iwOArGkQYbiGJgDLla7BOWw0KPiLmRPVQpLpDBtGeQjGSupnmqRzAzIDNjBlqW6hGWmSEzWkYwpGOYBSGDEgGW6kDUniOeE5sDq8OWuN2Tqb7JIrQ9bPZku2oN3iAcuYM222Bjl7y0O822mgipBiiIUgxRzSLISKI0WKSxXB2zBFCiOreSqK6n8kIohVkSYrUEZVnVIwqaLQ2hAONyVS8saLFQwVwi55E2zRmmZnEa8v6jLctH7ecPmfLhYiCTMcYPvjHY66alt3YCTsAJOAEn4AScQBuBN1lrtw3i152AE3ACTsAJOAEn4ATeLwFbCb7DCSb9h1l5kUvZmzMbZtQ+5joQSq8UGxqKnqn0A6VvWvZKMqdaFkSQopiZDkChIiiUgIkFiIBiikCFQCxpzBLNQnWwEpxpko5NUhk0FRuNEKuqIJ0LUdlJS+fVNQqgQmOSZlflgHDlDy2NX5VRIM/qrSaV2JJxSlCr7bVY/a7K0kVjqiMpDYDCVuWrbbhSvZe6qrRUToNoJbAqqNRkEE1XfWkgY3VJK6uUgqhp/Fi11QTEBDHZZFE1Rb9G1eRtmSXBVbJlNF1QdEHky0w5U9MlBjIvTRYDK2eFZsurYfY0xjhFyc648sd/nIATcAJOwAk4ASfgBP6hBP4PZFdf798VWvgAAAAASUVORK5CYII="

/***/ }),
/* 25 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/me.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDhFODZFMjNBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDhFODZFMjRBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMUY0MDQ2NkFBRDIxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowOEU4NkUyMkFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvxsfxQAAAfSSURBVHja7F1t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"

/***/ }),
/* 26 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/notice.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/notice.png";

/***/ }),
/* 27 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/qt.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/qt.png";

/***/ }),
/* 28 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/question-bg.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/question-bg.png";

/***/ }),
/* 29 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/shop-s.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDhFODZFMkJBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDhFODZFMkNBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowOEU4NkUyOUFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowOEU4NkUyQUFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuYi88oAAA2JSURBVHja7F0L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"

/***/ }),
/* 30 */
/*!**************************************!*\
  !*** G:/外包/垃圾分类/static/img/shop.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkYyRTlDRkNBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkYyRTlDRkRBQUQzMTFFQUE0OENBQjk5NUJEREEyMUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRjJFOUNGQUFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRjJFOUNGQkFBRDMxMUVBQTQ4Q0FCOTk1QkREQTIxRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pp/DA8YAAA0gSURBVHja7F0L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"

/***/ }),
/* 31 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/yf.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/yf.png";

/***/ }),
/* 32 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/yh.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/yh.png";

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */
/*!********************************************!*\
  !*** G:/外包/垃圾分类/static/img/complatebg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/complatebg.png";

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map