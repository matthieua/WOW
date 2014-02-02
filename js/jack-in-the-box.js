(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(window) {
    var JackInTheBox, jack;
    JackInTheBox = (function() {
      JackInTheBox.prototype.config = {
        boxClass: 'box',
        animateClass: 'animated',
        offset: 0
      };

      function JackInTheBox() {
        this.scrollHandler = __bind(this.scrollHandler, this);
        this.visibleCount = 0;
        this.documentElement = window.document.documentElement;
        this.boxes = Array.prototype.slice.call(this.documentElement.getElementsByClassName(this.config.boxClass));
      }

      JackInTheBox.prototype.start = function() {
        if (this.boxes.length) {
          this.hideAll();
          window.addEventListener('scroll', this.scrollHandler, false);
          return this.scrollHandler();
        }
      };

      JackInTheBox.prototype.stop = function() {
        return window.removeEventListener('scroll', this.scrollHandler, false);
      };

      JackInTheBox.prototype.show = function(box) {
        box.style.visibility = 'visible';
        return box.className = "" + box.className + " " + this.config.animateClass;
      };

      JackInTheBox.prototype.hideAll = function() {
        var box, _i, _len, _ref, _results;
        _ref = this.boxes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          _results.push(box.style.visibility = 'hidden');
        }
        return _results;
      };

      JackInTheBox.prototype.scrollHandler = function() {
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

      JackInTheBox.prototype.offsetTop = function(element) {
        var top;
        top = element.offsetTop;
        while (element = element.offsetParent) {
          top += element.offsetTop;
        }
        return top;
      };

      JackInTheBox.prototype.isVisible = function(box) {
        var bottom, top, viewBottom, viewTop;
        viewTop = window.pageYOffset;
        viewBottom = viewTop + this.documentElement.clientHeight - this.config.offset;
        top = this.offsetTop(box);
        bottom = top + box.clientHeight;
        return top <= viewBottom && bottom >= viewTop;
      };

      return JackInTheBox;

    })();
    jack = new JackInTheBox();
    return jack.start();
  })(window);

}).call(this);
