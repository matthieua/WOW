describe "WOW", ->
  beforeEach ->
    loadFixtures "fragment.html"
    @$element = $ "#fixtures"

  describe "test environment", ->

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe 300

    it "has a scoped stylesheet", ->
      expect $("#test-1").height()
        .toBe 200

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

    it "does not touch elements that don't have the marker class", (done) ->
      expect $ "#test-1"
        .not.toHaveClass WOW.prototype.defaults.animateClass
      done()

    it "animates elements partially visible on the page", (done) ->
      expect $ "#test-2"
        .toHaveClass WOW.prototype.defaults.animateClass
      done()

    it "does not animate elements not yet visible on the page", (done) ->
      #expect $ "#test-3"
      #  .not.toHaveClass WOW.prototype.defaults.animateClass
      expect $ "#test-4"
        .not.toHaveClass WOW.prototype.defaults.animateClass
      done()
