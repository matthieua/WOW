(function() {
  describe('jackInTheBox', function() {
    beforeEach(function() {
      loadFixtures('fragment.html');
      return this.$element = $('#fixtures');
    });
    return describe('library behavior', function() {
      return it('is true', function() {
        return expect(true).toBeTruthy();
      });
    });
  });

}).call(this);
