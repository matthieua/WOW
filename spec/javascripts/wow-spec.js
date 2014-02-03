(function() {
  describe("WOW", function() {
    beforeEach(function() {
      loadFixtures("fragment.html");
      return this.$element = $("#fixtures");
    });
    describe("test environment", function() {
      return it("should emulate a window of height 300", function() {
        return expect(document.documentElement.clientHeight).toBe(300);
      });
    });
    return describe("library behavior", function() {
      it("exists", function() {
        return expect(WOW).toBeDefined();
      });
      it("has an 'init' method", function() {
        return expect(new WOW().init).toBeDefined();
      });
      return xit("animates elements already visible on the page", function() {
        new WOW().init();
        return expect($("#test-2")[0]).toHaveClass("animated");
      });
    });
  });

}).call(this);
