#
# Name    : wow
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.1.6
# Repo    : https://github.com/matthieua/WOW
# Website : http://mynameismatthieu.com/wow
#


class Util
  extend: (custom, defaults) ->
    for key, value of custom
      defaults[key] = value if value?
    defaults

  isMobile: (agent) ->
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)

class @WOW
  defaults:
    boxClass:     'wow'
    animateClass: 'animated'
    offset:       0
    mobile:       true

  constructor: (options = {}) ->
    @scrolled = true
    @config   = @util().extend(options, @defaults)

  init: ->
    @element = window.document.documentElement
    if document.readyState in ["interactive", "complete"]
      @start()
    else
      document.addEventListener 'DOMContentLoaded', @start

  start: =>
    @boxes = @element.getElementsByClassName(@config.boxClass)
    if @boxes.length
      if @disabled()
        @resetStyle()
      else
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

    @customStyle(box, hidden, duration, delay, iteration)

  resetStyle: ->
    box.setAttribute('style', 'visibility: visible;') for box in @boxes

  customStyle: (box, hidden, duration, delay, iteration) ->
    if hidden
      box.style.visibility = 'hidden'
      box.style['-webkit-animation-name'] = 'none'
      box.style['animation-name'] = 'none'
    else
      box.style.visibility = 'visible'
      box.style['-webkit-animation-name'] = window.getComputedStyle(box).getPropertyValue('webkitAnimationName')
      box.style['animation-name'] = window.getComputedStyle(box).getPropertyValue('animationName')

    if duration
      box.style['-webkit-animation-duration'] = duration
      box.style['-moz-animation-duration'] = duration
      box.style['animation-duration'] = duration

    if delay
      box.style['-webkit-animation-delay'] = delay
      box.style['-moz-animation-delay'] = delay
      box.style['animation-delay'] = delay

    if iteration
      box.style['-webkit-animation-iteration-count'] = iteration
      box.style['-moz-animation-iteration-count'] = iteration
      box.style['animation-iteration-count'] = iteration

    box

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

  util: ->
    @_util ||= new Util()

  disabled: ->
    not @config.mobile and @util().isMobile(navigator.userAgent)
