#
# Name    : jackInTheBox
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.0.6
# Repo    : https://github.com/matthieua/jackInTheBox
# Website : -
#

((window) ->
  class JackInTheBox
    config:
      boxClass:     'box'
      animateClass: 'animated'
      offset:       0

    constructor: ->
      @visibleCount    = 0
      @documentElement = window.document.documentElement
      @boxes           = Array.prototype.slice.call(@documentElement.querySelectorAll(".#{@config.boxClass}"))


    # set initial config
    start: ->
      if @boxes.length
        @hideAll()
        window.addEventListener('scroll', @scrollHandler, false) if @boxes.length
        @scrollHandler()

    # unbind the scroll event
    stop: ->
      window.removeEventListener('scroll', @scrollHandler, false)

    # show box element
    show: (box) ->
      box.style.visibility = 'visible'
      box.className = "#{box.className} #{@config.animateClass}"

    hideAll: ->
      for i in [0..(@boxes.length - 1)]
        @boxes[i].style.visibility = 'hidden'

    # fast window.scroll callback
    scrollHandler: =>
      if @boxes.length
        for i in [0..(@boxes.length - 1)]
         if @boxes[i]? and @isVisible(@boxes[i])
            @show(@boxes[i])
            @boxes[i] = null
            @visibleCount++
            @stop() if @boxes.length is @visibleCount

    # check if box is visible
    isVisible: (box) ->
      viewTop    = window.pageYOffset
      viewBottom = viewTop + @documentElement.clientHeight - @config.offset
      top        = box.offsetTop
      bottom     = top + box.clientHeight

      top <= viewBottom and bottom >= viewTop

  jack = new JackInTheBox()
  jack.start()

) window
