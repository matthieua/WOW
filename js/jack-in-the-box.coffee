#
# Name    : jackInTheBox
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.0.6
# Repo    : https://github.com/matthieua/jackInTheBox
# Website : -
#

jQuery ->
  $.jackInTheBox = ( element, options ) ->
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

    # Check if box is visible
    @visible = ($box) =>
      viewTop    = @$window.scrollTop()
      viewBottom = viewTop + @$window.height() - @settings.offset
      top        = $box.offset().top
      bottom     = top + $box.height()

      top <= viewBottom and bottom >= viewTop

    # Scroll state
    scrolled = false

    # Fast window.scroll callback
    @scrollHandler = =>
      scrolled = true

    # Show box if visible on scroll
    @scrollCallback = =>
      return unless scrolled
      scrolled = false
      @show()

    # show visible elements
    @show = =>
      @$boxes = @$boxes.map (index, box) =>
        $box = $(box)
        if (@visible($box))
          $box.css(visibility: 'visible').addClass @settings.animateClass
          null
        else $box

    # Set initial settings
    @init = ->
      @settings = $.extend( {}, @defaults, options )

      @$window  = $(window)
      @$boxes   = $(".#{@settings.boxClass}").css(visibility: 'hidden')

      if @$boxes.length
        $(window).on "scroll", @scrollHandler
        setInterval @scrollCallback
        @show()

    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.jackInTheBox::defaults =
    boxClass:     'box'
    animateClass: 'animated'
    offset:       0
    interval:     50

  $.fn.jackInTheBox = ( options ) ->
    this.each ->
      if $( this ).data( 'jackInTheBox' ) is undefined
        plugin = new $.jackInTheBox( this, options )
        $( this ).data( 'jackInTheBox', plugin )
