# neat-log

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

A neat logger for command line tools, inspired by [Choo](https://github.com/yoshuawuyts/choo)! I've heard so much about how awesome front-end javascript has gotten, I wanted to bring some of that magic to command line applications. Used in the [Dat](https://github.com/datproject/dat) command line tool.

* Use tagged template literals to output to console log.
* Automatically diff template output with existing console (via [ansi-diff-stream](https://github.com/mafintosh/ansi-diff-stream)) (pretty much React for your terminal).
* Update console output in any order with event based output.
* Pretty neat!

## Example

Each neat logger has two components: a `view` and functions that modify state and emit events.

```js
var neatLog = require('neat-log')
var output = require('neat-log/output')

var neat = neatLog(view)
neat.use(countTheSeconds)

function view (state) {
  // This gets printed to the console! Wow. So neat.
  return output`
    Hello World!
    I've been running for ${state.seconds} second${state.seconds === 1 ? '' : 's'}.
  `
}

function countTheSeconds (state, bus) {
  state.seconds = 0
  setInterval(function () {
    state.seconds++
    bus.emit('render')
  }, 1000)
  bus.emit('render')
}
```

This example will print to the console: 

```
Hello world!
I've been running for 0 seconds.
```

And update every second!

More examples:

* [example folder](/examples)
* [count-files](https://github.com/joehand/count-files) - basic example with a single view and use function.
* [dat](https://github.com/datproject/dat) - full command line application with multiple views, components, etc.

## Install

```
npm install neat-log
```

## API

Heavily inspired by Choo! If you get confused here, check docs there because they are much nicer =).

### `var neat = neatLog(view(state), [opts])`

* `views` is a single function or array of functions that return string(s) to output to the console. `views` are passed the `state` as the first argument.
* `opts.logspeed` (default 250ms) - throttles how often output is rendered.
* `opts.quiet` - shhhh.... do not print anything
* `opts.debug` - print the whole view every time render is called.

Both `opts.quiet` and `opts.debug` are handled in `status-logger`.

### `neat.use(callback(state, bus))`

Use a `function (state, bus)` to change state and emit events via the bus. You can call `bus.emit()` to emit a new event and `bus.on()` to listen. Emitter is an instance of [nanobus](https://github.com/yoshuawuyts/nanobus/).

`bus` also has some special functions exposed:

#### `bus.render()`

Cause an immediate render (normally it'd be throttled). This is helpful to do before exiting.

#### `bus.clear()`

Clear all existing output. This is useful to do before throwing error messages:

```js
bus.clear()
console.error('my error')
process.exit(1)
```

### `neat.render()`

For an immediate render. Helpful outside of a use function.

### `neat.reset()`

Reset the ansi-diff-stream instance. Can help fix broken lines or other weird printing output. Happens automatically on terminal resize.

### `var output = require('neat-log/output')`

Get a tagger for your template literals to make them nicer. Removes spaces and stuff™.

## TODO

* Use `bus.on('*')` to make a cool debug option
* Be smarter about when lines break to multiple lines.
* Other neat things

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/neat-log.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/neat-log
[travis-image]: https://img.shields.io/travis/joehand/neat-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/joehand/neat-log
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
