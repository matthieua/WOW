(function() {
  describe("WOW", function() {
    describe("test environment", function() {
      beforeEach(function() {
        return loadFixtures("fragment.html");
      });
      it("emulates window height", function() {
        return expect(document.documentElement.clientHeight).toBe(300);
      });
      return it("has a scoped stylesheet", function() {
        expect($("#fixtures").height()).toBe(700);
        return expect($("#fixtures-1").height()).toBe(50);
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
        $("#fixtures").css({
          padding: 0,
          margin: 0
        });
        new WOW().init();
        return setTimeout(function() {
          return done();
        }, 100);
      });
      it("does not touch elements that don't have the marker class", function(done) {
        expect($("#fixtures-1")).not.toHaveClass(WOW.prototype.defaults.animateClass);
        return done();
      });
      it("animates elements partially visible on the page", function(done) {
        expect($("#fixtures-2")).toHaveClass(WOW.prototype.defaults.animateClass);
        return done();
      });
      return it("does not animate elements not yet visible on the page", function(done) {
        return done();
      });
    });
  });

}).call(this);
