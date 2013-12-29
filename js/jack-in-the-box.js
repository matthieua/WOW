(function() {
  jQuery(function() {
    $.jackInTheBox = function(element, options) {
      var state,
        _this = this;
      state = '';
      this.settings = {};
      this.$element = $(element);
      this.getSetting = function(key) {
        return this.settings[key];
      };
      this.callSettingFunction = function(name, args) {
        if (args == null) {
          args = [];
        }
        return this.settings[name].apply(this, args);
      };
      this.visible = function($box) {
        var viewBottom, viewTop, _bottom, _top;
        viewTop = _this.$window.scrollTop();
        viewBottom = viewTop + _this.$window.height() - _this.settings.offset;
        _top = $box.offset().top;
        _bottom = _top + $box.height();
        return _top <= viewBottom && _bottom >= viewTop;
      };
      this.scrollHandler = function() {
        var scrollTimeout;
        scrollTimeout = null;
        return _this.$window.scroll(function() {
          if (scrollTimeout) {
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
          }
          return scrollTimeout = setTimeout(_this.show, 50);
        });
      };
      this.show = function() {
        return _this.$boxes.each(function(index, box) {
          var $box;
          $box = $(box);
          if (_this.visible($box)) {
            return $box.css({
              visibility: 'visible'
            }).addClass(_this.settings.animateClass);
          }
        });
      };
      this.init = function() {
        this.settings = $.extend({}, this.defaults, options);
        this.$window = $(window);
        this.$boxes = $("." + this.settings.boxClass).css({
          visibility: 'hidden'
        });
        if (this.$boxes.length) {
          return this.scrollHandler();
        }
      };
      this.init();
      return this;
    };
    $.jackInTheBox.prototype.defaults = {
      boxClass: 'box',
      animateClass: 'animated',
      offset: 10
    };
    return $.fn.jackInTheBox = function(options) {
      return this.each(function() {
        var plugin;
        if ($(this).data('jackInTheBox') === void 0) {
          plugin = new $.jackInTheBox(this, options);
          return $(this).data('jackInTheBox', plugin);
        }
      });
    };
  });

}).call(this);
