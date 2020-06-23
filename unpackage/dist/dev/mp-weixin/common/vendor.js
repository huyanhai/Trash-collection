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
  return new Promise(function (resolve, reject) {
    uni.showLoading();
    uni.request({
      method: 'GET',
      url: _index.BASE_URL + url,
      timeout: _index.TIMEOUT,
      success: function success(res) {
        uni.hideLoading();
        if (res.data.code !== 0) {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 3000 });

          resolve(res.data.result);
        } else {
          resolve(res.data.result || true);
        }
      },
      fail: function fail(err) {
        uni.hideLoading();
        uni.showToast({
          title: err.msg,
          icon: 'none' });

        reject(err);
      } });

  });
}

function post(url, data) {
  return new Promise(function (resolve, reject) {
    uni.showLoading();
    uni.request({
      method: 'POST',
      url: _index.BASE_URL + url,
      timeout: _index.TIMEOUT,
      data: data,
      success: function success(res) {
        uni.hideLoading();
        if (res.data.code !== 0) {
          uni.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 3000 });

          resolve(res.data.result);
        } else {
          resolve(res.data.result || true);
        }
      },
      fail: function fail(err) {
        uni.hideLoading();
        uni.showToast({
          title: err.msg,
          icon: 'none' });

        reject(err);
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
Object.defineProperty(exports, "__esModule", { value: true });exports.TIMEOUT = exports.BASE_URL = void 0;var BASE_URL = "https://xiaochengxu.quanwan.vip/"; //请求地址
exports.BASE_URL = BASE_URL;var TIMEOUT = 30000; // ms
exports.TIMEOUT = TIMEOUT;

/***/ }),
/* 12 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/libs/checkAuth.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.checkAuth = checkAuth;function checkAuth() {
  var auth = uni.getStorageSync("auth");
  if (!auth) {
    return uni.navigateTo({
      url: "login" });

  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!************************************************!*\
  !*** G:/外包/垃圾分类/static/img sync ^\.\/.*\.png$ ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./complatebg.png": 14,
	"./icon-notice.png": 15,
	"./khs.png": 16,
	"./knowledge-s.png": 17,
	"./knowledge.png": 18,
	"./knowledge1-s.png": 19,
	"./knowledge1.png": 20,
	"./login-bg.png": 21,
	"./login-title.png": 22,
	"./me-bg.png": 23,
	"./me-fl.png": 24,
	"./me-hz.png": 25,
	"./me-s.png": 26,
	"./me-tx.png": 27,
	"./me-xbg.png": 28,
	"./me.png": 29,
	"./mima.png": 30,
	"./notice.png": 31,
	"./qt.png": 32,
	"./question-bg.png": 33,
	"./shop-s.png": 34,
	"./shop.png": 35,
	"./yf.png": 36,
	"./yh.png": 37,
	"./yiyonglaji.png": 38,
	"./yonghu.png": 39
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
webpackContext.id = 13;

/***/ }),
/* 14 */
/*!********************************************!*\
  !*** G:/外包/垃圾分类/static/img/complatebg.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 15 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/icon-notice.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAjVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8DizOFAAAALnRSTlMAs9eRA+zLrqp8pWnxuYiBVkY7GxH4w5yZjXhybmFPSzAkDAf05N7d1L90ZF82GkZMHQAAAM5JREFUKM990VcSwjAMBFAFHAeTkE7vve/9j8eIYYhT5P3S6n14bJOUrZmQnEJ7kFVNei6ewcGqDweXHmRWTx8i7xcXoMZqM1tmiQnXYRJcWWpcaGDYhxWbDz242PA86OSzUXSTGUho7GKffDcPeA4EjuktcxQfiVYi0zeZhicyp9hvlo9VmqeLwG8xR/PT8aC2XgfPAYx+c65bnPHi/+PzJh9PQFTVdYOJTyyrGjb4BWBn9WmdyzGQWv0wqjENgdjuO3O3a843c2Qahe3lBxSPP6aCpjpgAAAAAElFTkSuQmCC"

/***/ }),
/* 16 */
/*!*************************************!*\
  !*** G:/外包/垃圾分类/static/img/khs.png ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/khs.png";

/***/ }),
/* 17 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge-s.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAASFBMVEUAAAAsg0pAv4AshEkzmWYthEkthUsthk0shUorhEkrhEkwhUssg0orhEorg0krhUk6l1EshEkthUwshEkshEkth0s7iU4rg0ki8I67AAAAF3RSTlMAigT7BY9mKH924R6A3NSUC58hx7MRDSJ4h5YAAADTSURBVGje7dnLDoIwEIVhEC/YWioCzvu/qZhmwsKYQccxaTn/rqtv01mdCiGE0Oa61l1Dc/XzsaM3nauXWppruvq+wugo9QWSCpOIRNIi1ItI0CNORBo9Qnsg5SPe2yPeBW+HsEEUvB3CBisWCBus2CDJSDlvhCSDlZsNwgYrFggbi/J7JLKxKL0CWR8QIED+gQwHqUGPXCqpFkiJSDl3AgSIHRJPUjGTiwfyETIepcZMvjAQIECAACkGCXrE6acNuV490siFSTE3yfHchBBCCOXbA4eQOyGWGXowAAAAAElFTkSuQmCC"

/***/ }),
/* 18 */
/*!*******************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAk1BMVEUAAADN0svK0Mfc4NvM6MvM0crM0crM0crN0svN0srM0szN08vM0crO08zN0svN0crM08rO1MvP08zN1MvN0cvN0svN08vO1M7N0cvO1c7O1s7P087M0cnN0crN0srN0szN0svM6svO1s3O1c3U1tPMzsrc4NvN0svc4Nvc4NvM58vM4cvN0svQz8/M0crGy8TMysoF3o2pAAAALnRSTlMAtwqvg+Le0pt7D3D5BKjmy21mTuCkd3NKNS8J9OrWspaFgjsm/cnBuJt1aVobn4Vy0AAAAR5JREFUaN7t2FtPwjAYxvEOXQHX0W3s4BgnAc/66vf/dK4ajaI1tGkXFp7/1durX96k68UYQgghhJDb4o2ktttBO9+90K9WMftRSW3zyc4I2VyTKlDI2R/IZA+J6D3+bILMyQp5fTRByBK56gI5B/IfMugA2fLKO1JzotQzMsvVmHpFZvJjjrwhjNWLz0PkCSnUHl9VLPOBjLbL78csEx6QJNw7u0T0AQFy7IgI1iNd68QVMmX6oi6QtFebXDJt7l7hfKhP9ukKAzlCRC65toUjRDzFF7qa0tnHeBLPirNNimqsqwx6dYWBAAECpEvE5qeasEQeTJCVHSJqE2SXkGqokJuDEZkxo6ZBHoZh0bTjPQ8PKxk3DCGEEEKoj70By9+evpCb39sAAAAASUVORK5CYII="

/***/ }),
/* 19 */
/*!**********************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge1-s.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAflBMVEUAAAAshUorhEkthUkrg0mA/4Arg0kshEo0jlUshEkshUotiEwrg0krhEkshEorhEpAv4AshEksg0kshEoshUsuhkwwik8rg0oshUoshUorhEorg0osg0krhEosh0wuhkowh04shEkrhEkrg0oshUtAoGAshEkshEkrhEorg0koGIXZAAAAKXRSTlMAecN9/ALyogycYCj46d64BOPHZkciFO10VdnQgm0zLx3Mvo8+BbCmh7JUuJ4AAAGhSURBVGje7dhbcoJAEIXhDhlGriKIgvd49+x/g8GIJZP4AFPTD6nqfwNfnaqhHyBJkiRJYsvfeBWMPumZh/ep1S0YhGQAeiOvll8DjCnsEGQDkIMtgl1/RFsj0/4IrJEPQQQRRBBBBBHEGTKitknOh6gZPYrAhyBsh4zZkNeUCJwIwnYIF/KaEoEXQXgfwo2o2bshKjzF24+xKwThmyEVDgERBVdXiFr/dWvAuyu+Z4H060j+qFViLmRN9KMUd2XMg2yIWmU/J8o4EBURdZWCAUkWRB1lFSfuEV0SGUoK54g+UTf/mMI5ku7IbJE4R/KYzKYKdsiAHw814BpZzcnsBudI8cvwQzhHsoCMzlc4Ry5nMgoyOEf0aGYaHpwjiUbeVeYruEeyqfGRfC3BgKypUdKnEufgQErqKNsKHIi+P61IPU7XSYMFGRE9lGpHZQIepGxPrkLaSDzI+HXYVQImZN0+3E24BLiQBTVtL2jiQ44NkQG8CLw9wI4A/w2pYNumP1LAtrI/UsMyPe+PTGyn1DSgSV1oDEzlh5IkSZIkia9vfa0Lgq8p76sAAAAASUVORK5CYII="

/***/ }),
/* 20 */
/*!********************************************!*\
  !*** G:/外包/垃圾分类/static/img/knowledge1.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAgVBMVEUAAADM08rM0cvM0szM0cv////N0svN0svQ8NDN0svN0svM0svO08vN0svN0svN0svR2tHN0svN0svN08vO08zO083R1M3Q1c7V4dXM0svN0szO08zN0svN0szO1M3P1c/M0svN0svN08zP0s3M0crN0cvN0svN0svP08vN0crM0cpVU6wYAAAAKnRSTlMAecN9+wKj8QX+6+Rgzse4EPeddDMnIhsL3WtVgmVJLdm+j0LesJiHPdqTBg8pAAABqklEQVRo3u3UW4+CMBCG4coC5YyAKOL57H7//wcubFhr1QsgnYtN5r3tNE8maSo4juM4jiyntiS0vh5nFj5nx7dqkJEC6I2o9osBSI1xCNIByGEsgl1/RI5GNv0RjEYmjDDCCCOMMMKIMcQVXV5Ih9jz7iwCHYK8W2RJhqhVIlAiyNUiJIhaJQItglwtQofY80+L2PlpN5ucTSHIvTNeC3ComhuVawqx1+9uAVit4liGkPeOjuMCybS5U1Ih62b2oSxJEL8QolPiRkkpEDtqR5WSECDZqp1USpmZR7KtEJoSwDgi79oF5xjCOBLMhN4qM46EpdDb+DCNfC9e5gvANBK/GjcYR5KpPuxcYRxJK33Wc2EcuXj6aJXCOCLduTY5tWAcySTCZ2URwzyS1j7CUhl7ECBrsXlSyhAUyEm0SrATbbMAFIhsn1bUKXcJEsQVbZHdfpDbDDTIqftyG6WRaJClI/4U3wYRsu4ebn3dA1TI6vdNXaAiQI4NkQK0CKwYIEeA/4ZIjK3ujyQY27Y/UmBkctof8cauUogBeUUiMTA/PGwFx3Ecx9H1A90bF5BlUcFZAAAAAElFTkSuQmCC"

/***/ }),
/* 21 */
/*!******************************************!*\
  !*** G:/外包/垃圾分类/static/img/login-bg.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/login-bg.png";

/***/ }),
/* 22 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/login-title.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 23 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-bg.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/me-bg.png";

/***/ }),
/* 24 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-fl.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/me-fl.png";

/***/ }),
/* 25 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-hz.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 26 */
/*!**************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-s.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAkFBMVEUAAAArg0krhEoshEkrg0kthEoshEkrhEorhEoshEsuh0w2jFErg0oshEowhk4rhEkrg0krhEkrg0orhEkshUkshUotg0sthkwuhU9JpFsrhEkrg0krhEoshEouhUsvh0tAn2Asg0kshEorg0orhEkrhUoshUsthUsyiVFJkm0rhEkrg0kshEksg0ktg0org0nIloGbAAAAL3RSTlMA+r3143jww3VTMBCNbx7m0LKlin5eQSkXBevXuVg7JQjLrKKblEkyFAfex4WoZ4PcUu0AAAHTSURBVGje7dhpc4IwEAZgUxCQQxC87/u27///d21tO+IoxmxWZ5jJ8zEffEfCbjZUDMMwDOPdxlkjiYU9azT9ymvUl31c7I8Bf0QQClxzvB1zRruPW4MJa8anwD1OmzGjiQKixpYxQiHLZ8rYWChmd3lCEjyyYMlo4TGOB7azJSFDll2XYaiWFDKedkbPgcxBv/FCLtDfErmObkgEOe0OlkGupRsSPhNSisdF3Hj6KyzSZvXPAjkBZzFGufVGrhhZ20o1t+zml7XVLr8WT+8+xQ5vq1/+L24HuVbPfWgttuclP8GFz378OqvWOpojJy3RIHHZ+1vWplTDXfGYui7dwP1dGXeuDr+1WbZL0I/eOBsmfRGfr3NGsfrIC08fV4Zp6NX49qXTTAqL0fXqHBGTOR4SK+3uFawEZKxjT+9J7fEMV+fPrB08x/YZWzx/y/ct3OA+vLo2VBx2lJAG1ISUEwSKBKEsZ1C14Hiz+Kf7OSEkU8yYWoSQgWqtg0JxsFiBItIuEv5SmYHipBYSg8JVCxGgGLzjn3yohbigWKqFeKCoKQ5alIq3p/pfh/g/5PTUdyUlXEhUU+ZTykUhU9kXJ6KO2Z4bC8gJexgFFcMwDMN4sS+EMao8rNaXJwAAAABJRU5ErkJggg=="

/***/ }),
/* 27 */
/*!***************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-tx.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 28 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/me-xbg.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 29 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/me.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAgVBMVEUAAADa4NrN0crN0szN0svP1M3N0svN0cvN0svN08zN0svN0svN0szN0svN08zN0svN0svN0svO08vO1c7R19HU1tTM0crN0svN0svO1MzN0svN0svN0svN0svN1M3P18/N0svN0svT3NPM0svN08zO08zQ1czN0svO1s7R0dHM0coOT1kjAAAAKnRSTlMABr135DH59aVV8MOJz3/gtG9eJxYS/NeOQevIrZY7H590DrpPSCxnJBz9BK8CAAABxUlEQVRo3u3Y226CQBAG4N2yIHJGUahiPVSt/u//gE1TE0Iq4Cyzpib7XXrzhx1nZkFYlmVZ1rN9RFmsPLWuk7MwY7tZoZEmB/6IReWhLdhL5oz3Ff4qL6wZXx7uCd4ZMxJ0WE7ZMqboNHGZMtwJuqUFT0iMPj5Lxgz9OA5Mpuj3abDqjfn4EB9DnPGnFWDIevzgxbADQ0nMFyXHsNETLMKw2UuEPHRcL1H4DzQ8P3Fudq2/MGcz5qKRcTaj8O/Pj7D1M2NRlLx7inPeUb8TN0XZGvW8S2u3+F3IMRou+/oNqtkpr9vr1/xFQhUvdCWiXe74r6mnJ1y45+ZfHRwphOGXoGghjJA/r3OrpYqzxBVWt+1sX/lvLZ9+tJ/y1eWcxJ3NGO63HBHzGr28TTG6PTZLDJkkctxjlHhEOOZhTgEek7p8I75v5LMtK/7lVaSgWGtVPwNNpbNBQORptOUaVD454wi6MzWkBl1EzJAT0JUGT6txoYVsoCM31ySNSuOSbfpPrKAjpIV40FH+wycJoWNHC3Gg40gLuep0vJLjP9zwf8iRobkuaSyoKbUUdDKi1CXIhZ6rE6olhnkqyw/CsizLsgz7BgjFfDY0bKj1AAAAAElFTkSuQmCC"

/***/ }),
/* 30 */
/*!**************************************!*\
  !*** G:/外包/垃圾分类/static/img/mima.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAkCAYAAACe0YppAAAFAUlEQVRYR+2Xf4hUVRTHv+fOiMVuauZWKAZS0Q/Y1dLcanfuvNUKSRBy5i2bvzZNKhVKdBOi/iooMsX+KLIS3FZCc9+YKbUltry5sysGbbaSFlJSKulqiombjjNzT9znrE3JvPfcsL86f83wzvl+7o9zzz2XEN4oGYvNAJENYDKAmwCcAXAAzNvzkUjrVtc9HVaOwjg+JuVdUeADBu7z8T9JzC3tmUxrGM1AcGNDQ50uFD4FMLwoeISBLwg4zMzDiKiuuAIXtYheddLpF4PgvuAmKcfmgR4AVQxkhRAtJ4C1ruvmS4Vn1tXdL4RoBdEdRfgCJ51e7wf3BSek/JCAWQAMaLqj1I5yYrPq66+/IMQuAHeC+VQ+ErnVb8/Lgu0pU8ZwLncIRAJEa5x0elnQ8tmx2GQm2m0WHECLo9TqcjFlwUkpnwawFgDraHTcls7OX4LA5ntSym4ADwJIO0pZVwxOxGKricjM8oij1NgwUOOTiMVWEtHzAI46So0eDLiNiOYC2OModW9YcDIeXwHm101eOEoNuWJwMh7fAOY5BHzTrtTE0GApWwC8AaDgKBX9HzywAuWz+r9eajsWqwLzRAixgoEGAg5o5lfC7jERPQxgHoAsMy8URGciwJ5NSh0u1bg0Y1vKcQBWMzADQCQsKKQfE9CBQmFRe3f3Ia+ke2fPsiaR1p8DuCGk0GDdjkWFeGCT6/5Ms2trh2WHDt0PYAyA88y8Ukci7dFcLgch/tXMtdYkotHRYH7BbFtxtJ2OUlMpKeVLAMweFrQQ07a47s7BTscnzjQRnSDySmgEuNuA9wCYwMBHKaWargLUk7Tr66exEB1F/WYDPguggpkXpTIZcykEG4PGb5tn5bPnevc1tp8KDvBqeA0R9Xq+RM8aMF/8TfPa0+kNYUQmbGlewsxvgdDVO7MtFibGlrKagb2l4ByAKLRe4HR1+XYNA4DxqeZVAC8H8Gtvos0kZaAlpLzH1H3jyMyLzYxPAhjJzMtSmcyaQAUAgwHPjMcbBHOnp8/8OCXj8a9NpWLmd1KZzOKrBS5pLEDMtZSQch0BTzLzT6lM5rarBbaldBhImFKa7e8fac5XE4g2GmBBiOqPXfe7IPiVLrVlWdeM0voEgEoAXzpKPUSP1NRUDBsx4iiA6xh4L6WU6bV8bXxq7nKAVgHo6U20TQryT8bji8H8djGjvdbXq9VJKU1SLTXtCgtRnXLdH/zEJr771JBc1blEPo9d+xs3eEW/nNmWVcla/1h88hyrFGJcq+ue98C2Zd3MWhvYcAJ2n62osDo6OrJBMwnzPRGPryfmJ4yvYF60uVikLl2LSctaCK3fL4q1OUo1hxH280lKac662RJToVwnnZ4KQHt/SwOTUpp9GDhSm7P9/fO39/T8MYgBmPrwMgDzhjKMg1khare77m8DWn8DW5YVrdJ6KwPTiw7fAljiKGWeJqEsIeXtAniTgUe9AObjrPWUVHf3vlKBy3ou27Yj6OsznchzRUdTy7dB63WV0ehOkxj/HIGJKfT11UWA2QzMB+D1096lkM/PGOg6fMEDHxsta47W2mT7qJKAfgBfgeggmM2tdi0BY/niQ/0vP2ZNROt+P3162Y69e03MZeb7WjQvwCzRUiJ6BsCNgWvNfAFEnzDwWkopc8+XtcCHuYn09p65gZlNVtaA6BZThYjZdJLHAXwPoq4hQny2sSSB/MB/Ao2hMgkLEsmHAAAAAElFTkSuQmCC"

/***/ }),
/* 31 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/notice.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 32 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/qt.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/qt.png";

/***/ }),
/* 33 */
/*!*********************************************!*\
  !*** G:/外包/垃圾分类/static/img/question-bg.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/question-bg.png";

/***/ }),
/* 34 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/shop-s.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAkFBMVEUAAAAshEorhEsshEosg0kshEorg0k0iVFJnWIshEkwh086pmwrg0k1j1crg0kuh00uhkwrhEorg0kshEkshEoshUsthUsuh0wrg0kshEkshEkthEsshUsrg0oshEkrhEkrg0kuhkwrhEkshEkshUsrhEkrhEoshEkrhEkrhEoshUoshEoshUoshUoshEorg0kdw46NAAAAL3RSTlMA/JODyrztEgePGAT2CtQlH7PndWdJNyvx3XtEPsKnoYkwq5xT4NjPt5lvYlxXTrPBU/UAAAMYSURBVGje7NTNUsIwFIbhLxIaWko7VFCLaMcOU0Udv/u/O7fpouHkh12edWaSzHsSZFmWZdndnMemUB46XbbwY9b0p65beKgaBvnaQW5koAeIPTGUknfZM9gAoVYxWG0gUzLCI0R2BSNMEDkwyiskPhnlHQJnxqlN0ENMn75SjNTjphUFItNvOkYbccMvLWrSQgUtqoKbtk9kIHbs7PTy/7fZwMNRnn6wlp7gpZCmN7W18hte+ll6afY9fLS0vMDhSgZepdK0PWNZwxldroSGgjMHLOuYyArLaiZSusfw/ptMDCeemTUT+cOyE9NQBss+mMYbXBom8QOXC1Pot3DSTOACt/a/HTNbUhWGougGbOYhzMgkXLCdzf//3RV4aDQ4UJV+6WI9pkIt8Zydo+EQlQbvCAXKYrZTzS2cysmqW3hvSegjSQ5rzzrOQMM6vix8QP2Y+1UNQJUeDja7W8UxeTBXKj7COI4LIwcYiN3RN+mlKnr0jTBS7CN8jHUpB4+3CUftSKSiX16Xl9Gqcvry+r2Fr2MmlhMRAww6IQoYVEIM/ClURTE+2YYpCKbQx5udoLTNvuFXzflNcdxKYY+BjWCzE0KpzO3JwMC1uO/kfzVezq2kye87bWhd2ycYkW36hGwl0vlcNqqa8WY4em7a5rFTZ5eqMH+e2zVBGDlx3qbuT5JCwNrRCUp+E1gwng7UkJtk+/wZjZskAVDSSXxuEkqe3SrJOj9JCiAQ6NR84Cc54EbE9JfrgKOkBtQ+N97ol4TYjyBuEhPAIURH3KbVQaz8K0GHH3Bt4ULwmU+tiFTk+ibizRUoGKFLCaVnfjWJAF3uor+S2jxW9Di7aDa9sTP4SRoA8ZoyFAr45gSWJNM71ieAo0QHYgDqpVkLtEewtawTEzxjP9MhA3A19KhxHmaRM9TC2kt4RjVT4vVvX0R4oP2m1YuLmJkowLE7RsZz3Qm6Yybndwd5BYyhkPam8k9BqpXbt/+ArWaexDYA9cCG1MdL6kATZxDjRlSad+2gEfwG1lXbr2XBlL9dKVOxsLCwsLDwC/wHhVGAsZgNnlMAAAAASUVORK5CYII="

/***/ }),
/* 35 */
/*!**************************************!*\
  !*** G:/外包/垃圾分类/static/img/shop.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAnFBMVEUAAADM0crN0svM0srN0svb69vN0svN0sv////a5NrN0svN0svT2NPN0svN0svN0svR1tHN0svN0svN0svN08zN0svO08zP1M3Q1M3N0svN0svO08zN1MzO0szN0szN0szP1M3N0svO08vP083N0svN0svN0svN0svO08vP18/R1M3N0svM0svN0svN0svP1M3T29PM0svN0szM0crVJfEJAAAAM3RSTlMA/JODygW8+AIJ05AT6t6qF+62m3VnSSwj8sFUQz6JezLkWjjYsaViTx8cyKCAbygOzpZVE2sYAAADHklEQVRo3u2Y63KqMBRGg0rDHeQiclcQ8K5t3v/dDmI7EwEhYDzT6bD+OGYCi/htshEwMjIyMjLyNgJVmDPkwPVBXPZUSC7qD2OwfRyagAah8z0kKhrIhNyRoKEwF2KJjgaTkTqWaDhQIpSI6AVMMgc/f0WyIZNY6CV8IonwmkQl2k/Qa0Bp0I1IP/o986pE4TolU1Tw5uhZGRW8Ofr4sehnhMgP0WsdkgM2OZUAMQuZPPoVNlXo1YIW5NEfsakR6IVMGr0EsZnnfhIFj5449pRcUO0PTtvvZSA0cCnaAeHY5HvjTJwSklXag9UaHiVOLRJISyK2SOb/Q7KhIeiqmQ9akm2LJKLkYNp2PZuSxAXg/aHkrRKPikNhu/oJBbyufY7CrWJ0Nx8G1YFeY3HnamPqPOi2OKiKEwBer5tjwBl1xwcPCLCrJTZbFaPsqbKxCbdR7ly5JCYkbNrsGQ9GtrhvOb6YdfR9Mu3IYAo9AcTwnirfz3VcYFe2O7mlXslibFTKP+Ry7sHUQE/4S7JrWPp+t782LH5XzP1T8JJEsqLmAtxxjU8P+OSlpQqwLPjZMe4IJw2l+jaQIaHeIaQQrvMf+dZ9rGR1BVr7lmME3EOlpWWRCuYeG+X8o1OW1PQ2etUbOjDX0RzlNNoGl+XKj0PXwe4/w1okFzvwTrqMflgAwAuoAZVeB2bYpw11QU2iFMe4qBGRmmT+/L+sSU2CiuCTZr1GTxI9eYnhBDSCx/tg8lkdTpeAomQFwG0n8TMZq4aJDYphahLIAWCUxcrZXhR+TUJze1+EadEtYWjWrlr6QhOqK5kgtLYeuox2chDKqWai3eJgDlMvuEia7cdiuc18snSr66LUx10J0L1PAH+SK1HlHM0S1gCwixOynqH8xCSIfjFy3VN7Jzy/HfPdO3g7WPjJkr1/0adPJWFPybpcvVt93uK8DQq7XsSQU+R7Lj70WMP7/W2bCei9g9wWedyDFI6hmVuRmCmd/4CvRj+JUETA14+BXS+9LHHSA7s8JoMP5SDuwDu4bkVdmUMob9Kp/8eeWUdGRkZGfgv/AIs8ufU9MZDJAAAAAElFTkSuQmCC"

/***/ }),
/* 36 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/yf.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/yf.png";

/***/ }),
/* 37 */
/*!************************************!*\
  !*** G:/外包/垃圾分类/static/img/yh.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/yh.png";

/***/ }),
/* 38 */
/*!********************************************!*\
  !*** G:/外包/垃圾分类/static/img/yiyonglaji.png ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 39 */
