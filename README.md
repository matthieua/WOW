# WOW [![Build Status](https://secure.travis-ci.org/matthieua/WOW.png?branch=master)](http://travis-ci.org/matthieua/WOW)

Reveal CSS animation as you scroll down a page.
By default, you should use it to trigger [animate.css](https://github.com/daneden/animate.css) animations.
But you can easily change the settings to your favorite animation library.

Advantages:
- Smaller than other javascript parallax plugins, like Scrollorama (they do fantastic things, but can be too much heavier for simple needs)
- Super simple to install, and works with animate.css, so if you already use it, that will be very fast to setup
- Fast execution and lightweight code: the browser will like it ;-)
- You can change the settings - [see below](#advanced-usage)

## Live examples

- [Fliplingo](https://www.fliplingo.com)
- [NastyIcons](http://www.nastyicons.com)


## Version

0.0.6

## Are you smarter than us?

So far we deactivated it by default on mobile devices (see below why...). You know a solution to fix this problem? contribute or contact us!

## Documentation

### Dependencies
- [animate.css](https://github.com/daneden/animate.css)

### HTML

```html
  <section class="box slideInLeft"></section>
  <section class="box slideInRight"></section>
```

### Basic usage

```javascript
new WOW().init();
```

### Advanced usage

```javascript
wow = new WOW(
  {
    boxClass:     'box',
    animateClass: 'animated',
    offset:       100
  }
)
WOW.init();
```

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

If you find a bug, please rnaise it the [issue here](https://github.com/matthieua/WOW/issues) on Github!

## Developer

Developed by Matthieu Aussaguel, [mynameismatthieu.com](http://mynameismatthieu.com)

+ [@mattaussaguel](http://twitter.com/mattaussaguel)
+ [Github Profile](http://github.com/matthieua)

## Contributors

Thanks to everyone who has contributed to the project so far:

- Attila Oláh - [@attilaolah](http://twitter.com/attilaolah) - [Github Profile](http://github.com/attilaolah)
