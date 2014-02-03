#
# Name    : wow
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.0.8
# Repo    : https://github.com/matthieua/WOW
# Website : http://mynameismatthieu.com/wow
#

extend = (object, args...) ->
  result = object or {}
  for replacement in args
    for key, value of replacement or {}
      if typeof result[key] is "object"
        result[key] = extend(result[key], value)
      else
        result[key] ||= value
  result

class @WOW
  defaults:
    boxClass:     'wow'
    animateClass: 'animated'
    offset:       0
    duration:     '1s'
    delay:        '0s'
    iteration:    '1'

  constructor: (options = {}) ->
    @config       = extend(options, @defaults)
    @visibleCount = 0
    @element      = window.document.documentElement
    @boxes        = @element.getElementsByClassName(@config.boxClass)
    @scrolled     = true

  # set initial config
  init: ->
    if @boxes.length
      @applyStyle(@boxes)
      window.addEventListener('scroll', @scrollHandler, false)
      window.addEventListener('resize', @scrollHandler, false)
      @interval = setInterval @scrollCallback, 50

  # unbind the scroll event
  stop: ->
    window.removeEventListener('scroll', @scrollHandler, false)
    window.removeEventListener('resize', @scrollHandler, false)
    clearInterval @interval if @interval?

  # show box element
  show: (box) ->
    box.style.visibility = 'visible'
    box.className = "#{box.className} #{@config.animateClass}"

  applyStyle: ->
    for box in @boxes
      duration  = box.getAttribute('data-wow-duration')  || @config.duration
      delay     = box.getAttribute('data-wow-delay')     || @config.delay
      iteration = box.getAttribute('data-wow-iteration') || @config.iteration

      box.setAttribute 'style', @customStyle(duration, delay, iteration)

  customStyle: (duration, delay, iteration) ->
    visibility = "visibility: hidden; "

    duration = "-webkit-animation-duration: #{duration}; " +
                "-moz-animation-duration: #{duration};" +
                "animation-duration: #{duration}; "

    delay =     "-moz-animation-delay: #{delay}; " +
                "-webkit-animation-delay: #{delay}; " +
                "animation-delay: #{delay}; "

    iteration = "-moz-animation-iteration-count: #{iteration}; " +
                "-webkit-animation-iteration-count: #{iteration}; " +
                "animation-iteration-count: #{iteration}; "


    visibility + duration + delay + iteration

  # fast window.scroll callback
  scrollHandler: =>
    @scrolled = true

  scrollCallback: =>
    if @scrolled
      @scrolled = false
      for box, i in @boxes
        if box? and @isVisible(box)
          @show(box)
          @boxes[i] = null
          @visibleCount++
          @stop() if @boxes.length is @visibleCount


  # Calculate element offset top
  offsetTop: (element) ->
    top = element.offsetTop
    top += element.offsetTop while element = element.offsetParent
    top

  # check if box is visible
  isVisible: (box) ->
    offset     = box.getAttribute('data-wow-offset') || @config.offset
    viewTop    = window.pageYOffset
    viewBottom = viewTop + @element.clientHeight - offset
    top        = @offsetTop(box)
    bottom     = top + box.clientHeight

    top <= viewBottom and bottom >= viewTop
