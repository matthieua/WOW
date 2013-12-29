describe 'jackInTheBox', ->
  options =
    message: 'Hello World'

  beforeEach ->
    loadFixtures 'fragment.html'
    @$element = $( '#fixtures' )

  describe 'plugin behavior', ->
    it 'should be available on the jQuery object', ->
      expect( $.fn.jackInTheBox ).toBeDefined()

    it 'should be chainable', ->
      expect( @$element.jackInTheBox() ).toBe @$element

    it 'should offers default values', ->
      plugin = new $.jackInTheBox( @$element )

      expect( plugin.defaults ).toBeDefined()

    it 'should overwrites the settings', ->
      plugin = new $.jackInTheBox( @$element, options )

      expect( plugin.settings.message ).toBe( options.message )
