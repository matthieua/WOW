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
      this.calculateBoxesPosition = function() {
        return _this.$boxes.each(function(index, box) {
          var $box;
          $box = $(box);
          return $box.data('positionY', $box.offset().top + $box.height() - _this.settings.offset);
        });
      };
      this.parallaxBrowser = function() {
        return _this.$window.scroll(function() {
          return _this.$boxes.each(function(index, box) {
            var $box, scrollY;
            $box = $(box);
            scrollY = _this.$window.scrollTop() + _this.$window.height();
            if ($(box).data('positionY') < scrollY) {
              return $box.css({
                visibility: 'visible'
              }).addClass(_this.settings.animateClass);
            }
          });
        });
      };
      this.init = function() {
        this.settings = $.extend({}, this.defaults, options);
        this.$boxes = $("." + this.settings.boxClass).css({
          visibility: 'hidden'
        });
        this.$window = $(window);
        this.settings.offset = this.$window.width() > 769 ? this.settings.desktopOffset : this.$window.width() > 350 ? this.settings.mobileOffset : void 0;
        this.calculateBoxesPosition();
        if (this.settings.offset != null) {
          return this.parallaxBrowser();
        }
      };
      this.init();
      return this;
    };
    $.jackInTheBox.prototype.defaults = {
      boxClass: 'box',
      animateClass: 'animated',
      desktopOffset: 10,
      mobileOffset: 300
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
