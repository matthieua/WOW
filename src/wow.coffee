#
# Name    : wow
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.1.0
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

class @["WOW"]
  defaults:
    boxClass:     'wow'
    animateClass: 'animated'
    offset:       0

  constructor: (options = {}) ->
    @config       = extend(options, @defaults)
    @element      = window.document.documentElement
    @boxes        = @element.getElementsByClassName(@config.boxClass)
    @scrolled     = true

  # set initial config
  "init": ->
    if @boxes.length
      @applyStyle()
      window.addEventListener('scroll', @scrollHandler, false)
      window.addEventListener('resize', @scrollHandler, false)
      @interval = setInterval @scrollCallback, 50

  # unbind the scroll event
  stop: ->
    window.removeEventListener('scroll', @scrollHandler, false)
    window.removeEventListener('resize', @scrollHandler, false)
    clearInterval @interval if @interval?

  # show box element
  showBox: (box) ->
    box.style.visibility = 'visible'
    box.className = "#{box.className} #{@config.animateClass}"

  applyStyle: ->
    for box in @boxes
      duration  = box.getAttribute('data-wow-duration')
      delay     = box.getAttribute('data-wow-delay')
      iteration = box.getAttribute('data-wow-iteration')

      box.setAttribute 'style', @customStyle(duration, delay, iteration)

  customStyle: (duration, delay, iteration) ->
    style =  "visibility: hidden; "

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
          @showBox(box)
          continue
        box
      @stop() unless @boxes.length


  # Calculate element offset top
  getOffsetTop: (element) ->
    top = element.offsetTop
    top += element.offsetTop while element = element.offsetParent
    top

  # check if box is visible
  isVisible: (box) ->
    offset     = box.getAttribute('data-wow-offset') or @config.offset
    viewTop    = window.pageYOffset
    viewBottom = viewTop + @element.clientHeight - offset
    top        = @getOffsetTop(box)
    bottom     = top + box.clientHeight

    top <= viewBottom and bottom >= viewTop
