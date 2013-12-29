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
        var currentURL;
        this.settings = $.extend({}, this.defaults, options);
        window.parallaxBrowser = function() {
          var slides;
          slides = $(".box").fadeTo(0, 0);
          return $(window).scroll(function(d, h) {
            return slides.each(function(i) {
              var a, b;
              a = $(this).offset().top + $(this).height() - 10;
              b = $(window).scrollTop() + $(window).height();
              if (a < b) {
                $(this).show();
                return $(this).addClass("animated");
              }
            });
          });
        };
        window.parallaxMobile = function() {
          var slides;
          slides = $(".slide").children().fadeTo(0, 0);
          return $(window).scroll(function(d, h) {
            return slides.each(function(i) {
              var a, b;
              a = $(this).offset().top + $(this).height() - 300;
              b = $(window).scrollTop() + $(window).height();
              if (a < b) {
                $(this).show();
                return $(this).addClass("animated");
              }
            });
          });
        };
        currentURL = document.URL;
        if ($(window).width() > 769) {
          return parallaxBrowser();
        } else {
          if ($(window).width() > 350) {
            return parallaxMobile();
          }
        }
      };
      this.init();
      return this;
    };
    $.jackInTheBox.prototype.defaults = {
      boxClass: 'box',
      animateClass: 'animated',
      offset: 5
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
