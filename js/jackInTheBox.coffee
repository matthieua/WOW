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

      window.parallaxBrowser = ->
        slides = $(".box").fadeTo(0, 0)
        $(window).scroll (d, h) ->
          slides.each (i) ->
            a = $(this).offset().top + $(this).height() - 10
            b = $(window).scrollTop() + $(window).height()
            if a < b
              $(this).show()
              $(this).addClass "animated"



      window.parallaxMobile = ->
        slides = $(".slide").children().fadeTo(0, 0)
        $(window).scroll (d, h) ->
          slides.each (i) ->
            a = $(this).offset().top + $(this).height() - 300
            b = $(window).scrollTop() + $(window).height()
            if a < b
              $(this).show()
              $(this).addClass "animated"

      currentURL = document.URL
      if $(window).width() > 769
        parallaxBrowser()
      else parallaxMobile()  if $(window).width() > 350

    # initialise the plugin
    @init()

    # make the plugin chainable
    this

  # default plugin settings
  $.jackInTheBox::defaults =
      boxClass:     'box'
      animateClass: 'animated'
      offset:       5

  $.fn.jackInTheBox = ( options ) ->
    this.each ->
      if $( this ).data( 'jackInTheBox' ) is undefined
        plugin = new $.jackInTheBox( this, options )
        $( this).data( 'jackInTheBox', plugin )
