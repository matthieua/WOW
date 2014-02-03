describe "WOW", ->

  offset = 70 # top offset

  describe "test environment", ->

    beforeEach ->
      loadFixtures "fragment.html"

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe 300

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
        .toBe offset + 100 + 200*0
      expect $("#fixtures-2").offset().top
        .toBe offset + 100 + 200*1
      expect $("#fixtures-3").offset().top
        .toBe offset + 100 + 200*2
      expect $("#fixtures-4").offset().top
        .toBe offset + 100 + 200*3

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

    it "animates elements that are fully visible on the page", (done) ->
      expect $ "#fixtures-1"
        .toHaveClass "animated"
      done()

    it "does not touch elements that don't have the marker class", (done) ->
      expect $ "#fixtures-2"
        .not.toHaveClass "animated"
      done()

    it "does not animate elements not yet visible on the page", (done) ->
      expect $ "#fixtures-3"
        .not.toHaveClass "animated"
      expect $ "#fixtures-4"
        .not.toHaveClass "animated"
      done()
