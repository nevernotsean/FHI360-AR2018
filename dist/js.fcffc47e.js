// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../scss/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/promise-polyfill/lib/index.js":[function(require,module,exports) {
'use strict';

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  this._state = 0;
  this._handled = false;
  this._value = undefined;
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = function(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
};

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!arr || typeof arr.length === 'undefined')
      throw new TypeError('Promise.all accepts an array');
    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(values) {
  return new Promise(function(resolve, reject) {
    for (var i = 0, len = values.length; i < len; i++) {
      values[i].then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn =
  (typeof setImmediate === 'function' &&
    function(fn) {
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
  if (typeof console !== 'undefined' && console) {
    console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};

module.exports = Promise;

},{}],"../js/site/fullpage-config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var config = {
  //Navigation
  menu: '#menu',
  lockAnchors: false,
  anchors: [],
  navigation: false,
  // navigationPosition: 'right',
  // navigationTooltips: ['firstSlide', 'secondSlide'],
  showActiveTooltip: false,
  slidesNavigation: false,
  // slidesNavPosition: 'bottom',
  //Scrolling
  css3: true,
  scrollingSpeed: 700,
  autoScrolling: true,
  fitToSection: false,
  fitToSectionDelay: 1000,
  scrollBar: false,
  easing: 'easeInOutCubic',
  easingcss3: 'ease',
  loopBottom: false,
  loopTop: false,
  loopHorizontal: true,
  continuousVertical: false,
  continuousHorizontal: false,
  scrollHorizontally: false,
  interlockedSlides: false,
  dragAndMove: false,
  offsetSections: false,
  resetSliders: false,
  fadingEffect: false,
  normalScrollElements: '#element1, .element2',
  scrollOverflow: false,
  scrollOverflowReset: false,
  scrollOverflowOptions: null,
  touchSensitivity: 15,
  normalScrollElementTouchThreshold: 5,
  bigSectionsDestination: null,
  //Accessibility
  keyboardScrolling: true,
  animateAnchor: true,
  recordHistory: true,
  //Design
  controlArrows: true,
  verticalCentered: true,
  sectionsColor: ['#fff'],
  // paddingTop: '0',
  // paddingBottom: '0',
  fixedElements: '#header, #up-down',
  responsiveWidth: 0,
  responsiveHeight: 0,
  responsiveSlides: false,
  // parallax: false,
  // parallaxOptions: {
  // 	type: 'reveal',
  // 	percentage: 62,
  // 	property: 'translate'
  // },
  //Custom selectors
  sectionSelector: '.section',
  slideSelector: '.slide',
  lazyLoading: true,
  //events
  onLeave: function onLeave(index, nextIndex, direction) {},
  afterLoad: function afterLoad(anchorLink, index) {},
  afterRender: function afterRender() {},
  afterResize: function afterResize() {},
  afterResponsive: function afterResponsive(isResponsive) {},
  afterSlideLoad: function afterSlideLoad(anchorLink, index, slideAnchor, slideIndex) {},
  onSlideLeave: function onSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
};
var _default = config;
exports.default = _default;
},{}],"../node_modules/animejs/anime.min.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(e,r,p){if(p.get||p.set)throw new TypeError("ES3 does not support getters and setters.");e!=Array.prototype&&e!=Object.prototype&&(e[r]=p.value)};$jscomp.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:"undefined"!=typeof global&&null!=global?global:e};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(e){return $jscomp.SYMBOL_PREFIX+(e||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var e=$jscomp.global.Symbol.iterator;e||(e=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[e]&&$jscomp.defineProperty(Array.prototype,e,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(e){var r=0;return $jscomp.iteratorPrototype(function(){return r<e.length?{done:!1,value:e[r++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(e){$jscomp.initSymbolIterator();e={next:e};e[$jscomp.global.Symbol.iterator]=function(){return this};return e};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(e,r){$jscomp.initSymbolIterator();e instanceof String&&(e+="");var p=0,m={next:function(){if(p<e.length){var u=p++;return{value:r(u,e[u]),done:!1}}m.next=function(){return{done:!0,value:void 0}};return m.next()}};m[Symbol.iterator]=function(){return m};return m};
$jscomp.polyfill=function(e,r,p,m){if(r){p=$jscomp.global;e=e.split(".");for(m=0;m<e.length-1;m++){var u=e[m];u in p||(p[u]={});p=p[u]}e=e[e.length-1];m=p[e];r=r(m);r!=m&&null!=r&&$jscomp.defineProperty(p,e,{configurable:!0,writable:!0,value:r})}};$jscomp.polyfill("Array.prototype.keys",function(e){return e?e:function(){return $jscomp.iteratorFromArray(this,function(e){return e})}},"es6-impl","es3");var $jscomp$this=this;
(function(e,r){"function"===typeof define&&define.amd?define([],r):"object"===typeof module&&module.exports?module.exports=r():e.anime=r()})(this,function(){function e(a){if(!h.col(a))try{return document.querySelectorAll(a)}catch(c){}}function r(a,c){for(var d=a.length,b=2<=arguments.length?arguments[1]:void 0,f=[],n=0;n<d;n++)if(n in a){var k=a[n];c.call(b,k,n,a)&&f.push(k)}return f}function p(a){return a.reduce(function(a,d){return a.concat(h.arr(d)?p(d):d)},[])}function m(a){if(h.arr(a))return a;
h.str(a)&&(a=e(a)||a);return a instanceof NodeList||a instanceof HTMLCollection?[].slice.call(a):[a]}function u(a,c){return a.some(function(a){return a===c})}function C(a){var c={},d;for(d in a)c[d]=a[d];return c}function D(a,c){var d=C(a),b;for(b in a)d[b]=c.hasOwnProperty(b)?c[b]:a[b];return d}function z(a,c){var d=C(a),b;for(b in c)d[b]=h.und(a[b])?c[b]:a[b];return d}function T(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,d,k){return c+c+d+d+k+k});var c=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
a=parseInt(c[1],16);var d=parseInt(c[2],16),c=parseInt(c[3],16);return"rgba("+a+","+d+","+c+",1)"}function U(a){function c(a,c,b){0>b&&(b+=1);1<b&&--b;return b<1/6?a+6*(c-a)*b:.5>b?c:b<2/3?a+(c-a)*(2/3-b)*6:a}var d=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(a);a=parseInt(d[1])/360;var b=parseInt(d[2])/100,f=parseInt(d[3])/100,d=d[4]||1;if(0==b)f=b=a=f;else{var n=.5>f?f*(1+b):f+b-f*b,k=2*f-n,f=c(k,n,a+1/3),b=c(k,n,a);a=c(k,n,a-1/3)}return"rgba("+
255*f+","+255*b+","+255*a+","+d+")"}function y(a){if(a=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(a))return a[2]}function V(a){if(-1<a.indexOf("translate")||"perspective"===a)return"px";if(-1<a.indexOf("rotate")||-1<a.indexOf("skew"))return"deg"}function I(a,c){return h.fnc(a)?a(c.target,c.id,c.total):a}function E(a,c){if(c in a.style)return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function J(a,c){if(h.dom(a)&&
u(W,c))return"transform";if(h.dom(a)&&(a.getAttribute(c)||h.svg(a)&&a[c]))return"attribute";if(h.dom(a)&&"transform"!==c&&E(a,c))return"css";if(null!=a[c])return"object"}function X(a,c){var d=V(c),d=-1<c.indexOf("scale")?1:0+d;a=a.style.transform;if(!a)return d;for(var b=[],f=[],n=[],k=/(\w+)\((.+?)\)/g;b=k.exec(a);)f.push(b[1]),n.push(b[2]);a=r(n,function(a,b){return f[b]===c});return a.length?a[0]:d}function K(a,c){switch(J(a,c)){case "transform":return X(a,c);case "css":return E(a,c);case "attribute":return a.getAttribute(c)}return a[c]||
0}function L(a,c){var d=/^(\*=|\+=|-=)/.exec(a);if(!d)return a;var b=y(a)||0;c=parseFloat(c);a=parseFloat(a.replace(d[0],""));switch(d[0][0]){case "+":return c+a+b;case "-":return c-a+b;case "*":return c*a+b}}function F(a,c){return Math.sqrt(Math.pow(c.x-a.x,2)+Math.pow(c.y-a.y,2))}function M(a){a=a.points;for(var c=0,d,b=0;b<a.numberOfItems;b++){var f=a.getItem(b);0<b&&(c+=F(d,f));d=f}return c}function N(a){if(a.getTotalLength)return a.getTotalLength();switch(a.tagName.toLowerCase()){case "circle":return 2*
Math.PI*a.getAttribute("r");case "rect":return 2*a.getAttribute("width")+2*a.getAttribute("height");case "line":return F({x:a.getAttribute("x1"),y:a.getAttribute("y1")},{x:a.getAttribute("x2"),y:a.getAttribute("y2")});case "polyline":return M(a);case "polygon":var c=a.points;return M(a)+F(c.getItem(c.numberOfItems-1),c.getItem(0))}}function Y(a,c){function d(b){b=void 0===b?0:b;return a.el.getPointAtLength(1<=c+b?c+b:0)}var b=d(),f=d(-1),n=d(1);switch(a.property){case "x":return b.x;case "y":return b.y;
case "angle":return 180*Math.atan2(n.y-f.y,n.x-f.x)/Math.PI}}function O(a,c){var d=/-?\d*\.?\d+/g,b;b=h.pth(a)?a.totalLength:a;if(h.col(b))if(h.rgb(b)){var f=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(b);b=f?"rgba("+f[1]+",1)":b}else b=h.hex(b)?T(b):h.hsl(b)?U(b):void 0;else f=(f=y(b))?b.substr(0,b.length-f.length):b,b=c&&!/\s/g.test(b)?f+c:f;b+="";return{original:b,numbers:b.match(d)?b.match(d).map(Number):[0],strings:h.str(a)||c?b.split(d):[]}}function P(a){a=a?p(h.arr(a)?a.map(m):m(a)):[];return r(a,
function(a,d,b){return b.indexOf(a)===d})}function Z(a){var c=P(a);return c.map(function(a,b){return{target:a,id:b,total:c.length}})}function aa(a,c){var d=C(c);if(h.arr(a)){var b=a.length;2!==b||h.obj(a[0])?h.fnc(c.duration)||(d.duration=c.duration/b):a={value:a}}return m(a).map(function(a,b){b=b?0:c.delay;a=h.obj(a)&&!h.pth(a)?a:{value:a};h.und(a.delay)&&(a.delay=b);return a}).map(function(a){return z(a,d)})}function ba(a,c){var d={},b;for(b in a){var f=I(a[b],c);h.arr(f)&&(f=f.map(function(a){return I(a,
c)}),1===f.length&&(f=f[0]));d[b]=f}d.duration=parseFloat(d.duration);d.delay=parseFloat(d.delay);return d}function ca(a){return h.arr(a)?A.apply(this,a):Q[a]}function da(a,c){var d;return a.tweens.map(function(b){b=ba(b,c);var f=b.value,e=K(c.target,a.name),k=d?d.to.original:e,k=h.arr(f)?f[0]:k,w=L(h.arr(f)?f[1]:f,k),e=y(w)||y(k)||y(e);b.from=O(k,e);b.to=O(w,e);b.start=d?d.end:a.offset;b.end=b.start+b.delay+b.duration;b.easing=ca(b.easing);b.elasticity=(1E3-Math.min(Math.max(b.elasticity,1),999))/
1E3;b.isPath=h.pth(f);b.isColor=h.col(b.from.original);b.isColor&&(b.round=1);return d=b})}function ea(a,c){return r(p(a.map(function(a){return c.map(function(b){var c=J(a.target,b.name);if(c){var d=da(b,a);b={type:c,property:b.name,animatable:a,tweens:d,duration:d[d.length-1].end,delay:d[0].delay}}else b=void 0;return b})})),function(a){return!h.und(a)})}function R(a,c,d,b){var f="delay"===a;return c.length?(f?Math.min:Math.max).apply(Math,c.map(function(b){return b[a]})):f?b.delay:d.offset+b.delay+
b.duration}function fa(a){var c=D(ga,a),d=D(S,a),b=Z(a.targets),f=[],e=z(c,d),k;for(k in a)e.hasOwnProperty(k)||"targets"===k||f.push({name:k,offset:e.offset,tweens:aa(a[k],d)});a=ea(b,f);return z(c,{children:[],animatables:b,animations:a,duration:R("duration",a,c,d),delay:R("delay",a,c,d)})}function q(a){function c(){return window.Promise&&new Promise(function(a){return p=a})}function d(a){return g.reversed?g.duration-a:a}function b(a){for(var b=0,c={},d=g.animations,f=d.length;b<f;){var e=d[b],
k=e.animatable,h=e.tweens,n=h.length-1,l=h[n];n&&(l=r(h,function(b){return a<b.end})[0]||l);for(var h=Math.min(Math.max(a-l.start-l.delay,0),l.duration)/l.duration,w=isNaN(h)?1:l.easing(h,l.elasticity),h=l.to.strings,p=l.round,n=[],m=void 0,m=l.to.numbers.length,t=0;t<m;t++){var x=void 0,x=l.to.numbers[t],q=l.from.numbers[t],x=l.isPath?Y(l.value,w*x):q+w*(x-q);p&&(l.isColor&&2<t||(x=Math.round(x*p)/p));n.push(x)}if(l=h.length)for(m=h[0],w=0;w<l;w++)p=h[w+1],t=n[w],isNaN(t)||(m=p?m+(t+p):m+(t+" "));
else m=n[0];ha[e.type](k.target,e.property,m,c,k.id);e.currentValue=m;b++}if(b=Object.keys(c).length)for(d=0;d<b;d++)H||(H=E(document.body,"transform")?"transform":"-webkit-transform"),g.animatables[d].target.style[H]=c[d].join(" ");g.currentTime=a;g.progress=a/g.duration*100}function f(a){if(g[a])g[a](g)}function e(){g.remaining&&!0!==g.remaining&&g.remaining--}function k(a){var k=g.duration,n=g.offset,w=n+g.delay,r=g.currentTime,x=g.reversed,q=d(a);if(g.children.length){var u=g.children,v=u.length;
if(q>=g.currentTime)for(var G=0;G<v;G++)u[G].seek(q);else for(;v--;)u[v].seek(q)}if(q>=w||!k)g.began||(g.began=!0,f("begin")),f("run");if(q>n&&q<k)b(q);else if(q<=n&&0!==r&&(b(0),x&&e()),q>=k&&r!==k||!k)b(k),x||e();f("update");a>=k&&(g.remaining?(t=h,"alternate"===g.direction&&(g.reversed=!g.reversed)):(g.pause(),g.completed||(g.completed=!0,f("complete"),"Promise"in window&&(p(),m=c()))),l=0)}a=void 0===a?{}:a;var h,t,l=0,p=null,m=c(),g=fa(a);g.reset=function(){var a=g.direction,c=g.loop;g.currentTime=
0;g.progress=0;g.paused=!0;g.began=!1;g.completed=!1;g.reversed="reverse"===a;g.remaining="alternate"===a&&1===c?2:c;b(0);for(a=g.children.length;a--;)g.children[a].reset()};g.tick=function(a){h=a;t||(t=h);k((l+h-t)*q.speed)};g.seek=function(a){k(d(a))};g.pause=function(){var a=v.indexOf(g);-1<a&&v.splice(a,1);g.paused=!0};g.play=function(){g.paused&&(g.paused=!1,t=0,l=d(g.currentTime),v.push(g),B||ia())};g.reverse=function(){g.reversed=!g.reversed;t=0;l=d(g.currentTime)};g.restart=function(){g.pause();
g.reset();g.play()};g.finished=m;g.reset();g.autoplay&&g.play();return g}var ga={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},S={duration:1E3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},W="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective".split(" "),H,h={arr:function(a){return Array.isArray(a)},obj:function(a){return-1<Object.prototype.toString.call(a).indexOf("Object")},
pth:function(a){return h.obj(a)&&a.hasOwnProperty("totalLength")},svg:function(a){return a instanceof SVGElement},dom:function(a){return a.nodeType||h.svg(a)},str:function(a){return"string"===typeof a},fnc:function(a){return"function"===typeof a},und:function(a){return"undefined"===typeof a},hex:function(a){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)},rgb:function(a){return/^rgb/.test(a)},hsl:function(a){return/^hsl/.test(a)},col:function(a){return h.hex(a)||h.rgb(a)||h.hsl(a)}},A=function(){function a(a,
d,b){return(((1-3*b+3*d)*a+(3*b-6*d))*a+3*d)*a}return function(c,d,b,f){if(0<=c&&1>=c&&0<=b&&1>=b){var e=new Float32Array(11);if(c!==d||b!==f)for(var k=0;11>k;++k)e[k]=a(.1*k,c,b);return function(k){if(c===d&&b===f)return k;if(0===k)return 0;if(1===k)return 1;for(var h=0,l=1;10!==l&&e[l]<=k;++l)h+=.1;--l;var l=h+(k-e[l])/(e[l+1]-e[l])*.1,n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(.001<=n){for(h=0;4>h;++h){n=3*(1-3*b+3*c)*l*l+2*(3*b-6*c)*l+3*c;if(0===n)break;var m=a(l,c,b)-k,l=l-m/n}k=l}else if(0===
n)k=l;else{var l=h,h=h+.1,g=0;do m=l+(h-l)/2,n=a(m,c,b)-k,0<n?h=m:l=m;while(1e-7<Math.abs(n)&&10>++g);k=m}return a(k,d,f)}}}}(),Q=function(){function a(a,b){return 0===a||1===a?a:-Math.pow(2,10*(a-1))*Math.sin(2*(a-1-b/(2*Math.PI)*Math.asin(1))*Math.PI/b)}var c="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),d={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],a],Out:[[.25,
.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(b,c){return 1-a(1-b,c)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(b,c){return.5>b?a(2*b,c)/2:1-a(-2*b+2,c)/2}]},b={linear:A(.25,.25,.75,.75)},f={},e;for(e in d)f.type=e,d[f.type].forEach(function(a){return function(d,f){b["ease"+a.type+c[f]]=h.fnc(d)?
d:A.apply($jscomp$this,d)}}(f)),f={type:f.type};return b}(),ha={css:function(a,c,d){return a.style[c]=d},attribute:function(a,c,d){return a.setAttribute(c,d)},object:function(a,c,d){return a[c]=d},transform:function(a,c,d,b,f){b[f]||(b[f]=[]);b[f].push(c+"("+d+")")}},v=[],B=0,ia=function(){function a(){B=requestAnimationFrame(c)}function c(c){var b=v.length;if(b){for(var d=0;d<b;)v[d]&&v[d].tick(c),d++;a()}else cancelAnimationFrame(B),B=0}return a}();q.version="2.2.0";q.speed=1;q.running=v;q.remove=
function(a){a=P(a);for(var c=v.length;c--;)for(var d=v[c],b=d.animations,f=b.length;f--;)u(a,b[f].animatable.target)&&(b.splice(f,1),b.length||d.pause())};q.getValue=K;q.path=function(a,c){var d=h.str(a)?e(a)[0]:a,b=c||100;return function(a){return{el:d,property:a,totalLength:N(d)*(b/100)}}};q.setDashoffset=function(a){var c=N(a);a.setAttribute("stroke-dasharray",c);return c};q.bezier=A;q.easings=Q;q.timeline=function(a){var c=q(a);c.pause();c.duration=0;c.add=function(d){c.children.forEach(function(a){a.began=
!0;a.completed=!0});m(d).forEach(function(b){var d=z(b,D(S,a||{}));d.targets=d.targets||a.targets;b=c.duration;var e=d.offset;d.autoplay=!1;d.direction=c.direction;d.offset=h.und(e)?b:L(e,b);c.began=!0;c.completed=!0;c.seek(d.offset);d=q(d);d.began=!0;d.completed=!0;d.duration>b&&(c.duration=d.duration);c.children.push(d)});c.seek(0);c.reset();c.autoplay&&c.restart();return c};return c};q.random=function(a,c){return Math.floor(Math.random()*(c-a+1))+a};return q});
},{}],"../js/site/main.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _promisePolyfill = _interopRequireDefault(require("promise-polyfill"));

