describe 'jackInTheBox', ->
  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $('#fixtures')

  describe 'library behavior', ->
    it 'existes', ->
      expect( JackInTheBox ).toBeDefined()
