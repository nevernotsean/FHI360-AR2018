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
})({"../js/vendor/modernizr-3.6.0.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csscolumns-customelements-flexbox-history-objectfit-picture-pointerevents-postmessage-sizes-srcset-webgl-websockets-webworkers-addtest-domprefixes-hasevent-mq-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles !*/
!function (e, t, n) {
  function r(e, t) {
    return _typeof(e) === t;
  }

  function o() {
    var e, t, n, o, i, s, a;

    for (var l in b) {
      if (b.hasOwnProperty(l)) {
        if (e = [], t = b[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) for (n = 0; n < t.options.aliases.length; n++) {
          e.push(t.options.aliases[n].toLowerCase());
        }

        for (o = r(t.fn, 'function') ? t.fn() : t.fn, i = 0; i < e.length; i++) {
          s = e[i], a = s.split('.'), 1 === a.length ? Modernizr[a[0]] = o : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = o), C.push((o ? '' : 'no-') + a.join('-'));
        }
      }
    }
  }

  function i(e) {
    var t = T.className,
        n = Modernizr._config.classPrefix || '';

    if (E && (t = t.baseVal), Modernizr._config.enableJSClass) {
      var r = new RegExp('(^|\\s)' + n + 'no-js(\\s|$)');
      t = t.replace(r, '$1' + n + 'js$2');
    }

    Modernizr._config.enableClasses && (t += ' ' + n + e.join(' ' + n), E ? T.className.baseVal = t : T.className = t);
  }

  function s(e, t) {
    if ('object' == _typeof(e)) for (var n in e) {
      O(e, n) && s(n, e[n]);
    } else {
      e = e.toLowerCase();
      var r = e.split('.'),
          o = Modernizr[r[0]];
      if (2 == r.length && (o = o[r[1]]), 'undefined' != typeof o) return Modernizr;
      t = 'function' == typeof t ? t() : t, 1 == r.length ? Modernizr[r[0]] = t : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = t), i([(t && 0 != t ? '' : 'no-') + r.join('-')]), Modernizr._trigger(e, t);
    }
    return Modernizr;
  }

  function a() {
    return 'function' != typeof t.createElement ? t.createElement(arguments[0]) : E ? t.createElementNS.call(t, 'http://www.w3.org/2000/svg', arguments[0]) : t.createElement.apply(t, arguments);
  }

  function l() {
    var e = t.body;
    return e || (e = a(E ? 'svg' : 'body'), e.fake = !0), e;
  }

  function u(e, n, r, o) {
    var i,
        s,
        u,
        f,
        d = 'modernizr',
        c = a('div'),
        p = l();
    if (parseInt(r, 10)) for (; r--;) {
      u = a('div'), u.id = o ? o[r] : d + (r + 1), c.appendChild(u);
    }
    return i = a('style'), i.type = 'text/css', i.id = 's' + d, (p.fake ? p : c).appendChild(i), p.appendChild(c), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)), c.id = d, p.fake && (p.style.background = '', p.style.overflow = 'hidden', f = T.style.overflow, T.style.overflow = 'hidden', T.appendChild(p)), s = n(c, e), p.fake ? (p.parentNode.removeChild(p), T.style.overflow = f, T.offsetHeight) : c.parentNode.removeChild(c), !!s;
  }

  function f(e, t) {
    return !!~('' + e).indexOf(t);
  }

  function d(e) {
    return e.replace(/([a-z])-([a-z])/g, function (e, t, n) {
      return t + n.toUpperCase();
    }).replace(/^-/, '');
  }

  function c(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }

  function p(e, t, n) {
    var o;

    for (var i in e) {
      if (e[i] in t) return n === !1 ? e[i] : (o = t[e[i]], r(o, 'function') ? c(o, n || t) : o);
    }

    return !1;
  }

  function m(e) {
    return e.replace(/([A-Z])/g, function (e, t) {
      return '-' + t.toLowerCase();
    }).replace(/^ms-/, '-ms-');
  }

  function v(t, n, r) {
    var o;

    if ('getComputedStyle' in e) {
      o = getComputedStyle.call(e, t, n);
      var i = e.console;
      if (null !== o) r && (o = o.getPropertyValue(r));else if (i) {
        var s = i.error ? 'error' : 'log';
        i[s].call(i, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
      }
    } else o = !n && t.currentStyle && t.currentStyle[r];

    return o;
  }

  function h(t, r) {
    var o = t.length;

    if ('CSS' in e && 'supports' in e.CSS) {
      for (; o--;) {
        if (e.CSS.supports(m(t[o]), r)) return !0;
      }

      return !1;
    }

    if ('CSSSupportsRule' in e) {
      for (var i = []; o--;) {
        i.push('(' + m(t[o]) + ':' + r + ')');
      }

      return i = i.join(' or '), u('@supports (' + i + ') { #modernizr { position: absolute; } }', function (e) {
        return 'absolute' == v(e, null, 'position');
      });
    }

    return n;
  }

  function A(e, t, o, i) {
    function s() {
      u && (delete M.style, delete M.modElem);
    }

    if (i = r(i, 'undefined') ? !1 : i, !r(o, 'undefined')) {
      var l = h(e, o);
      if (!r(l, 'undefined')) return l;
    }

    for (var u, c, p, m, v, A = ['modernizr', 'tspan', 'samp']; !M.style && A.length;) {
      u = !0, M.modElem = a(A.shift()), M.style = M.modElem.style;
    }

    for (p = e.length, c = 0; p > c; c++) {
      if (m = e[c], v = M.style[m], f(m, '-') && (m = d(m)), M.style[m] !== n) {
        if (i || r(o, 'undefined')) return s(), 'pfx' == t ? m : !0;

        try {
          M.style[m] = o;
        } catch (g) {}

        if (M.style[m] != v) return s(), 'pfx' == t ? m : !0;
      }
    }

    return s(), !1;
  }

  function g(e, t, n, o, i) {
    var s = e.charAt(0).toUpperCase() + e.slice(1),
        a = (e + ' ' + L.join(s + ' ') + s).split(' ');
    return r(t, 'string') || r(t, 'undefined') ? A(a, t, o, i) : (a = (e + ' ' + k.join(s + ' ') + s).split(' '), p(a, t, n));
  }

  function y(e, t, r) {
    return g(e, n, n, t, r);
  }

  var C = [],
      b = [],
      w = {
    _version: '3.6.0',
    _config: {
      classPrefix: '',
      enableClasses: !0,
      enableJSClass: !0,
      usePrefixes: !0
    },
    _q: [],
    on: function on(e, t) {
      var n = this;
      setTimeout(function () {
        t(n[e]);
      }, 0);
    },
    addTest: function addTest(e, t, n) {
      b.push({
        name: e,
        fn: t,
        options: n
      });
    },
    addAsyncTest: function addAsyncTest(e) {
      b.push({
        name: null,
        fn: e
      });
    }
  },
      Modernizr = function Modernizr() {};

  Modernizr.prototype = w, Modernizr = new Modernizr(), Modernizr.addTest('customelements', 'customElements' in e), Modernizr.addTest('history', function () {
    var t = navigator.userAgent;
    return -1 === t.indexOf('Android 2.') && -1 === t.indexOf('Android 4.0') || -1 === t.indexOf('Mobile Safari') || -1 !== t.indexOf('Chrome') || -1 !== t.indexOf('Windows Phone') || 'file:' === location.protocol ? e.history && 'pushState' in e.history : !1;
  }), Modernizr.addTest('postmessage', 'postMessage' in e);
  var S = !1;

  try {
    S = 'WebSocket' in e && 2 === e.WebSocket.CLOSING;
  } catch (x) {}

  Modernizr.addTest('websockets', S), Modernizr.addTest('picture', 'HTMLPictureElement' in e), Modernizr.addTest('webworkers', 'Worker' in e);

  var _ = w._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];

  w._prefixes = _;
  var T = t.documentElement,
      E = 'svg' === T.nodeName.toLowerCase(),
      P = 'Moz O ms Webkit',
      k = w._config.usePrefixes ? P.toLowerCase().split(' ') : [];
  w._domPrefixes = k;
  var O;
  !function () {
    var e = {}.hasOwnProperty;
    O = r(e, 'undefined') || r(e.call, 'undefined') ? function (e, t) {
      return t in e && r(e.constructor.prototype[t], 'undefined');
    } : function (t, n) {
      return e.call(t, n);
    };
  }(), w._l = {}, w.on = function (e, t) {
    this._l[e] || (this._l[e] = []), this._l[e].push(t), Modernizr.hasOwnProperty(e) && setTimeout(function () {
      Modernizr._trigger(e, Modernizr[e]);
    }, 0);
  }, w._trigger = function (e, t) {
    if (this._l[e]) {
      var n = this._l[e];
      setTimeout(function () {
        var e, r;

        for (e = 0; e < n.length; e++) {
          (r = n[e])(t);
        }
      }, 0), delete this._l[e];
    }
  }, Modernizr._q.push(function () {
    w.addTest = s;
  });

  var z = function () {
    function e(e, t) {
      var o;
      return e ? (t && 'string' != typeof t || (t = a(t || 'div')), e = 'on' + e, o = e in t, !o && r && (t.setAttribute || (t = a('div')), t.setAttribute(e, ''), o = 'function' == typeof t[e], t[e] !== n && (t[e] = n), t.removeAttribute(e)), o) : !1;
    }

    var r = !('onblur' in t.documentElement);
    return e;
  }();

  w.hasEvent = z, Modernizr.addTest('pointerevents', function () {
    var e = !1,
        t = k.length;

    for (e = Modernizr.hasEvent('pointerdown'); t-- && !e;) {
      z(k[t] + 'pointerdown') && (e = !0);
    }

    return e;
  });

  var B = function B(e, t) {
    var n = !1,
        r = a('div'),
        o = r.style;

    if (e in o) {
      var i = k.length;

      for (o[e] = t, n = o[e]; i-- && !n;) {
        o[e] = '-' + k[i] + '-' + t, n = o[e];
      }
    }

    return '' === n && (n = !1), n;
  };

  w.prefixedCSSValue = B, Modernizr.addTest('webgl', function () {
    var t = a('canvas'),
        n = 'probablySupportsContext' in t ? 'probablySupportsContext' : 'supportsContext';
    return n in t ? t[n]('webgl') || t[n]('experimental-webgl') : 'WebGLRenderingContext' in e;
  }), Modernizr.addAsyncTest(function () {
    var e,
        t,
        n,
        r = a('img'),
        o = 'sizes' in r;
    !o && 'srcset' in r ? (t = 'data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==', e = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', n = function n() {
      s('sizes', 2 == r.width);
    }, r.onload = n, r.onerror = n, r.setAttribute('sizes', '9px'), r.srcset = e + ' 1w,' + t + ' 8w', r.src = e) : s('sizes', o);
  }), Modernizr.addTest('srcset', 'srcset' in a('img'));
  var L = w._config.usePrefixes ? P.split(' ') : [];
  w._cssomPrefixes = L;

  var R = function () {
    var t = e.matchMedia || e.msMatchMedia;
    return t ? function (e) {
      var n = t(e);
      return n && n.matches || !1;
    } : function (t) {
      var n = !1;
      return u('@media ' + t + ' { #modernizr { position: absolute; } }', function (t) {
        n = 'absolute' == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position;
      }), n;
    };
  }();

  w.mq = R;
  var j = (w.testStyles = u, function (t) {
    var r,
        o = _.length,
        i = e.CSSRule;
    if ('undefined' == typeof i) return n;
    if (!t) return !1;
    if (t = t.replace(/^@/, ''), r = t.replace(/-/g, '_').toUpperCase() + '_RULE', r in i) return '@' + t;

    for (var s = 0; o > s; s++) {
      var a = _[s],
          l = a.toUpperCase() + '_' + r;
      if (l in i) return '@-' + a.toLowerCase() + '-' + t;
    }

    return !1;
  });
  w.atRule = j;
  var N = {
    elem: a('modernizr')
  };

  Modernizr._q.push(function () {
    delete N.elem;
  });

  var M = {
    style: N.elem.style
  };

  Modernizr._q.unshift(function () {
    delete M.style;
  });

  w.testProp = function (e, t, r) {
    return A([e], n, t, r);
  };

  w.testAllProps = g, w.testAllProps = y, Modernizr.addTest('cssanimations', y('animationName', 'a', !0)), function () {
    Modernizr.addTest('csscolumns', function () {
      var e = !1,
          t = y('columnCount');

      try {
        ;
        e = !!t, e && (e = new Boolean(e));
      } catch (n) {}

      return e;
    });

    for (var e, t, n = ['Width', 'Span', 'Fill', 'Gap', 'Rule', 'RuleColor', 'RuleStyle', 'RuleWidth', 'BreakBefore', 'BreakAfter', 'BreakInside'], r = 0; r < n.length; r++) {
      e = n[r].toLowerCase(), t = y('column' + n[r]), ('breakbefore' === e || 'breakafter' === e || 'breakinside' == e) && (t = t || y(n[r])), Modernizr.addTest('csscolumns.' + e, t);
    }
  }(), Modernizr.addTest('flexbox', y('flexBasis', '1px', !0));

  var W = w.prefixed = function (e, t, n) {
    return 0 === e.indexOf('@') ? j(e) : (-1 != e.indexOf('-') && (e = d(e)), t ? g(e, t, n) : g(e, 'pfx'));
  };

  Modernizr.addTest('objectfit', !!W('objectFit'), {
    aliases: ['object-fit']
  }), o(), i(C), delete w.addTest, delete w.addAsyncTest;

  for (var q = 0; q < Modernizr._q.length; q++) {
    Modernizr._q[q]();
  }

  e.Modernizr = Modernizr;
}(window, document);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/vendor/modernizr-3.6.0.js"], null)
//# sourceMappingURL=/modernizr-3.6.0.67b00544.js.map