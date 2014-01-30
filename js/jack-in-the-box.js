(function() {
  jQuery(function() {
    $.jackInTheBox = function(element, options) {
      var scrolled, state,
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
        var bottom, top, viewBottom, viewTop;
        viewTop = _this.$window.scrollTop();
        viewBottom = viewTop + _this.$window.height() - _this.settings.offset;
        top = $box.offset().top;
        bottom = top + $box.height();
        return top <= viewBottom && bottom >= viewTop;
      };
      scrolled = false;
      this.scrollHandler = function() {
        return scrolled = true;
      };
      this.scrollCallback = function() {
        if (!scrolled) {
          return;
        }
        scrolled = false;
        return _this.show();
      };
      this.show = function() {
        return _this.$boxes = _this.$boxes.map(function(index, box) {
          var $box;
          $box = $(box);
          if (_this.visible($box)) {
            $box.css({
              visibility: 'visible'
            }).addClass(_this.settings.animateClass);
            return null;
          } else {
            return $box;
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
          $(window).on("scroll", this.scrollHandler);
          setInterval(this.scrollCallback);
          return this.show();
        }
      };
      this.init();
      return this;
    };
    $.jackInTheBox.prototype.defaults = {
      boxClass: 'box',
      animateClass: 'animated',
      offset: 0,
      interval: 50
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
