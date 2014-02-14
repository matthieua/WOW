(function() {
  describe("WOW", function() {
    var timeout, winHeight;
    timeout = 100;
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
      it("has an 'init' method", function() {
        return expect(new WOW().init).toBeDefined();
      });
      return it("has a create static method", function() {
        return expect(WOW.create).toBeDefined();
      });
    });
    describe("library behaviour", function() {
      beforeEach(function(done) {
        loadFixtures("simple.html");
        WOW.create();
        return setTimeout(function() {
          return done();
        }, timeout);
      });
      it("animates elements that are fully visible on the page", function() {
        expect($("#simple-1")).toHaveClass("animated");
        return expect($("#simple-1").css("visibility")).toBe("visible");
      });
      it("does not touch elements that don't have the marker class", function() {
        expect($("#simple-2")).not.toHaveClass("animated");
        return expect($("#simple-2").css("visibility")).toBe("visible");
      });
      it("does not animate elements not yet visible on the page", function() {
        expect($("#simple-3")).not.toHaveClass("animated");
        expect($("#simple-3").css("visibility")).not.toBe("visible");
        expect($("#simple-4")).not.toHaveClass("animated");
        return expect($("#simple-4").css("visibility")).not.toBe("visible");
      });
      return it("animates elements after scrolling down and they become visible", function(done) {
        window.scrollTo(0, $("#simple-3").offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($("#simple-3")).toHaveClass("animated");
          expect($("#simple-3").css("visibility")).toBe("visible");
          expect($("#simple-4")).not.toHaveClass("animated");
          expect($("#simple-4").css("visibility")).not.toBe("visible");
          window.scrollTo(0, $("#simple-4").offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($("#simple-4")).toHaveClass("animated");
            expect($("#simple-4").css("visibility")).toBe("visible");
            return done();
          }, timeout);
        }, timeout);
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
        WOW.create({
          boxClass: "block",
          animateClass: "fancy",
          offset: 10
        });
        return setTimeout(function() {
          return done();
        }, timeout);
      });
      it("does not touch elements that don't have the marker class", function(done) {
        window.scrollTo(0, $("#custom-1").offset().top - winHeight + 15);
        return setTimeout(function() {
          expect($("#custom-1")).not.toHaveClass("fancy");
          return done();
        }, timeout);
      });
      it("animates elements that are partially visible on the page based on the 'offset' config", function(done) {
        return setTimeout(function() {
          window.scrollTo(0, $("#custom-2").offset().top - winHeight + 5);
          expect($("#custom-2")).not.toHaveClass("fancy");
          window.scrollTo(0, $("#custom-2").offset().top - winHeight + 15);
          return setTimeout(function() {
            expect($("#custom-2")).toHaveClass("fancy");
            expect($("#custom-2").css("visibility")).toBe("visible");
            return done();
          }, timeout);
        }, timeout);
      });
      it("does not animate elements not yet visible on the page", function() {
        expect($("#custom-3")).not.toHaveClass("fancy");
        return expect($("#custom-4")).not.toHaveClass("fancy");
      });
      return it("animates elements after scrolling down and they become visible", function(done) {
        window.scrollTo(0, $("#custom-3").offset().top - winHeight + 150);
        return setTimeout(function() {
          expect($("#custom-3")).toHaveClass("fancy");
          expect($("#custom-3").css("visibility")).toBe("visible");
          expect($("#custom-3")[0].style.webkitAnimationIterationCount).toBe("2");
          expect($("#custom-4")).not.toHaveClass("fancy");
          window.scrollTo(0, $("#custom-4").offset().top - winHeight + 150);
          return setTimeout(function() {
            expect($("#custom-4")).toHaveClass("fancy");
            expect($("#custom-4").css("visibility")).toBe("visible");
            expect($("#custom-4")[0].style.webkitAnimationIterationCount).toBe("infinite");
            expect($("#custom-4")[0].style.webkitAnimationDuration).toBe("2s");
            expect($("#custom-4")[0].style.webkitAnimationDelay).toBe("1s");
            return done();
          }, timeout);
        }, timeout);
      });
    });
  });

}).call(this);
