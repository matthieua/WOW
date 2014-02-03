(function() {
  describe("WOW", function() {
    beforeEach(function() {
      loadFixtures("fragment.html");
      return this.$element = $("#fixtures");
    });
    describe("test environment", function() {
      it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(300);
      });
      return it("has a scoped stylesheet", function() {
        return expect($("#test-1").height()).toBe(200);
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
        new WOW().init();
        return setTimeout(function() {
          return done();
        }, 100);
      });
      it("does not touch elements that don't have the marker class", function(done) {
        expect($("#test-1")).not.toHaveClass(WOW.prototype.defaults.animateClass);
        return done();
      });
      it("animates elements partially visible on the page", function(done) {
        expect($("#test-2")).toHaveClass(WOW.prototype.defaults.animateClass);
        return done();
      });
      return it("does not animate elements not yet visible on the page", function(done) {
        expect($("#test-4")).not.toHaveClass(WOW.prototype.defaults.animateClass);
        return done();
      });
    });
  });

}).call(this);
