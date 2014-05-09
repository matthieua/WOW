#
# Name    : wow
# Author  : Matthieu Aussaguel, http://mynameismatthieu.com/, @mattaussaguel
# Version : 0.1.7
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

    @animate => @customStyle(box, hidden, duration, delay, iteration)

  animate: (->
    if 'requestAnimationFrame' of window
      (callback) ->
        window.requestAnimationFrame callback
    else
      (callback) ->
        callback()
  )()

  resetStyle: ->
    box.setAttribute('style', 'visibility: visible;') for box in @boxes

  customStyle: (box, hidden, duration, delay, iteration) ->
    box.style.visibility = if hidden then 'hidden' else 'visible'
    box.dataset.wowAnimationName = @animationName(box) if hidden

    @vendorSet box.style, animationDuration: duration if duration
    @vendorSet box.style, animationDelay: delay if delay
    @vendorSet box.style, animationIterationCount: iteration if iteration
    @vendorSet box.style, animationName: if hidden then 'none' else box.dataset.wowAnimationName

    box

  vendors: ["moz", "webkit"]
  vendorSet: (elem, properties) ->
    for name, value of properties
      elem["#{name}"] = value
      elem["#{vendor}#{name.charAt(0).toUpperCase()}#{name.substr 1}"] = value for vendor in @vendors
  vendorCSS: (elem, property) ->
    style = window.getComputedStyle(elem)
    result = style.getPropertyCSSValue(property)
    result = result or style.getPropertyCSSValue("-#{vendor}-#{property}") for vendor in @vendors
    result

  animationName: (box) ->
    try
      @vendorCSS(box, 'animation-name')?.cssText
    catch # Opera, fall back to plain property value
      window.getComputedStyle(box).getPropertyValue('animation-name') or 'none'

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
