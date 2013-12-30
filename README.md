# Jack In The Box [![Build Status](https://secure.travis-ci.org/matthieua/jackInTheBox.png?branch=master)](http://travis-ci.org/matthieua/jackInTheBox)

Reveal CSS animation as you scroll down a page.

## Version

0.0.3

## Website Url

coming soon...

## Documentation

Include [animate.css](https://github.com/daneden/animate.css)
Include [jQuery](https://github.com/jquery/jquery)
Include [jack-in-the-box.js](https://github.com/matthieua/jackInTheBox)

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
  offset:       10          // default
});
```

## Mobile devices

By default, we won't trigger the animations on mobile devices (Android, webOS, iPhone, iPad, iPod, BlackBerry, IEMobile, Opera Mini). For more details, please read [this page](https://developer.apple.com/library/safari/documentation/appleapplications/reference/SafariWebContent/HandlingEvents/HandlingEvents.html) before raising an issue / feature request related to events not firing on mobile devices.

## Bug tracker

If you find a bug, please raise it the [issue here](https://github.com/matthieua/jackInTheBox/issues) on Github!

## Developer

Developed by Matthieu Aussaguel, [mynameismatthieu.com](http://mynameismatthieu.com)

+ [@mattaussaguel](http://twitter.com/mattaussaguel)
+ [Github Profile](http://github.com/matthieua)
