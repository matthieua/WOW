describe "WOW", ->

  offsetTop      = 70
  winHeight      = 300
  offsetFixtures = 100

  offsetTop1 = offsetTop + offsetFixtures + 200*0
  offsetTop2 = offsetTop + offsetFixtures + 200*1
  offsetTop3 = offsetTop + offsetFixtures + 200*2
  offsetTop4 = offsetTop + offsetFixtures + 200*3

  describe "test environment", ->

    beforeEach ->
      loadFixtures "fragment.html"

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe winHeight

    it "has boxes set up for testing", ->
      # Check each box height
      expect $("#fixtures").height()
        .toBe 800
      expect $("#fixtures-1").height()
        .toBe 200
      expect $("#fixtures-2").height()
        .toBe 200
      expect $("#fixtures-3").height()
        .toBe 200
      expect $("#fixtures-4").height()
        .toBe 200
      # Check each box offset
      expect $("#fixtures-1").offset().top
        .toBe offsetTop1
      expect $("#fixtures-2").offset().top
        .toBe offsetTop2
      expect $("#fixtures-3").offset().top
        .toBe offsetTop3
      expect $("#fixtures-4").offset().top
        .toBe offsetTop4

  describe "library smoke test", ->

    it "exists", ->
      expect WOW
        .toBeDefined()

    it "has an 'init' method", ->
      expect new WOW().init
        .toBeDefined()

  describe "library behaviour", ->

    beforeEach (done) ->
      loadFixtures "fragment.html"
      new WOW().init()
      setTimeout ->
        done()
      , 100

    it "animates elements that are fully visible on the page", ->
      expect $ "#fixtures-1"
        .toHaveClass "animated"

    it "does not touch elements that don't have the marker class", ->
      expect $ "#fixtures-2"
        .not.toHaveClass "animated"

    it "does not animate elements not yet visible on the page", ->
      expect $ "#fixtures-3"
        .not.toHaveClass "animated"
      expect $ "#fixtures-4"
        .not.toHaveClass "animated"

    it "animates elements after scrolling down and they become visible", (done) ->
      window.scrollTo 0, offsetTop3-winHeight+150
      setTimeout ->
        expect $ "#fixtures-3"
          .toHaveClass "animated"
        expect $ "#fixtures-4"
          .not.toHaveClass "animated"
        window.scrollTo 0, offsetTop4-winHeight+150
        setTimeout ->
          expect $ "#fixtures-4"
            .toHaveClass "animated"
          done()
        , 100
      , 100
