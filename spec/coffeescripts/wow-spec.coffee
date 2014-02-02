describe 'WOW', ->
  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures')

  describe 'library behavior', ->
    it 'existes', ->
      expect( WOW ).toBeDefined()
