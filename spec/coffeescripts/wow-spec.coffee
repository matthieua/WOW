describe "WOW", ->
  beforeEach ->
    loadFixtures "fragment.html"
    @$element = $ "#fixtures"

  describe "test environment", ->

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe 300

  describe "library smoke test", ->

    it "exists", ->
      expect WOW
        .toBeDefined()

    it "has an 'init' method", ->
      expect new WOW().init
        .toBeDefined()

  describe "library behaviour", ->

    beforeEach (done) ->
      new WOW().init()
      setTimeout ->
        done()
      , 100

    it "does not touch elements that don't have a 'box' class", (done) ->
      expect $("#test-1")[0]
        .not.toHaveClass "animated"
      done()

    it "animates elements already visible on the page", (done) ->
      expect $("#test-2")[0]
        .toHaveClass "animated"
      done()
