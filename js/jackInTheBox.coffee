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

    @init = ->
      @settings = $.extend( {}, @defaults, options )
      @$boxes = $(".#{@settings.boxClass}").css(visibility: 'hidden')

      window.parallaxBrowser = =>
        $(window).scroll (d, h) =>
          @$boxes.each (index, box) =>
            $box     = $(box)
            elementY = $box.offset().top + $box.height() - @settings.offset
            scrollY  = $(window).scrollTop() + $(window).height()

            if elementY < scrollY
              $box.css(visibility: 'visible').addClass @settings.animateClass

      # window.parallaxMobile = ->
      #   $boxes = $(".slide").children().fadeTo(0, 0)
      #   $(window).scroll (d, h) ->
      #     $boxes.each (i) ->
      #       a = $(this).offset().top + $(this).height() - 300
      #       b = $(window).scrollTop() + $(window).height()
      #       if a < b
      #         $(this).show()
      #         $(this).addClass "animated"

      currentURL = document.URL
      parallaxBrowser()
      # if $(window).width() > 769
      # else parallaxMobile()  if $(window).width() > 350

    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.jackInTheBox::defaults =
      boxClass:     'box'
      animateClass: 'animated'
      offset:       10

  $.fn.jackInTheBox = ( options ) ->
    this.each ->
      if $( this ).data( 'jackInTheBox' ) is undefined
        plugin = new $.jackInTheBox( this, options )
        $( this).data( 'jackInTheBox', plugin )
