#
# Name    : jackInTheBox
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.0.3
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

    # Check if mobile device
    @mobileDevice = =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    # Check if box is visible
    @visible = ($box) =>
      viewTop    = @$window.scrollTop()
      viewBottom = viewTop + @$window.height() - @settings.offset
      top        = $box.offset().top
      bottom     = top + $box.height()

      top <= viewBottom and bottom >= viewTop

    # Show box is visible on scroll
    @scrollHandler = =>
      @$window.scroll =>
        @show()

    # show visible elements
    @show = =>
      @$boxes.each (index, box) =>
        $box = $(box)
        if (@visible($box))
          $box.css(visibility: 'visible').addClass @settings.animateClass

    # Set initial settings
    @init = ->
      @settings = $.extend( {}, @defaults, options )

      @$window  = $(window)
      @$boxes   = $(".#{@settings.boxClass}").css(visibility: 'hidden')

      @scrollHandler() if @$boxes.length

    # initialise the plugin
    @init() unless @mobileDevice()

    # make the plugin chainable
    this

  # default plugin settings
  $.jackInTheBox::defaults =
    boxClass:     'box'
    animateClass: 'animated'
    offset:       0

  $.fn.jackInTheBox = ( options ) ->
    this.each ->
      if $( this ).data( 'jackInTheBox' ) is undefined
        plugin = new $.jackInTheBox( this, options )
        $( this).data( 'jackInTheBox', plugin )
