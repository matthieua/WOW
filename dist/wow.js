'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  // Name    : wow
  // Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
  // Version : 1.1.2
  // Repo    : https://github.com/matthieua/WOW
  // Website : http://mynameismatthieu.com/wow

  var MutationObserver,
      Util,
      WeakMap,
      getComputedStyle,
      getComputedStyleRX,
      indexOf = [].indexOf;

  Util = function () {
    function Util() {
      _classCallCheck(this, Util);
    }

    _createClass(Util, [{
      key: 'extend',
      value: function extend(custom, defaults) {
        var key, value;
        for (key in defaults) {
          value = defaults[key];
          if (custom[key] == null) {
            custom[key] = value;
          }
        }
        return custom;
      }
    }, {
      key: 'isMobile',
      value: function isMobile(agent) {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
        );
      }
    }, {
      key: 'createEvent',
      value: function createEvent(event) {
        var bubble = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var cancel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var detail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

        var customEvent;
        if (document.createEvent != null) {
          customEvent = document.createEvent('CustomEvent');
          customEvent.initCustomEvent(event, bubble, cancel, detail);
        } else if (document.createEventObject != null) {
          customEvent = document.createEventObject();
          customEvent.eventType = event;
        } else {
          customEvent.eventName = event; // IE DOM < 9
          // W3C DOM
        }
        return customEvent;
      }
    }, {
      key: 'emitEvent',
      value: function emitEvent(elem, event) {
        if (elem.dispatchEvent != null) {
          return elem.dispatchEvent(event);
        } else if (event in (elem != null)) {
          return elem[event]();
        } else if ('on' + event in (elem != null)) {
          return elem['on' + event](); // W3C DOM
        }
      }
    }, {
      key: 'addEvent',
      value: function addEvent(elem, event, fn) {
        if (elem.addEventListener != null) {
          return elem.addEventListener(event, fn, false);
        } else if (elem.attachEvent != null) {
          return elem.attachEvent('on' + event, fn); // fallback
        } else {
          return elem[event] = fn; // IE DOM
          // W3C DOM
        }
      }
    }, {
      key: 'removeEvent',
      value: function removeEvent(elem, event, fn) {
        if (elem.removeEventListener != null) {
          return elem.removeEventListener(event, fn, false);
        } else if (elem.detachEvent != null) {
          return elem.detachEvent('on' + event, fn); // fallback
        } else {
          return delete elem[event]; // IE DOM
          // W3C DOM
        }
      }
    }, {
      key: 'innerHeight',
      value: function innerHeight() {
        if ('innerHeight' in window) {
          return window.innerHeight;
        } else {
          return document.documentElement.clientHeight;
        }
      }
    }]);

    return Util;
  }();

  // Minimalistic WeakMap shim, just in case.
  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = function () {
    function WeakMap() {
      _classCallCheck(this, WeakMap);

      this.keys = [];
      this.values = [];
    }

    _createClass(WeakMap, [{
      key: 'get',
      value: function get(key) {
        var i, item, j, len, ref;
        ref = this.keys;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          if (item === key) {
            return this.values[i];
          }
        }
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        var i, item, j, len, ref;
        ref = this.keys;
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          if (item === key) {
            this.values[i] = value;
            return;
          }
        }
        this.keys.push(key);
        return this.values.push(value);
      }
    }]);

    return WeakMap;
  }());

  // Dummy MutationObserver, to avoid raising exceptions.
  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = function () {
    var MutationObserver = function () {
      function MutationObserver() {
        _classCallCheck(this, MutationObserver);

        if (typeof console !== "undefined" && console !== null) {
          console.warn('MutationObserver is not supported by your browser.');
        }
        if (typeof console !== "undefined" && console !== null) {
          console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
        }
      }

      _createClass(MutationObserver, [{
        key: 'observe',
        value: function observe() {}
      }]);

      return MutationObserver;
    }();

    ;

    MutationObserver.notSupported = true;

    return MutationObserver;
  }.call(this));

  // getComputedStyle shim, from http://stackoverflow.com/a/21797294
  getComputedStyle = this.getComputedStyle || function (el, pseudo) {
    this.getPropertyValue = function (prop) {
      var ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function (_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((ref = el.currentStyle) != null ? ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = function () {
    var WOW = function () {
      function WOW() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, WOW);

        this.start = this.start.bind(this);
        this.resetAnimation = this.resetAnimation.bind(this);
        // fast window.scroll callback
        this.scrollHandler = this.scrollHandler.bind(this);
        this.scrollCallback = this.scrollCallback.bind(this);
        this.scrolled = true;
        this.config = this.util().extend(options, this.defaults);
        if (options.scrollContainer != null) {
          this.config.scrollContainer = document.querySelector(options.scrollContainer);
        }
        // Map of elements to animation names:
        this.animationNameCache = new WeakMap();
        this.wowEvent = this.util().createEvent(this.config.boxClass);
      }

      _createClass(WOW, [{
        key: 'init',
        value: function init() {
          var ref;
          this.element = window.document.documentElement;
          if ((ref = document.readyState) === "interactive" || ref === "complete") {
            this.start();
          } else {
            this.util().addEvent(document, 'DOMContentLoaded', this.start);
          }
          return this.finished = [];
        }
      }, {
        key: 'start',
        value: function start() {
          var _this = this;

          var box, j, len, ref;
          this.stopped = false;
          this.boxes = function () {
            var j, len, ref, results;
            ref = this.element.querySelectorAll('.' + this.config.boxClass);
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              box = ref[j];
              results.push(box);
            }
            return results;
          }.call(this);
          this.all = function () {
            var j, len, ref, results;
            ref = this.boxes;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              box = ref[j];
              results.push(box);
            }
            return results;
          }.call(this);
          if (this.boxes.length) {
            if (this.disabled()) {
              this.resetStyle();
            } else {
              ref = this.boxes;
              for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                this.applyStyle(box, true);
              }
            }
          }
          if (!this.disabled()) {
            this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
            this.util().addEvent(window, 'resize', this.scrollHandler);
            this.interval = setInterval(this.scrollCallback, 50);
          }
          if (this.config.live) {
            return new MutationObserver(function (records) {
              var k, len1, node, record, results;
              results = [];
              for (k = 0, len1 = records.length; k < len1; k++) {
                record = records[k];
                results.push(function () {
                  var l, len2, ref1, results1;
                  ref1 = record.addedNodes || [];
                  results1 = [];
                  for (l = 0, len2 = ref1.length; l < len2; l++) {
                    node = ref1[l];
                    results1.push(this.doSync(node));
                  }
                  return results1;
                }.call(_this));
              }
              return results;
            }).observe(document.body, {
              childList: true,
              subtree: true
            });
          }
        }

        // unbind the scroll event

      }, {
        key: 'stop',
        value: function stop() {
          this.stopped = true;
          this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
          this.util().removeEvent(window, 'resize', this.scrollHandler);
          if (this.interval != null) {
            return clearInterval(this.interval);
          }
        }
      }, {
        key: 'sync',
        value: function sync(element) {
          if (MutationObserver.notSupported) {
            return this.doSync(this.element);
          }
        }
      }, {
        key: 'doSync',
        value: function doSync(element) {
          var box, j, len, ref, results;
          if (element == null) {
            element = this.element;
          }
          if (element.nodeType !== 1) {
            return;
          }
          element = element.parentNode || element;
          ref = element.querySelectorAll('.' + this.config.boxClass);
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            if (indexOf.call(this.all, box) < 0) {
              this.boxes.push(box);
              this.all.push(box);
              if (this.stopped || this.disabled()) {
                this.resetStyle();
              } else {
                this.applyStyle(box, true);
              }
              results.push(this.scrolled = true);
            } else {
              results.push(void 0);
            }
          }
          return results;
        }

        // show box element

      }, {
        key: 'show',
        value: function show(box) {
          this.applyStyle(box);
          box.className = box.className + ' ' + this.config.animateClass;
          if (this.config.callback != null) {
            this.config.callback(box);
          }
          this.util().emitEvent(box, this.wowEvent);
          this.util().addEvent(box, 'animationend', this.resetAnimation);
          this.util().addEvent(box, 'oanimationend', this.resetAnimation);
          this.util().addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
          this.util().addEvent(box, 'MSAnimationEnd', this.resetAnimation);
          return box;
        }
      }, {
        key: 'applyStyle',
        value: function applyStyle(box, hidden) {
          var _this2 = this;

          var delay, duration, iteration;
          duration = box.getAttribute('data-wow-duration');
          delay = box.getAttribute('data-wow-delay');
          iteration = box.getAttribute('data-wow-iteration');
          return this.animate(function () {
            return _this2.customStyle(box, hidden, duration, delay, iteration);
          });
        }
      }, {
        key: 'resetStyle',
        value: function resetStyle() {
          var box, j, len, ref, results;
          ref = this.boxes;
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            box = ref[j];
            results.push(box.style.opacity = 1);
          }
          return results;
        }
      }, {
        key: 'resetAnimation',
        value: function resetAnimation(event) {
          var target;
          if (event.type.toLowerCase().indexOf('animationend') >= 0) {
            target = event.target || event.srcElement;
            return target.className = target.className.replace(this.config.animateClass, '').trim();
          }
        }
      }, {
        key: 'customStyle',
        value: function customStyle(box, hidden, duration, delay, iteration) {
          if (hidden) {
            this.cacheAnimationName(box);
          }
          box.style.opacity = 0 ? 0 : 1;
          if (duration) {
            this.vendorSet(box.style, {
              animationDuration: duration
            });
          }
          if (delay) {
            this.vendorSet(box.style, {
              animationDelay: delay
            });
          }
          if (iteration) {
            this.vendorSet(box.style, {
              animationIterationCount: iteration
            });
          }
          this.vendorSet(box.style, {
            animationName: hidden ? 'none' : this.cachedAnimationName(box)
          });
          return box;
        }
      }, {
        key: 'vendorSet',
        value: function vendorSet(elem, properties) {
          var name, results, value, vendor;
          results = [];
          for (name in properties) {
            value = properties[name];
            elem['' + name] = value;
            results.push(function () {
              var j, len, ref, results1;
              ref = this.vendors;
              results1 = [];
              for (j = 0, len = ref.length; j < len; j++) {
                vendor = ref[j];
                results1.push(elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value);
              }
              return results1;
            }.call(this));
          }
          return results;
        }
      }, {
        key: 'vendorCSS',
        value: function vendorCSS(elem, property) {
          var j, len, ref, result, style, vendor;
          style = getComputedStyle(elem);
          result = style.getPropertyCSSValue(property);
          ref = this.vendors;
          for (j = 0, len = ref.length; j < len; j++) {
            vendor = ref[j];
            result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);
          }
          return result;
        }
      }, {
        key: 'animationName',
        value: function animationName(box) {
          var animationName;
          try {
            animationName = this.vendorCSS(box, 'animation-name').cssText; // Opera, fall back to plain property value
          } catch (error) {
            animationName = getComputedStyle(box).getPropertyValue('animation-name');
          }
          if (animationName === 'none') {
            return ''; // SVG/Firefox, unable to get animation name?
          } else {
            return animationName;
          }
        }
      }, {
        key: 'cacheAnimationName',
        value: function cacheAnimationName(box) {
          // https://bugzilla.mozilla.org/show_bug.cgi?id=921834
          // box.dataset is not supported for SVG elements in Firefox
          return this.animationNameCache.set(box, this.animationName(box));
        }
      }, {
        key: 'cachedAnimationName',
        value: function cachedAnimationName(box) {
          return this.animationNameCache.get(box);
        }
      }, {
        key: 'scrollHandler',
        value: function scrollHandler() {
          return this.scrolled = true;
        }
      }, {
        key: 'scrollCallback',
        value: function scrollCallback() {
          var box;
          if (this.scrolled) {
            this.scrolled = false;
            this.boxes = function () {
              var j, len, ref, results;
              ref = this.boxes;
              results = [];
              for (j = 0, len = ref.length; j < len; j++) {
                box = ref[j];
                if (!box) {
                  continue;
                }
                if (this.isVisible(box)) {
                  this.show(box);
                  continue;
                }
                results.push(box);
              }
              return results;
            }.call(this);
            if (!(this.boxes.length || this.config.live)) {
              return this.stop();
            }
          }
        }

        // Calculate element offset top

      }, {
        key: 'offsetTop',
        value: function offsetTop(element) {
          var top;
          while (element.offsetTop === void 0) {
            // SVG elements don't have an offsetTop in Firefox.
            // This will use their nearest parent that has an offsetTop.
            // Also, using ('offsetTop' of element) causes an exception in Firefox.
            element = element.parentNode;
          }
          top = element.offsetTop;
          while (element = element.offsetParent) {
            top += element.offsetTop;
          }
          return top;
        }

        // check if box is visible

      }, {
        key: 'isVisible',
        value: function isVisible(box) {
          var bottom, offset, top, viewBottom, viewTop;
          offset = box.getAttribute('data-wow-offset') || this.config.offset;
          viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
          viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
          top = this.offsetTop(box);
          bottom = top + box.clientHeight;
          return top <= viewBottom && bottom >= viewTop;
        }
      }, {
        key: 'util',
        value: function util() {
          return this._util != null ? this._util : this._util = new Util();
        }
      }, {
        key: 'disabled',
        value: function disabled() {
          return !this.config.mobile && this.util().isMobile(navigator.userAgent);
        }
      }]);

      return WOW;
    }();

    ;

    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null,
      scrollContainer: null
    };

    WOW.prototype.animate = function () {
      if ('requestAnimationFrame' in window) {
        return function (callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function (callback) {
          return callback();
        };
      }
    }();

    WOW.prototype.vendors = ["moz", "webkit"];

    return WOW;
  }.call(this);
}).call(undefined);
