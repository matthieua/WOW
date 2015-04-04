(function() {
  describe('WOW', function() {
    var timeout, winHeight;
    window.console = {
      warn: function() {}
    };
    timeout = 100;
    winHeight = 300;
    describe('smoke test', function() {
      it('exists', function() {
        return expect(WOW).toBeDefined();
      });
      return it("has an 'init' method", function() {
        return expect(new WOW().init).toBeDefined();
      });
    });
    describe('simple test environment', function() {
      beforeEach(function() {
        return loadFixtures('simple.html');
      });
      it('emulates window height', function() {
        return expect(document.documentElement.clientHeight).toBe(winHeight);
      });
      return it('has boxes set up for testing', function() {
        var boxCount, boxHeight, offset, style;
        boxHeight = 200;
        boxCount = $('#simple').children().length;
        expect($('#simple').height()).toBe(boxHeight * boxCount);
        expect($('#simple-1').height()).toBe(boxHeight);
        expect($('#simple-2').height()).toBe(boxHeight);
        expect($('#simple-3').height()).toBe(boxHeight);
        expect($('#simple-4').height()).toBe(boxHeight);
        expect($('#simple-5').height()).toBe(boxHeight);
        offset = $('#simple').offset().top;
        expect($('#simple-1').offset().top).toBe(offset + boxHeight * 0);
        expect($('#simple-2').offset().top).toBe(offset + boxHeight * 1);
        expect($('#simple-3').offset().top).toBe(offset + boxHeight * 2);
        expect($('#simple-4').offset().top).toBe(offset + boxHeight * 3);
        expect($('#simple-5').offset().top).toBe(offset + boxHeight * 4);
        style = $('#simple-5')[0].style;
        expect(style.background).toBe('yellow');
        return expect(style.color).toBe('red');
      });
    });
    describe('library behaviour', function() {
      var wow;
      wow = null;
      beforeEach(function(done) {
        loadFixtures('simple.html');
        (wow = new WOW).init();
        return setTimeout(function() {
          return done();
        }, timeout);
      });
      it('animates elements that are fully visible on the page', function() {
        expect($('#simple-1')).toHaveClass('animated');
        return expect($('#simple-1').css('visibility')).toBe('visible');
      });
      it("does not touch elements that don't have the marker class", function() {
        expect($('#simple-2')).not.toHaveClass('animated');
        return expect($('#simple-2').css('visibility')).toBe('visible');
      });
      it('does not animate elements not yet visible on the page', function() {
        expect($('#simple-3')).not.toHaveClass('animated');
        expect($('#simple-3').css('visibility')).not.toBe('visible');
        expect($('#simple-4')).not.toHaveClass('animated');
        return expect($('#simple-4').css('visibility')).not.toBe('visible');
      });
      it('animates elements after scrolling down and they become visible', function(done) {
        window.scrollTo(0, $('#simple-3').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($('#simple-3')).toHaveClass('animated');
          expect($('#simple-3').css('visibility')).toBe('visible');
          expect($('#simple-4')).not.toHaveClass('animated');
          expect($('#simple-4').css('visibility')).not.toBe('visible');
          window.scrollTo(0, $('#simple-4').offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($('#simple-4')).toHaveClass('animated');
            expect($('#simple-4').css('visibility')).toBe('visible');
            return done();
          }, timeout);
        }, timeout);
      });
      it('does not tamper with the style attribute', function(done) {
        window.scrollTo(0, $('#simple-5').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($('#simple-5')).toHaveClass('animated');
          expect($('#simple-5').css('visibility')).toBe('visible');
          expect($('#simple-5')[0].style.background).toBe('yellow');
          expect($('#simple-5')[0].style.color).toBe('red');
          return done();
        }, timeout);
      });
      it('works with asynchronously loaded content', function(done) {
        $('#simple').append($('<div/>', {
          id: 'simple-6',
          "class": 'wow'
        }));
        wow.sync();
        window.scrollTo(0, $('#simple-6').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($('#simple-6')).toHaveClass('animated');
          expect($('#simple-6').css('visibility')).toBe('visible');
          return done();
        }, timeout);
      });
      return it('works with asynchronously loaded nested content', function(done) {
        $('#simple').append($('<div/>')).children().first().append($('<div/>', {
          id: 'simple-7',
          "class": 'wow'
        }));
        wow.sync();
        window.scrollTo(0, $('#simple-7').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($('#simple-7')).toHaveClass('animated');
          expect($('#simple-7').css('visibility')).toBe('visible');
          return done();
        }, timeout);
      });
    });
    describe('custom test environment', function() {
      beforeEach(function() {
        return loadFixtures('custom.html');
      });
      it('emulates window height', function() {
        return expect(document.documentElement.clientHeight).toBe(winHeight);
      });
      return it('has boxes set up for testing', function() {
        var offset;
        expect($('#custom').height()).toBe(800);
        expect($('#custom-1').height()).toBe(200);
        expect($('#custom-2').height()).toBe(200);
        expect($('#custom-3').height()).toBe(200);
        expect($('#custom-4').height()).toBe(200);
        offset = $('#custom').offset().top;
        expect($('#custom-1').offset().top).toBe(offset + 200 * 0);
        expect($('#custom-2').offset().top).toBe(offset + 200 * 1);
        expect($('#custom-3').offset().top).toBe(offset + 200 * 2);
        return expect($('#custom-4').offset().top).toBe(offset + 200 * 3);
      });
    });
    return describe('library behaviour with custom settings', function() {
      var called;
      called = false;
      beforeEach(function(done) {
        called = false;
        loadFixtures('custom.html');
        new WOW({
          boxClass: 'block',
          animateClass: 'fancy',
          offset: 10,
          callback: function() {
            return called = true;
          }
        }).init();
        $('.block').on('block', function() {
          return $(this).addClass('triggered');
        });
        return setTimeout(function() {
          return done();
        }, timeout);
      });
      it("creates two instances of the WOW.js with different configs", function() {
        var wow1, wow2;
        wow1 = new WOW({
          boxClass: 'block1',
          animateClass: 'fancy1',
          offset: 10
        });
        wow2 = new WOW({
          boxClass: 'block2',
          animateClass: 'fancy2',
          offset: 20
        });
        expect(wow1.config.boxClass).toBe("block1");
        expect(wow1.config.animateClass).toBe("fancy1");
        return expect(wow1.config.offset).toBe(10);
      });
      it("does not touch elements that don't have the marker class", function(done) {
        window.scrollTo(0, $('#custom-1').offset().top - winHeight + 15);
        return setTimeout(function() {
          expect($('#custom-1')).not.toHaveClass('fancy');
          return done();
        }, timeout);
      });
      it("animates elements that are partially visible on the page based on the 'offset' config", function(done) {
        return setTimeout(function() {
          window.scrollTo(0, $('#custom-2').offset().top - winHeight + 5);
          expect($('#custom-2')).not.toHaveClass('fancy');
          window.scrollTo(0, $('#custom-2').offset().top - winHeight + 15);
          return setTimeout(function() {
            expect($('#custom-2')).toHaveClass('fancy');
            expect($('#custom-2').css('visibility')).toBe('visible');
            return done();
          }, timeout);
        }, timeout);
      });
      it('does not animate elements not yet visible on the page', function() {
        expect($('#custom-3')).not.toHaveClass('fancy');
        return expect($('#custom-4')).not.toHaveClass('fancy');
      });
      it('animates elements after scrolling down and they become visible', function(done) {
        window.scrollTo(0, $('#custom-3').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($('#custom-3')).toHaveClass('fancy');
          expect($('#custom-3').css('visibility')).toBe('visible');
          expect($('#custom-3')[0].style.webkitAnimationIterationCount).toBe('2');
          expect($('#custom-4')).not.toHaveClass('fancy');
          window.scrollTo(0, $('#custom-4').offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($('#custom-4')).toHaveClass('fancy');
            expect($('#custom-4').css('visibility')).toBe('visible');
            expect($('#custom-4')[0].style.webkitAnimationIterationCount).toBe('infinite');
            expect($('#custom-4')[0].style.webkitAnimationDuration).toBe('2s');
            expect($('#custom-4')[0].style.webkitAnimationDelay).toBe('1s');
            return done();
          }, timeout);
        }, timeout);
      });
      it("fires the callback", function(done) {
        called = false;
        window.scrollTo(0, $('#custom-3').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect(called).toBe(true);
          return done();
        }, timeout);
      });
      return it('fires the callback on the visible element', function(done) {
        window.scrollTo(0, $('#custom-3').offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($('#custom-3')).toHaveClass('triggered');
          expect($('#custom-4')).not.toHaveClass('triggered');
          window.scrollTo(0, $('#custom-4').offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($('#custom-3')).toHaveClass('triggered');
            expect($('#custom-4')).toHaveClass('triggered');
            return done();
          }, timeout);
        }, timeout);
      });
    });
  });

}).call(this);
