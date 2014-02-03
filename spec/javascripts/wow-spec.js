(function() {
  describe("WOW", function() {
    var offset;
    offset = 70;
    describe("test environment", function() {
      beforeEach(function() {
        return loadFixtures("fragment.html");
      });
      it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(300);
      });
      return it("has boxes set up for testing", function() {
        expect($("#fixtures").height()).toBe(800);
        expect($("#fixtures-1").height()).toBe(200);
        expect($("#fixtures-2").height()).toBe(200);
        expect($("#fixtures-3").height()).toBe(200);
        expect($("#fixtures-4").height()).toBe(200);
        expect($("#fixtures-1").offset().top).toBe(offset + 100 + 200 * 0);
        expect($("#fixtures-2").offset().top).toBe(offset + 100 + 200 * 1);
        expect($("#fixtures-3").offset().top).toBe(offset + 100 + 200 * 2);
        return expect($("#fixtures-4").offset().top).toBe(offset + 100 + 200 * 3);
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
      it("animates elements that are fully visible on the page", function(done) {
        expect($("#fixtures-1")).toHaveClass("animated");
        return done();
      });
      it("does not touch elements that don't have the marker class", function(done) {
        expect($("#fixtures-2")).not.toHaveClass("animated");
        return done();
      });
      return it("does not animate elements not yet visible on the page", function(done) {
        expect($("#fixtures-3")).not.toHaveClass("animated");
        expect($("#fixtures-4")).not.toHaveClass("animated");
        return done();
      });
    });
  });

}).call(this);
