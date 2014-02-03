describe "WOW", ->
  beforeEach ->
    loadFixtures "fragment.html"
    @$element = $ "#fixtures"

  describe "test environment", ->

    it "should emulate a window of height 300", ->
      expect document.documentElement.clientHeight
        .toBe 300

  describe "library behavior", ->

    it "exists", ->
      expect WOW
        .toBeDefined()

    it "has an 'init' method", ->
      expect new WOW().init
        .toBeDefined()

    xit "animates elements already visible on the page", ->
      new WOW().init()
      #expect $("#test-1")[0]
      #  .toHaveClass "animated"
      expect $("#test-2")[0]
        .toHaveClass "animated"
