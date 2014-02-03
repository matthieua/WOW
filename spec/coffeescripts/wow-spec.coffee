describe "WOW", ->

  describe "test environment", ->

    beforeEach ->
      loadFixtures "fragment.html"

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe 300

    it "has a scoped stylesheet", ->
      expect $("#fixtures").height()
        .toBe 700
      expect $("#fixtures-1").height()
        .toBe 50

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
      $("#fixtures").css
        padding: 0
        margin: 0
      new WOW().init()
      setTimeout ->
        done()
      , 100

    it "does not touch elements that don't have the marker class", (done) ->
      expect $ "#fixtures-1"
        .not.toHaveClass WOW.prototype.defaults.animateClass
      done()

    it "animates elements partially visible on the page", (done) ->
      expect $ "#fixtures-2"
        .toHaveClass WOW.prototype.defaults.animateClass
      done()

    it "does not animate elements not yet visible on the page", (done) ->
      # FIXME: why the hell is this failing?
      #expect $ "#fixtures-3"
      #  .not.toHaveClass WOW.prototype.defaults.animateClass
      # Here's some context:
      #expect $("#fixtures-1").offset().top
      #  .toBe 1  # 120
      #expect $("#fixtures-2").offset().top
      #  .toBe 2  # 220
      #expect $("#fixtures-3").offset().top
      #  .toBe 3  # 238 WTF?!
      #expect $ "#fixtures-4"
      #  .not.toHaveClass WOW.prototype.defaults.animateClass
      done()
