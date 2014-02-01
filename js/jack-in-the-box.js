(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(window) {
    var jack, jackInTheBox;
    jackInTheBox = (function() {
      jackInTheBox.prototype.config = {
        boxClass: 'box',
        animateClass: 'animated',
        offset: 0
      };

      function jackInTheBox() {
        this.scrollHandler = __bind(this.scrollHandler, this);
        this.visibleCount = 0;
        this.documentElement = window.document.documentElement;
        this.boxes = Array.prototype.slice.call(this.documentElement.querySelectorAll("." + this.config.boxClass));
      }

      jackInTheBox.prototype.start = function() {
        if (this.boxes.length) {
          this.hideAll();
          if (this.boxes.length) {
            window.addEventListener('scroll', this.scrollHandler, false);
          }
          return this.scrollHandler();
        }
      };

      jackInTheBox.prototype.stop = function() {
        return window.removeEventListener('scroll', this.scrollHandler, false);
      };

      jackInTheBox.prototype.show = function(box) {
        box.style.visibility = 'visible';
        return box.className = "" + box.className + " " + this.config.animateClass;
      };

      jackInTheBox.prototype.hideAll = function() {
        var i, _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.boxes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(this.boxes[i].style.visibility = 'hidden');
        }
        return _results;
      };

      jackInTheBox.prototype.scrollHandler = function() {
        var i, _i, _ref, _results;
        if (this.boxes.length) {
          _results = [];
          for (i = _i = 0, _ref = this.boxes.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
            if ((this.boxes[i] != null) && this.isVisible(this.boxes[i])) {
              this.show(this.boxes[i]);
              this.boxes[i] = null;
              this.visibleCount++;
              if (this.boxes.length === this.visibleCount) {
                _results.push(this.stop());
              } else {
                _results.push(void 0);
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };

      jackInTheBox.prototype.isVisible = function(box) {
        var bottom, top, viewBottom, viewTop;
        viewTop = window.pageYOffset;
        viewBottom = viewTop + this.documentElement['clientHeight'] - this.config.offset;
        top = box.offsetTop;
        bottom = top + box['clientHeight'];
        return top <= viewBottom && bottom >= viewTop;
      };

      return jackInTheBox;

    })();
    jack = new jackInTheBox();
    return jack.start();
  })(window);

}).call(this);
