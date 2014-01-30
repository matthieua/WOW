# Jack In The Box [![Build Status](https://secure.travis-ci.org/matthieua/jackInTheBox.png?branch=master)](http://travis-ci.org/matthieua/jackInTheBox)

Reveal CSS animation as you scroll down a page.
By default, you should use it to trigger [animate.css](https://github.com/daneden/animate.css) animations.
But you can easily change the settings to your favorite animation library.

Advantages:
- Smaller than other javascript parallax plugins, like Scrollorama (they do fantastic things, but can be too much heavier for simple needs)
- Super simple to install, and works with animate.css, so if you already use it, that will be very fast to setup
- Fast execution and lightweight code: the browser will like it ;-)
- You can change the settings - See below
-

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
- [jQuery](https://github.com/jquery/jquery)

### HTML

```html
  <section class="box slideInLeft"></section>
  <section class="box slideInRight"></section>
```

### Basic usage

```javascript
$('body').jackInTheBox();
```

### Advanced usage

```javascript
$('body').jackInTheBox({
  boxClass:     'box',      // default
  animateClass: 'animated', // default
  offset:       0           // default
});
```

## Mobile devices

By default, we won't trigger the animations on mobile devices (Android, webOS, iPhone, iPad, iPod, BlackBerry, IEMobile, Opera Mini). For more details, please read [this page](https://developer.apple.com/library/safari/documentation/appleapplications/reference/SafariWebContent/HandlingEvents/HandlingEvents.html) before raising an issue / feature request related to events not firing on mobile devices.

## Bug tracker

If you find a bug, please rnaise it the [issue here](https://github.com/matthieua/jackInTheBox/issues) on Github!

## Developer

Developed by Matthieu Aussaguel, [mynameismatthieu.com](http://mynameismatthieu.com)

+ [@mattaussaguel](http://twitter.com/mattaussaguel)
+ [Github Profile](http://github.com/matthieua)

## Contributors

Thanks to everyone who has contributed to the project so far:

- Attila Oláh - [@attilaolah](http://twitter.com/attilaolah) - [Github Profile](http://github.com/attilaolah)
