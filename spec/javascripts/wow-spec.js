(function() {
  describe("WOW", function() {
    var offsetFixtures, offsetTop, offsetTop1, offsetTop2, offsetTop3, offsetTop4, winHeight;
    offsetTop = 70;
    winHeight = 300;
    offsetFixtures = 100;
    offsetTop1 = offsetTop + offsetFixtures + 200 * 0;
    offsetTop2 = offsetTop + offsetFixtures + 200 * 1;
    offsetTop3 = offsetTop + offsetFixtures + 200 * 2;
    offsetTop4 = offsetTop + offsetFixtures + 200 * 3;
    describe("test environment", function() {
      beforeEach(function() {
        return loadFixtures("fragment.html");
      });
      it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(winHeight);
      });
      return it("has boxes set up for testing", function() {
        expect($("#fixtures").height()).toBe(800);
        expect($("#fixtures-1").height()).toBe(200);
        expect($("#fixtures-2").height()).toBe(200);
        expect($("#fixtures-3").height()).toBe(200);
        expect($("#fixtures-4").height()).toBe(200);
        expect($("#fixtures-1").offset().top).toBe(offsetTop1);
        expect($("#fixtures-2").offset().top).toBe(offsetTop2);
        expect($("#fixtures-3").offset().top).toBe(offsetTop3);
        return expect($("#fixtures-4").offset().top).toBe(offsetTop4);
      });
    });
    describe("library smoke test", function() {
      it("exists", function() {
        return expect(WOW).toBeDefined();
      });
      return it("has an 'init' method", function() {
        return expect(new WOW().init).toBeDefined();
      });
    });
    return describe("library behaviour", function() {
      beforeEach(function(done) {
        loadFixtures("fragment.html");
        new WOW().init();
        return setTimeout(function() {
          return done();
        }, 100);
      });
      it("animates elements that are fully visible on the page", function() {
        return expect($("#fixtures-1")).toHaveClass("animated");
      });
      it("does not touch elements that don't have the marker class", function() {
        return expect($("#fixtures-2")).not.toHaveClass("animated");
      });
      it("does not animate elements not yet visible on the page", function() {
        expect($("#fixtures-3")).not.toHaveClass("animated");
        return expect($("#fixtures-4")).not.toHaveClass("animated");
      });
      return it("animates elements after scrolling down and they become visible", function(done) {
        window.scrollTo(0, offsetTop3 - winHeight + 150);
        return setTimeout(function() {
          expect($("#fixtures-3")).toHaveClass("animated");
          expect($("#fixtures-4")).not.toHaveClass("animated");
          window.scrollTo(0, offsetTop4 - winHeight + 150);
          return setTimeout(function() {
            expect($("#fixtures-4")).toHaveClass("animated");
            return done();
          }, 100);
        }, 100);
      });
    });
  });

}).call(this);
