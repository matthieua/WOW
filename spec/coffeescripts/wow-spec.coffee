describe 'WOW', ->
  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures')

  describe 'library behavior', ->
    it 'exists', ->
      expect( WOW ).toBeDefined()