var _fullpageConfig = _interopRequireDefault(require("./fullpage-config.js"));

var _animejs = _interopRequireDefault(require("animejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Site =
/*#__PURE__*/
function () {
  function Site(props) {
    _classCallCheck(this, Site);

    this.config = _fullpageConfig.default;
    this.config.anchors = ['intro', 'ceo', 'jordanlens', 'jordanlens-2', 'hptn', 'ivlp', 'ivlp-2', 'sinoimplant', 'succeed2020', 'succeed2020-2', 'challengetb', 'fanta', 'civilsociety', 'uswdp', 'uswdp-2', 'technology', 'learn-more'];
    this.config.onLeave = this.handleOnLeave.bind(this);
    this.config.afterLoad = this.handleAfterLoad.bind(this);
    this.config.afterRender = this.handleAfterRender.bind(this);
    this.config.animateAnchor = false;
    this.gDur = 800;
    this.gEase = 'easeOutCubic';
    this.$hideEls = $('.stagger-in');
    this.pulseAnim = null;
  }

  _createClass(Site, [{
    key: "handleOnLeave",
    value: function handleOnLeave(index, nextIndex, direction) {
      // console.log('handleOnLeave', index, nextIndex, direction)
      if ($('body').hasClass('drawer-open')) {
        this.toggleDrawer(index, 1, true);
      }

      if ($('body').hasClass('credit-open')) {
        this.toggleCredit(true);
      }

      this.pulseAnim && this.pulseAnim.pause();
      this.runParallax(nextIndex - 2);
      this.countUp(nextIndex - 2);
    }
  }, {
    key: "handleAfterLoad",
    value: function handleAfterLoad(anchorLink, index) {
      var _this = this;

      var offsetIndex = index - 2;
      this.hideEls();
      this.staggerInEls(index - 1);
      this.pulseAnim && this.pulseAnim.pause();
      this.pulseAnim = (0, _animejs.default)({
        targets: "[data-section=\"".concat(offsetIndex, "\"] .drawer-button_container img"),
        scale: [0.85, 1],
        loop: true,
        direction: 'alternate',
        duration: 1000,
        easing: 'easeInOutSine'
      });
      $("[data-section=\"".concat(offsetIndex, "\"] .drawer-button_container")).one('click', function () {
        return _this.pulseAnim && _this.pulseAnim.pause();
      });
      this.handleTocProgress(offsetIndex);
    }
  }, {
    key: "handleTocProgress",
    value: function handleTocProgress(index) {
      var tocIndex = $("[data-section='".concat(index, "']")).data('toc');

      if (!tocIndex) {
        $('.toc-toggle-inner').html('Start');
      } else {
        $('.toc-toggle-inner').html(tocIndex + ' / 10');
      } // console.log(index, tocIndex)

    }
  }, {
    key: "pauseDrawerButton",
    value: function pauseDrawerButton() {
      this.pulseAnim && this.pulseAnim.pause();
    }
  }, {
    key: "staggerInEls",
    value: function staggerInEls(index) {
      var dur = this.gDur;
      var ease = this.gEase;
      (0, _animejs.default)({
        targets: "[data-section=\"".concat(index - 1, "\"] .stagger-in"),
        opacity: [0, 1],
        duration: dur,
        translateY: [50, 0],
        easing: ease,
        delay: function delay(el, i, l) {
          return i * dur / 3;
        }
      });
    }
  }, {
    key: "countUp",
    value: function countUp(index) {
      var els = $("[data-section=\"".concat(index, "\"] [data-countup]"));
      if (!els) return;
      els.each(function () {
        var _this2 = this;

        var state = {
          number: 0
        };
        var start = $(this).data('countstart') || 0;
        var end = $(this).data('countup');
        (0, _animejs.default)({
          targets: state,
          number: [start, end],
          duration: 1000,
          delay: 1500,
          easing: 'easeInSine',
          update: function update() {
            return $(_this2).html(Math.ceil(state.number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          }
        });
      });
    }
  }, {
    key: "handleAfterRender",
    value: function handleAfterRender() {
      // console.log('handleAfterRender')
      this.hideEls();
      this.createHero();

      if (screen.height > $(window).height()) {
        $('.section').height($(window).height() + 'px');
      }
    }
  }, {
    key: "hideEls",
    value: function hideEls() {
      this.$hideEls.css('opacity', 0);
    }
  }, {
    key: "handleCreditToggle",
    value: function handleCreditToggle() {
      this.toggleCredit();
    }
  }, {
    key: "handleTocToggle",
    value: function handleTocToggle(e) {
      this.toggleTOC();
    }
  }, {
    key: "handleTocClick",
    value: function handleTocClick(e) {
      e.preventDefault();
      var dest = $(e.target).data('moveto');
      if (!dest) dest = $(e.target).closest('[data-moveto]').data('moveto');
      this.moveToSlide(dest);
    }
  }, {
    key: "handleCeoLink",
    value: function handleCeoLink() {
      // if ($('body').hasClass('drawer-open')) {
      // 	this.toggleDrawer()
      // }
      // if ($('body').hasClass('toc-open')) {
      // 	this.toggleTOC(1, true)
      // }
      $.fn.fullpage.silentMoveTo(2); // this.toggleDrawer(1)
      // this.pauseDrawerButton()
    }
  }, {
    key: "moveToSlide",
    value: function moveToSlide(dest) {
      this.toggleTOC();
      $.fn.fullpage.silentMoveTo(dest, 0);
    }
  }, {
    key: "toggleTOC",
    value: function toggleTOC() {
      var dur = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;
      var forceClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var $drawer = $("#rightSideBar");
      var $button = $(".toc-toggle");
      var drawerOpen = forceClose || $('body').hasClass('toc-open');
      drawerOpen ? $('body').removeClass('toc-open') : $('body').addClass('toc-open');
      (0, _animejs.default)({
        targets: $drawer[0],
        duration: dur,
        easing: function easing() {
          return drawerOpen ? 'easeInQuad' : 'easeOutQuad';
        },
        translateX: function translateX() {
          return drawerOpen ? [0, '100%'] : ['100%', 0];
        }
      }); // this.toggleDrawer(null, 300, true)

      $.fn.fullpage.setAllowScrolling(drawerOpen);
      $.fn.fullpage.setKeyboardScrolling(drawerOpen);
    }
  }, {
    key: "handleDrawerToggle",
    value: function handleDrawerToggle(e) {
      var toggleID = $(e.target).parent('[data-toggle]').data('toggle');
      this.toggleDrawer(toggleID);
    }
  }, {
    key: "toggleDrawer",
    value: function toggleDrawer(toggleID) {
      var dur = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var forceClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var $drawer = toggleID !== null ? $(".leftDrawer[data-toggle=\"".concat(toggleID, "\"]")) : $(".leftDrawer");
      var $button = $(".drawer-button_container");
      var drawerOpen = forceClose || $('body').hasClass('drawer-open');
      (0, _animejs.default)({
        targets: $drawer[0],
        duration: dur,
        easing: function easing() {
          return drawerOpen ? 'easeInQuad' : 'easeOutQuad';
        },
        translateX: function translateX() {
          return drawerOpen ? [0, '-100%'] : ['-100%', 0];
        },
        begin: function begin() {
          return $('body').toggleClass('drawer-open');
        }
      });
      $.fn.fullpage.setAllowScrolling(drawerOpen);
      $.fn.fullpage.setKeyboardScrolling(drawerOpen);
    }
  }, {
    key: "closeDrawer",
    value: function closeDrawer(id) {
      if (!$('body').hasClass('drawer-open')) return;
      this.toggleDrawer(id, 300);
    }
  }, {
    key: "toggleCredit",
    value: function toggleCredit() {
      var forceClose = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var creditOpen = forceClose || $('body').hasClass('credit-open');
      (0, _animejs.default)({
        targets: '.photo-credits',
        duration: 300,
        easing: 'easeInOutQuad',
        translateY: function translateY() {
          return creditOpen ? [0, '100%'] : ['100%', 0];
        },
        begin: function begin() {
          return $('body').toggleClass('credit-open');
        }
      });
    }
  }, {
    key: "runParallax",
    value: function runParallax(i) {
      var $section = $("[data-section=\"".concat(i, "\"]"));
      var animName = $section.data('parallax');
      var tl = new _animejs.default.timeline({
        duration: 4000,
        easing: 'easeOutQuart',
        delay: 500,
        autoplay: false
      });

      if (animName == 'zoom') {
        tl.add({
          targets: "[data-section=\"".concat(i, "\"] .bg-screen"),
          opacity: [1, 0.4],
          duration: 1000,
          delay: 1000
        }).add({
          targets: "[data-section=\"".concat(i, "\"] .fore"),
          translateX: ['10px', '-10px'],
          scale: [1, 1.05],
          offset: '-=2000'
        }).add({
          targets: "[data-section=\"".concat(i, "\"] .back"),
          scale: [1.05, 1],
          offset: '-=4000'
        });
      }

      if (animName == 'zoom2') {
        tl.add({
          targets: "[data-section=\"".concat(i, "\"] .bg-screen"),
          opacity: [1, 0.4],
          duration: 1000,
          delay: 1000
        }).add({
          targets: "[data-section=\"".concat(i, "\"] .back"),
          scale: [1.05, 1],
          offset: '-=2000'
        });
      }

      if (animName == 'zoom3') {
        tl.add({
          targets: "[data-section=\"".concat(i, "\"] .bg-screen"),
          opacity: [1, 0.4],
          duration: 1000,
          delay: 1000
        }).add({
          targets: "[data-section=\"".concat(i, "\"] .back"),
          scale: [1, 1.1],
          offset: '-=2000'
        });
      }

      if (animName == 'zoom4') {
        tl.add({
          targets: "[data-section=\"".concat(i, "\"] .bg-screen"),
          opacity: [1, 0.4],
          duration: 1000,
          delay: 1000
        }).add({
          targets: "[data-section=\"".concat(i, "\"] .fore"),
          scale: [1, 1.1],
          translateX: ['10px', '-10px'],
          offset: '-=2000'
        });
      }

      var promiseArr = [];
      $section.find('img[data-src]').each(function (i) {
        var $img = $(this);
        var loaded = new _promisePolyfill.default(function (resolve, reject) {
          return $img.on('load', resolve);
        });
        promiseArr.push(loaded);
      });

      _promisePolyfill.default.all(promiseArr).then(function () {
        tl.play();
      });
    }
  }, {
    key: "startFullpage",
    value: function startFullpage() {
      $('#fullpage').fullpage(this.config);

      if (!location.hash) {
        $.fn.fullpage.setAllowScrolling(false);
        $.fn.fullpage.setKeyboardScrolling(false);
      }
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this3 = this;

      $('.move-next').on('click', function (e) {
        return $.fn.fullpage.moveSectionDown();
      });
      $('.drawer-button_container').on('click', function (e) {
        return _this3.handleDrawerToggle(e);
      });
      $('.toc-toggle').on('click', function (e) {
        return _this3.handleTocToggle(e);
      });
      $('.close-rightbar').on('click', function (e) {
        return _this3.toggleTOC();
      });
      $('.toc-item').on('click', function (e) {
        return _this3.handleTocClick(e);
      });
      $('[data-ceoLink]').on('click', function (e) {
        return _this3.handleCeoLink();
      });
      $('[data-closedrawer]').on('click', function (e) {
        var id = $(e.target).closest('[data-section]').data('section');
        console.log(id);

        _this3.closeDrawer(id);
      });
      $('.photo-credit-trigger').on('click', function (e) {
        return _this3.handleCreditToggle(e);
      });
      $('.photo-credits').on('click', function (e) {
        return _this3.toggleCredit(true);
      });
      $('[data-movedown]').on('click', function () {
        return $.fn.fullpage.moveSectionDown();
      });
      $('[data-moveup]').on('click', function () {
        return $.fn.fullpage.moveSectionUp();
      });
      $('[data-fb-share]').on('click', function (e) {
        e.preventDefault();
        FB.ui({
          method: 'share',
          href: 'https://developers.facebook.com/docs/'
        }, function (response) {});
      });
      $('[data-li-share], [data-tw-share]').click(function () {
        var shareurl = $(this).attr('href');
        var windowName = 'Share';
        window.open(shareurl, windowName, 'height=400,width=400');
        return false;
      });
      $('[data-copyurl]').attr('data-clipboard-text', location.origin);
      new ClipboardJS('[data-copyurl]');
      $('[data-copyurl]').on('click', function () {
        alert(location.origin + ' has been copied to your clipboard!');
      });
      $('.mobile-menu-trigger').on('click', function () {
        $('body').toggleClass('mobile-open');
      });
    }
  }, {
    key: "createHero",
    value: function createHero() {
      var words = ['promote peace?', 'end HIV?', 'increase economic well-being?', 'eliminate TB?', 'empower women and girls?', 'give citizens voice?', 'drive student success?', 'improve nutrition?', 'use data for greater impact?', 'end HIV?', 'increase economic well-being?', 'eliminate TB?', 'empower women and girls?', 'promote civic engagement?', 'advance peace and stability?', 'expand access to healthcare?', 'drive student success?', 'improve nutrition?', 'use data for greater impact?', 'inspire young leaders?', 'harness digital technology?', 'prepare students for 21st century jobs?', 'promote healthy families?', 'generate groundbreaking research?', 'combat violent extremism?', 'support communities in crisis?'];

      var createWords = function createWords() {
        var shuffledWords = shuffle(words);
        shuffledWords.push('improve lives?');

        for (var i = 0; i < words.length; i++) {
          var first = '';
          $('#words').append("<span ".concat(first, ">").concat(words[i], "</span>"));
        }

        animate();
      };

      var animate = function animate() {
        var tl = _animejs.default.timeline({
          easing: 'easeInSine'
        });

        $('.skip-intro').click(function () {
          return tl.seek(tl.duration);
        });
        var wordState = {
          indexTween: 0,
          activeIndex: 0,
          $words: $('#words > span')
        };
        tl.add({
          targets: '.intro-header',
          opacity: [0, 1],
          translateY: ['20px', '0'],
          duration: 500,
          easing: 'easeInOutSine',
          delay: 1000
        }).add({
          targets: wordState,
          indexTween: 4,
          duration: 4000,
          easing: 'linear',
          offset: '-=1000',
          update: cycleWord
        }).add({
          targets: wordState,
          indexTween: wordState.$words.length,
          duration: wordState.$words.length * 200,
          easing: 'easeInQuad',
          update: cycleWord
        }).add({
          targets: '.intro-header #words',
          scale: {
            value: [1, 1.25],
            duration: 3000,
            easing: 'linear',
            delay: 500
          },
          color: {
            value: '#f27321',
            duration: 1000,
            easing: 'easeInSine',
            delay: 500 // begin: () => $('.intro-header').css('position', 'absolute')

          }
        }) // start catalyst
        .add({
          targets: '#orange_dot',
          opacity: [0, 1],
          r: [9.51, 800],
          duration: 1000,
          delay: 800,
          offset: '-=300',
          easing: 'easeOutCirc',
          begin: function begin() {
            $('.catalyst').show().css('opacity', 1).css('background', '#fff');
            $('.g-ants').hide();
          },
          complete: function complete() {
            $('#orange_dot').hide();
            $('.catalyst').css('background', '#f27321').addClass('run-ants');
          }
        }).add({
          targets: '.catalyst',
          duration: 1,
          begin: function begin() {
            return $('.g-ants').show();
          },
          offset: '+=100'
        }).add({
          targets: '#cat_subtitle',
          duration: 1000,
          opacity: [0, 1],
          easing: 'easeOutCubic',
          offset: '+=1000'
        }).add({
          targets: '#intro-chevron',
          duration: 500,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: 'easeOutCubic',
          offset: '+=1000',
          complete: handleIntroComplete
        });

        if (location.hash) {
          tl.seek(tl.duration);
          handleIntroComplete();
        }

        function cycleWord(anime) {
          if (Math.floor(wordState.indexTween) !== wordState.activeIndex) {
            wordState.$words.hide();
            wordState.activeIndex = Math.floor(wordState.indexTween);

            if ($(wordState.$words[wordState.activeIndex - 1]).show) {
              $(wordState.$words[wordState.activeIndex - 1]).show();
            }
          }
        }
      };

      function shuffle(a) {
        var j, x, i;

        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }

        return a;
      }

      function handleIntroComplete() {
        $('#orange_dot').hide();
        $('.catalyst').css('background', '#f27321').addClass('run-ants');
        $('.g-ants').show();
        (0, _animejs.default)({
          targets: '#intro-chevron',
          loop: true,
          direction: 'alternate',
          translateY: ['-10px', '10px'],
          duration: 1000,
          easing: 'easeInOutQuart'
        });
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
      }

      createWords();
    }
  }, {
    key: "preload",
    value: function preload() {
      if (!Modernizr) return console.log('Enable Modernizer!');

      if (!Modernizr.objectfit) {
        $('.object-fit').each(function () {
          var $container = $(this);
          var imgUrls = [];
          $container.find('img').each(function () {
            var imgUrl = $(this).attr('src') || $(this).attr('data-src');
            imgUrls.push("url('".concat(imgUrl, "')"));
          });
          imgUrls = imgUrls.reverse().join(',');

          if (imgUrls) {
            $container.css('background-image', imgUrls);
            $container.addClass('compat-object-fit');
          }
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.preload();
      this.addEventListeners();
      this.startFullpage();
    }
  }]);

  return Site;
}();

exports.default = Site;
},{"promise-polyfill":"../node_modules/promise-polyfill/lib/index.js","./fullpage-config.js":"../js/site/fullpage-config.js","animejs":"../node_modules/animejs/anime.min.js"}],"../js/index.js":[function(require,module,exports) {
"use strict";

require("../scss/index.scss");

var _main = _interopRequireDefault(require("./site/main.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// CSS
// Site Scripts
var Site = new _main.default();
$(document).ready(function () {
  Site.init();
});
},{"../scss/index.scss":"../scss/index.scss","./site/main.js":"../js/site/main.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61736" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/index.js"], null)
//# sourceMappingURL=/js.fcffc47e.js.map