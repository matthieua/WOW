describe 'jackInTheBox', ->
  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures')

  describe 'library behavior', ->
    it 'is true', ->
      expect( true ).toBeTruthy()
