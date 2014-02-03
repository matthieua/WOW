describe "WOW", ->

  winHeight = 300

  describe "simple test environment", ->

    beforeEach ->
      loadFixtures "simple.html"

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe winHeight

    it "has boxes set up for testing", ->
      # Check each box height
      expect $("#simple").height()
        .toBe 800
      expect $("#simple-1").height()
        .toBe 200
      expect $("#simple-2").height()
        .toBe 200
      expect $("#simple-3").height()
        .toBe 200
      expect $("#simple-4").height()
        .toBe 200
      # Check each box offset
      offset = $("#simple").offset().top
      expect $("#simple-1").offset().top
        .toBe offset + 200*0
      expect $("#simple-2").offset().top
        .toBe offset + 200*1
      expect $("#simple-3").offset().top
        .toBe offset + 200*2
      expect $("#simple-4").offset().top
        .toBe offset + 200*3

  describe "library smoke test", ->

    it "exists", ->
      expect WOW
        .toBeDefined()

    it "has an 'init' method", ->
      expect new WOW().init
        .toBeDefined()

  describe "library behaviour", ->

    beforeEach (done) ->
      loadFixtures "simple.html"
      new WOW().init()
      setTimeout ->
        done()
      , 100

    it "animates elements that are fully visible on the page", ->
      expect $ "#simple-1"
        .toHaveClass "animated"

    it "does not touch elements that don't have the marker class", ->
      expect $ "#simple-2"
        .not.toHaveClass "animated"

    it "does not animate elements not yet visible on the page", ->
      expect $ "#simple-3"
        .not.toHaveClass "animated"
      expect $ "#simple-4"
        .not.toHaveClass "animated"

    it "animates elements after scrolling down and they become visible", (done) ->
      window.scrollTo 0, $("#simple-3").offset().top-winHeight+150
      setTimeout ->
        expect $ "#simple-3"
          .toHaveClass "animated"
        expect $ "#simple-4"
          .not.toHaveClass "animated"
        window.scrollTo 0, $("#simple-4").offset().top-winHeight+150
        setTimeout ->
          expect $ "#simple-4"
            .toHaveClass "animated"
          done()
        , 100
      , 100

  describe "custom test environment", ->

    beforeEach ->
      loadFixtures "custom.html"

    it "emulates window height", ->
      expect document.documentElement.clientHeight
        .toBe winHeight

    it "has boxes set up for testing", ->
      # Check each box height
      expect $("#custom").height()
        .toBe 800
      expect $("#custom-1").height()
        .toBe 200
      expect $("#custom-2").height()
        .toBe 200
      expect $("#custom-3").height()
        .toBe 200
      expect $("#custom-4").height()
        .toBe 200
      # Check each box offset
      offset = $("#custom").offset().top
      expect $("#custom-1").offset().top
        .toBe offset + 200*0
      expect $("#custom-2").offset().top
        .toBe offset + 200*1
      expect $("#custom-3").offset().top
        .toBe offset + 200*2
      expect $("#custom-4").offset().top
        .toBe offset + 200*3

  describe "library behaviour with custom settings", ->

    beforeEach (done) ->
      loadFixtures "custom.html"
      new WOW
        boxClass:     "block"
        animateClass: "fancy"
        offset:       10
      .init()
      setTimeout ->
        done()
      , 100

    it "does not touch elements that don't have the marker class", ->
      custom1 = $ "#custom-1"
      window.scrollTo 0, custom1.offset().top - 10
      expect custom1
        .not.toHaveClass "fancy"

    it "animates elements that are partially visible on the page", ->
      custom1 = $ "#custom-2"
      window.scrollTo 0, custom1.offset().top - winHeight + 10
      expect custom1
        .toHaveClass "fancy"

    it "does not animate elements not yet visible on the page", ->
      expect $ "#custom-3"
        .not.toHaveClass "fancy"
      expect $ "#custom-4"
        .not.toHaveClass "fancy"

    it "animates elements after scrolling down and they become visible", (done) ->
      window.scrollTo 0, $("#custom-3").offset().top - winHeight + 150
      setTimeout ->
        expect $ "#custom-3"
          .toHaveClass "fancy"
        expect $ "#custom-4"
          .not.toHaveClass "fancy"
        window.scrollTo 0, $("#custom-4").offset().top - winHeight + 150
        setTimeout ->
          expect $ "#custom-4"
            .toHaveClass "fancy"
          done()
        , 100
      , 100
