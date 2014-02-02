(function() {
  describe('jackInTheBox', function() {
    beforeEach(function() {
      loadFixtures('fragment.html');
      return this.$element = $('#fixtures');
    });
    return describe('library behavior', function() {
      return it('existes', function() {
        return expect(JackInTheBox).toBeDefined();
      });
    });
  });

}).call(this);
