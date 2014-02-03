(function() {
  describe("WOW", function() {
    var winHeight;
    winHeight = 300;
    describe("simple test environment", function() {
      beforeEach(function() {
        return loadFixtures("simple.html");
      });
      it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(winHeight);
      });
      return it("has boxes set up for testing", function() {
        var offset;
        expect($("#simple").height()).toBe(800);
        expect($("#simple-1").height()).toBe(200);
        expect($("#simple-2").height()).toBe(200);
        expect($("#simple-3").height()).toBe(200);
        expect($("#simple-4").height()).toBe(200);
        offset = $("#simple").offset().top;
        expect($("#simple-1").offset().top).toBe(offset + 200 * 0);
        expect($("#simple-2").offset().top).toBe(offset + 200 * 1);
        expect($("#simple-3").offset().top).toBe(offset + 200 * 2);
        return expect($("#simple-4").offset().top).toBe(offset + 200 * 3);
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
    describe("library behaviour", function() {
      beforeEach(function(done) {
        loadFixtures("simple.html");
        new WOW().init();
        return setTimeout(function() {
          return done();
        }, 100);
      });
      it("animates elements that are fully visible on the page", function() {
        return expect($("#simple-1")).toHaveClass("animated");
      });
      it("does not touch elements that don't have the marker class", function() {
        return expect($("#simple-2")).not.toHaveClass("animated");
      });
      it("does not animate elements not yet visible on the page", function() {
        expect($("#simple-3")).not.toHaveClass("animated");
        return expect($("#simple-4")).not.toHaveClass("animated");
      });
      return it("animates elements after scrolling down and they become visible", function(done) {
        window.scrollTo(0, $("#simple-3").offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($("#simple-3")).toHaveClass("animated");
          expect($("#simple-4")).not.toHaveClass("animated");
          window.scrollTo(0, $("#simple-4").offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($("#simple-4")).toHaveClass("animated");
            return done();
          }, 100);
        }, 100);
      });
    });
    describe("custom test environment", function() {
      beforeEach(function() {
        return loadFixtures("custom.html");
      });
      it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(winHeight);
      });
      return it("has boxes set up for testing", function() {
        var offset;
        expect($("#custom").height()).toBe(800);
        expect($("#custom-1").height()).toBe(200);
        expect($("#custom-2").height()).toBe(200);
        expect($("#custom-3").height()).toBe(200);
        expect($("#custom-4").height()).toBe(200);
        offset = $("#custom").offset().top;
        expect($("#custom-1").offset().top).toBe(offset + 200 * 0);
        expect($("#custom-2").offset().top).toBe(offset + 200 * 1);
        expect($("#custom-3").offset().top).toBe(offset + 200 * 2);
        return expect($("#custom-4").offset().top).toBe(offset + 200 * 3);
      });
    });
    return describe("library behaviour with custom settings", function() {
      beforeEach(function(done) {
        loadFixtures("custom.html");
        new WOW({
          boxClass: "block",
          animateClass: "fancy",
          offset: 10
        }).init();
        return setTimeout(function() {
          return done();
        }, 100);
      });
      it("does not touch elements that don't have the marker class", function() {
        var custom1;
        custom1 = $("#custom-1");
        window.scrollTo(0, custom1.offset().top - 10);
        return expect(custom1).not.toHaveClass("fancy");
      });
      it("animates elements that are partially visible on the page", function() {
        var custom1;
        custom1 = $("#custom-2");
        window.scrollTo(0, custom1.offset().top - winHeight + 10);
        return expect(custom1).toHaveClass("fancy");
      });
      it("does not animate elements not yet visible on the page", function() {
        expect($("#custom-3")).not.toHaveClass("fancy");
        return expect($("#custom-4")).not.toHaveClass("fancy");
      });
      return it("animates elements after scrolling down and they become visible", function(done) {
        window.scrollTo(0, $("#custom-3").offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($("#custom-3")).toHaveClass("fancy");
          expect($("#custom-4")).not.toHaveClass("fancy");
          window.scrollTo(0, $("#custom-4").offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($("#custom-4")).toHaveClass("fancy");
            return done();
          }, 100);
        }, 100);
      });
    });
  });

}).call(this);