/*!****************************************!*\
  !*** G:/外包/垃圾分类/static/img/yonghu.png ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAMAAADbwBjtAAAAt1BMVEUAAABMTExMTExNTU1OTk5KSkpJSUlMTExMTExMTExMTExMTExMTExMTExMTExMTExLS0tLS0tMTExMTExLS0tMTExMTExMTExMTExMTExMTExMTExNTU1MTExKSkpEREQurV4vrl5MTExMTExMTExLS0tLS0tLS0tLS0tMTExNTU0trWJLS0tMTExLS0tLS0sxr2BKSkoxrl0urV5NTU1MTExMTExLS0surV4wrl8urV1MTEwvrV5XlpnkAAAAO3RSTlMA99B+XBQF/PD+6OXVq2E4Id6ShmlJHPTFto17ck4PC9bFu6SZd21WQi8oIv7ssIg5GRT9y8nGvqt0YxNMvBYAAAFlSURBVDjLnZPXlqMwEAVbMORgDM45e2xP3ry1//9de/DgXTSCl6k3ruqglroldZzeuDt8tPJ7acGd+lR86zQazoiSB0q8g5gsYmCUDtxl59kHZqbyBCq9/XADnlFQH7z+/7LGELuiM4Kivu0jHHXj9YHhoh5MYasrd5BoQQahruzB1pMhgV5MYZwyAkcLZvCsKwqlB3P4rgUdiHVlqQjO9WAHE9FJYFP7PHkEJ9E5e5DLjUEXEvmIDTwNqspCCAdisAVU0psfbQvwGyemCPhH9ySNdH5Ukm8vpY3skCfbou/KZ3COe7uBw717E3YeLUTp7ZpaqbrwFYa79K6B2QhIr/MWnaWFPYRLGUPfWHpZr1ar9YuUq3MJ8cVg/afk53WPqfh0TeVXaXz5fX1ehcR4jum8XS6Xt/e30pMJ5O13GhJkkinIFy19jd8nqweo2GogAqJXKR1FK1ZWjcDE8lUD0SYt+/gX2MNFfCUi3wwAAAAASUVORK5CYII="

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */
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


/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map