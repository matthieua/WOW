(function() {
  jQuery(function() {
    $.jackInTheBox = function(element, options) {
      var state;
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
      this.init = function() {
        var currentURL,
          _this = this;
        this.settings = $.extend({}, this.defaults, options);
        this.$boxes = $("." + this.settings.boxClass).css({
          visibility: 'hidden'
        });
        window.parallaxBrowser = function() {
          return $(window).scroll(function(d, h) {
            return _this.$boxes.each(function(index, box) {
              var $box, elementY, scrollY;
              $box = $(box);
              elementY = $box.offset().top + $box.height() - _this.settings.offset;
              scrollY = $(window).scrollTop() + $(window).height();
              if (elementY < scrollY) {
                return $box.css({
                  visibility: 'visible'
                }).addClass(_this.settings.animateClass);
              }
            });
          });
        };
        currentURL = document.URL;
        return parallaxBrowser();
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
