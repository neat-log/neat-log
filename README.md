# neat-log

A neat logger for command line tools, inspired by Choo!

## Install

```
npm install neat-log
```

## Usage

```js
var neatLog = require('neat-log')
var output = require('neat-log/output')

var log = neatLog(mainView)
log.use(trackSeconds)
log.render() // manually render to initial state

function mainView (state) {
  if (!state.seconds) state.seconds = 0
  return output`
    Hello World!
    I've been running for ${state.seconds} seconds.
  `
}

function trackSeconds (state, bus) {
  setInterval(function () {
    state.seconds++
    bus.emit('render')
  }, 1000)
}
```

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[MIT](LICENSE.md)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/neat-log.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/neat-log
[travis-image]: https://img.shields.io/travis/joehand/neat-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/joehand/neat-log
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
