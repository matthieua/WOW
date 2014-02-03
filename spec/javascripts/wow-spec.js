(function() {
  describe("WOW", function() {
    beforeEach(function() {
      loadFixtures("fragment.html");
      return this.$element = $("#fixtures");
    });
    describe("test environment", function() {
      return it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(300);
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
      it("does not touch elements that don't have a 'box' class", function(done) {
        expect($("#test-1")[0]).not.toHaveClass("animated");
        return done();
      });
      return it("animates elements already visible on the page", function(done) {
        expect($("#test-2")[0]).toHaveClass("animated");
        return done();
      });
    });
  });

}).call(this);
