(function() {
  describe('WOW', function() {
    beforeEach(function() {
      loadFixtures('fragment.html');
      return this.$element = $('#fixtures');
    });
    return describe('library behavior', function() {
      return it('exists', function() {
        return expect(WOW).toBeDefined();
      });
    });
  });

}).call(this);
