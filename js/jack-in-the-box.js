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
      this.mobileDevice = function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      };
      this.visible = function($box) {
        var bottom, top, viewBottom, viewTop;
        viewTop = _this.$window.scrollTop();
        viewBottom = viewTop + _this.$window.height() - _this.settings.offset;
        top = $box.offset().top;
        bottom = top + $box.height();
        return top <= viewBottom && bottom >= viewTop;
      };
      this.scrollHandler = function() {
        return _this.$window.scroll(function() {
          return _this.show();
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
          this.scrollHandler();
          return this.show();
        }
      };
      if (!this.mobileDevice()) {
        this.init();
      }
      return this;
    };
    $.jackInTheBox.prototype.defaults = {
      boxClass: 'box',
      animateClass: 'animated',
      offset: 0
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
