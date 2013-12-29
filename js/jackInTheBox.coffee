#
# Name    : jackInTheBox
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.0.1
# Repo    : https://github.com/matthieua/jackInTheBox
# Website : -
#

jQuery ->
  $.jackInTheBox = ( element, options ) ->
    # current state
    state = ''

    # plugin settings
    @settings = {}

    # jQuery version of DOM element attached to the plugin
    @$element = $ element

    # get particular plugin setting
    @getSetting = ( key ) ->
      @settings[ key ]

    # call one of the plugin setting functions
    @callSettingFunction = ( name, args = [] ) ->
      @settings[name].apply( this, args )


    # Calculate the box position for every element
    @calculateBoxesPosition = =>
      @$boxes.each (index, box) =>
        $box = $(box)
        $box.data('positionY', $box.offset().top + $box.height() - @settings.offset)

    @parallaxBrowser = =>
      @$window.scroll =>
        @$boxes.each (index, box) =>
          $box    = $(box)
          scrollY = @$window.scrollTop() + @$window.height()
          if $(box).data('positionY') < scrollY
            $box.css(visibility: 'visible').addClass @settings.animateClass

    @init = ->
      @settings = $.extend( {}, @defaults, options )
      @$boxes   = $(".#{@settings.boxClass}").css(visibility: 'hidden')
      @$window  = $(window)

      @settings.offset = if @$window.width() > 769
        @settings.desktopOffset
      else if @$window.width() > 350
        @settings.mobileOffset

      @calculateBoxesPosition()

      @parallaxBrowser() if @settings.offset?

    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.jackInTheBox::defaults =
      boxClass:      'box'
      animateClass:  'animated'
      desktopOffset: 10
      mobileOffset:  300

  $.fn.jackInTheBox = ( options ) ->
    this.each ->
      if $( this ).data( 'jackInTheBox' ) is undefined
        plugin = new $.jackInTheBox( this, options )
        $( this).data( 'jackInTheBox', plugin )
