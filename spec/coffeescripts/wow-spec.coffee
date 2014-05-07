describe 'WOW', ->

  # Time to wait after each scroll event:
  # (This should be >= the interval used by the plugin.)
  timeout = 100

  # Height of the PhantomJS window:
  winHeight = 300

  describe 'simple test environment', ->

    beforeEach ->
      loadFixtures 'simple.html'

    it 'emulates window height', ->
      expect document.documentElement.clientHeight
        .toBe winHeight

    it 'has boxes set up for testing', ->
      boxHeight = 200
      boxCount = $ '#simple'
        .children().length
      # Check each box height
      expect $('#simple').height()
        .toBe boxHeight*boxCount
      expect $('#simple-1').height()
        .toBe boxHeight
      expect $('#simple-2').height()
        .toBe boxHeight
      expect $('#simple-3').height()
        .toBe boxHeight
      expect $('#simple-4').height()
        .toBe boxHeight
      expect $('#simple-5').height()
        .toBe boxHeight
      # Check each box offset
      offset = $('#simple').offset().top
      expect $('#simple-1').offset().top
        .toBe offset + boxHeight*0
      expect $('#simple-2').offset().top
        .toBe offset + boxHeight*1
      expect $('#simple-3').offset().top
        .toBe offset + boxHeight*2
      expect $('#simple-4').offset().top
        .toBe offset + boxHeight*3
      expect $('#simple-5').offset().top
        .toBe offset + boxHeight*4
      style = $('#simple-5')[0].style
      expect style.background
        .toBe 'yellow'
      expect style.color
        .toBe 'red'

  describe 'library smoke test', ->

    it 'exists', ->
      expect WOW
        .toBeDefined()

    it "has an 'init' method", ->
      expect new WOW().init
        .toBeDefined()

  describe 'library behaviour', ->

    beforeEach (done) ->
      loadFixtures 'simple.html'
      new WOW().init()
      setTimeout ->
        done()
      , timeout

    it 'animates elements that are fully visible on the page', ->
      expect $ '#simple-1'
        .toHaveClass 'animated'
      expect $('#simple-1').css 'visibility'
        .toBe 'visible'

    it "does not touch elements that don't have the marker class", ->
      expect $ '#simple-2'
        .not.toHaveClass 'animated'
      expect $('#simple-2').css 'visibility'
        .toBe 'visible'

    it 'does not animate elements not yet visible on the page', ->
      expect $ '#simple-3'
        .not.toHaveClass 'animated'
      expect $('#simple-3').css 'visibility'
        .not.toBe 'visible'
      expect $ '#simple-4'
        .not.toHaveClass 'animated'
      expect $('#simple-4').css 'visibility'
        .not.toBe 'visible'

    it 'animates elements after scrolling down and they become visible', (done) ->
      # Scroll down so that 150px of #simple-3 becomes visible.
      window.scrollTo 0, $('#simple-3').offset().top - winHeight + 150
      setTimeout ->
        expect $ '#simple-3'
          .toHaveClass 'animated'
        expect $('#simple-3').css 'visibility'
          .toBe 'visible'
        expect $ '#simple-4'
          .not.toHaveClass 'animated'
        expect $('#simple-4').css 'visibility'
          .not.toBe 'visible'
        # Scroll down so that 150px of #simple-4 becomes visible.
        window.scrollTo 0, $('#simple-4').offset().top - winHeight + 150
        setTimeout ->
          expect $ '#simple-4'
            .toHaveClass 'animated'
          expect $('#simple-4').css 'visibility'
            .toBe 'visible'
          done()
        , timeout
      , timeout

    it 'does not tamper with the style attribute', (done) ->
      # Scroll down so that 150px of #simple-4 becomes visible.
      window.scrollTo 0, $('#simple-5').offset().top - winHeight + 150
      setTimeout ->
        expect $ '#simple-5'
          .toHaveClass 'animated'
        expect $('#simple-5').css 'visibility'
          .toBe 'visible'
        expect $('#simple-5')[0].style.background
          .toBe 'yellow'
        expect $('#simple-5')[0].style.color
          .toBe 'red'
        done()
      , timeout

  describe 'custom test environment', ->

    beforeEach ->
      loadFixtures 'custom.html'

    it 'emulates window height', ->
      expect document.documentElement.clientHeight
        .toBe winHeight

    it 'has boxes set up for testing', ->
      # Check each box height
      expect $('#custom').height()
        .toBe 800
      expect $('#custom-1').height()
        .toBe 200
      expect $('#custom-2').height()
        .toBe 200
      expect $('#custom-3').height()
        .toBe 200
      expect $('#custom-4').height()
        .toBe 200
      # Check each box offset
      offset = $('#custom').offset().top
      expect $('#custom-1').offset().top
        .toBe offset + 200*0
      expect $('#custom-2').offset().top
        .toBe offset + 200*1
      expect $('#custom-3').offset().top
        .toBe offset + 200*2
      expect $('#custom-4').offset().top
        .toBe offset + 200*3

  describe 'library behaviour with custom settings', ->

    beforeEach (done) ->
      loadFixtures 'custom.html'
      new WOW
        boxClass:     'block'
        animateClass: 'fancy'
        offset:       10
      .init()
      setTimeout ->
        done()
      , timeout

    it "does not touch elements that don't have the marker class", (done) ->
      # Scroll down so that 15px of #custom-1 becomes visible.
      window.scrollTo 0, $('#custom-1').offset().top - winHeight + 15
      setTimeout ->
        expect $ '#custom-1'
          .not.toHaveClass 'fancy'
        done()
      , timeout

    it "animates elements that are partially visible on the page based on the 'offset' config", (done) ->
      setTimeout ->
        # Scroll down so that 5px of #custom-2 becomes visible.
        window.scrollTo 0, $('#custom-2').offset().top - winHeight + 5
        expect $ '#custom-2'
          .not.toHaveClass 'fancy'
        window.scrollTo 0, $('#custom-2').offset().top - winHeight + 15
        setTimeout ->
          # Scroll down so that 15px of #custom-2 becomes visible.
          expect $ '#custom-2'
            .toHaveClass 'fancy'
          expect $('#custom-2').css 'visibility'
            .toBe 'visible'
          done()
        , timeout
      , timeout

    it 'does not animate elements not yet visible on the page', ->
      expect $ '#custom-3'
        .not.toHaveClass 'fancy'
      expect $ '#custom-4'
        .not.toHaveClass 'fancy'

    it 'animates elements after scrolling down and they become visible', (done) ->
      # Scroll down so that 150px of #custom-3 becomes visible.
      window.scrollTo 0, $('#custom-3').offset().top - winHeight + 150
      setTimeout ->
        expect $ '#custom-3'
          .toHaveClass 'fancy'
        expect $('#custom-3').css 'visibility'
          .toBe 'visible'
        expect $('#custom-3')[0].style.webkitAnimationIterationCount
          .toBe '2'
        expect $ '#custom-4'
          .not.toHaveClass 'fancy'
        # Scroll down so that 150px of #custom-4 becomes visible.
        window.scrollTo 0, $('#custom-4').offset().top - winHeight + 150
        setTimeout ->
          expect $ '#custom-4'
            .toHaveClass 'fancy'
          expect $('#custom-4').css 'visibility'
            .toBe 'visible'
          expect $('#custom-4')[0].style.webkitAnimationIterationCount
            .toBe 'infinite'
          expect $('#custom-4')[0].style.webkitAnimationDuration
            .toBe '2s'
          expect $('#custom-4')[0].style.webkitAnimationDelay
            .toBe '1s'
          done()
        , timeout
      , timeout
