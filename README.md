# WOW.js [![Build Status](https://secure.travis-ci.org/matthieua/WOW.png?branch=master)](http://travis-ci.org/matthieua/WOW)

Reveal CSS animation as you scroll down a page.
By default, you can use it to trigger [animate.css](https://github.com/daneden/animate.css) animations.
But you can easily change the settings to your favorite animation library.

Advantages:
- Smaller than other JavaScript parallax plugins, like Scrollorama (they do fantastic things, but can be too heavy for simple needs)
- Super simple to install, and works with animate.css, so if you already use it, that will be very fast to setup
- Fast execution and lightweight code: the browser will like it ;-)
- You can change the settings - [see below](#advanced-usage)

Follow [@mattaussaguel](//twitter.com/mattaussaguel) for updates as WOW evolves.

### [LIVE DEMO ➫](http://mynameismatthieu.com/WOW/)

## Live examples

- [Fliplingo](https://www.fliplingo.com)
- [Streamline Icons](http://www.streamlineicons.com)
- [NastyIcons](http://www.nastyicons.com)
- [Microsoft Stories](http://www.microsoft.com/en-us/news/stories/garage/)


## Version

1.0.1

## Documentation

It just take seconds to install and use WOW.js!
[Read the documentation ➫](http://mynameismatthieu.com/WOW/docs.html)

### Dependencies
- [animate.css](https://github.com/daneden/animate.css)

### Basic usage

- HTML

```html
  <section class="wow slideInLeft"></section>
  <section class="wow slideInRight"></section>
```

- JavaScript

```javascript
new WOW().init();
```

### Advanced usage

- HTML

```html
  <section class="wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s"></section>
  <section class="wow slideInRight" data-wow-offset="10"  data-wow-iteration="10"></section>
```

- JavaScript

```javascript
var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true        // act on asynchronously loaded content (default is true)
  }
);
wow.init();
```

### Asynchronous content support

In IE 10+, Chrome 18+ and Firefox 14+, animations will be automatically
triggered for any DOM nodes you add after calling `wow.init()`. If you do not
like that, you can disable this by setting `live` to `false`.

If you want to support older browsers (e.g. IE9+), as a fallback, you can call
the `wow.sync()` method after you have added new DOM elements to animate (but
`live` should still be set to `true`). Calling `wow.sync()` has no side
effects.


## Contribute

The library is written in CoffeeScript, please update `wow.coffee` file.

We use grunt to compile and minify the library:

Install needed libraries

```
npm install
```

Get the compilation running in the background

```
grunt watch
```

Enjoy!

## Bug tracker

If you find a bug, please report it [here on Github](https://github.com/matthieua/WOW/issues)!

## Developer

Developed by Matthieu Aussaguel, [mynameismatthieu.com](http://mynameismatthieu.com)

+ [@mattaussaguel](//twitter.com/mattaussaguel)
+ [Github Profile](//github.com/matthieua)

## Contributors

Thanks to everyone who has contributed to the project so far:

- Attila Oláh - [@attilaolah](//twitter.com/attilaolah) - [Github Profile](//github.com/attilaolah)
- [and many others](//github.com/matthieua/WOW/graphs/contributors)

Initiated and designed by [Vincent Le Moign](//www.webalys.com/), [@webalys](//twitter.com/webalys)
