#
# Name    : wow
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.1.3
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

  constructor: (options = {}) ->
    @config   = extend(options, @defaults)
    @scrolled = true

  # set initial config
  init: ->
    if document.readyState is "complete"
      @start()
    else
      document.addEventListener 'DOMContentLoaded', @start

  start: =>
    @element = window.document.documentElement
    @boxes   = @element.getElementsByClassName(@config.boxClass)

    if @boxes.length
      @applyStyle(box, true) for box in @boxes
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
    @applyStyle(box)
    box.className = "#{box.className} #{@config.animateClass}"

  applyStyle: (box, hidden) ->
    duration  = box.getAttribute('data-wow-duration')
    delay     = box.getAttribute('data-wow-delay')
    iteration = box.getAttribute('data-wow-iteration')

    box.setAttribute 'style', @customStyle(hidden, duration, delay, iteration)

  customStyle: (hidden, duration, delay, iteration) ->
    style =  if hidden then "
      visibility: hidden;

      -webkit-animation-name: none;
         -moz-animation-name: none;
              animation-name: none;
    " else "
      visibility: visible;
    "

    style += "
      -webkit-animation-duration: #{duration};
         -moz-animation-duration: #{duration};
              animation-duration: #{duration};
    " if duration

    style += "
      -webkit-animation-delay: #{delay};
         -moz-animation-delay: #{delay};
              animation-delay: #{delay};
    " if delay

    style += "
      -webkit-animation-iteration-count: #{iteration};
         -moz-animation-iteration-count: #{iteration};
              animation-iteration-count: #{iteration};
      " if iteration

    style

  # fast window.scroll callback
  scrollHandler: =>
    @scrolled = true

  scrollCallback: =>
    if @scrolled
      @scrolled = false
      @boxes = for box in @boxes when box
        if @isVisible(box)
          @show(box)
          continue
        box
      @stop() unless @boxes.length


  # Calculate element offset top
  offsetTop: (element) ->
    top = element.offsetTop
    top += element.offsetTop while element = element.offsetParent
    top

  # check if box is visible
  isVisible: (box) ->
    offset     = box.getAttribute('data-wow-offset') or @config.offset
    viewTop    = window.pageYOffset
    viewBottom = viewTop + @element.clientHeight - offset
    top        = @offsetTop(box)
    bottom     = top + box.clientHeight

    top <= viewBottom and bottom >= viewTop
