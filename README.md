# neat-log

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

A neat logger for command line tools, inspired by [Choo](https://github.com/yoshuawuyts/choo)! I've heard so much about how awesome front-end javascript has gotten, I wanted to bring some of that magic to command line applications. Used in the [Dat](https://github.com/datproject/dat) command line tool.

* Use easy-to-read strings to create console outputs.
* Automatically diff template output with existing console (via [diffy](https://github.com/mafintosh/diffy)) (pretty much React for your terminal).
* Update console output in any order with event based output.
* Handle command line input via [neat-input](https://github.com/mafintosh/neat-input).
* Pretty neat!

### Example

Each neat logger has two components: a `view` and functions that modify state and emit events.

```js
var neatLog = require('neat-log')
var output = require('neat-log/output')

var neat = neatLog(view)
neat.use(countTheSeconds)

function view (state) {
  // This gets printed to the console! Wow. So neat.
  return output(`
    Hello World!
    I've been running for ${state.seconds} second${state.seconds === 1 ? '' : 's'}.
  `)
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

* [dat](https://github.com/datproject/dat) - full command line application with multiple views, components, etc.
* [cabal](https://github.com/cabal-club/cabal) - p2p chat application.
* [count-files](https://github.com/joehand/count-files) - simple example with a single view and use function.
* [basic examples](/examples)

### Components

Neat-log works great with components, just like Choo!

* [Task lister](https://github.com/joehand/neat-tasks): task runner with pretty output. Used in [dat-doctor](https://github.com/datproject/dat-doctor).
* [Spinner](https://github.com/joehand/neat-spinner): pretty spinner for the cli.
* [Text Blit](https://github.com/noffle/txt-blit): Draw lines of text onto other lines of text.

You can use string-based components too! Check out [diff components](https://github.com/mafintosh/diffy#components) for more.

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
* `opts.state` - pass in initial state

### `neat.use(callback(state, bus))`

Use a `function (state, bus)` to change state and emit events via the bus. You can call `bus.emit()` to emit a new event and `bus.on()` to listen. Emitter is an instance of [nanobus](https://github.com/yoshuawuyts/nanobus/).

`bus` also has some special functions/events:

#### `bus.render()`

Cause an immediate render (normally it'd be throttled). This is helpful to do before exiting.

#### `bus.on('exit')`

Handle exit from `process.on('SIGINT')`. Useful for rendering exit messages, etc. If no handler is provided, process will exit.

### `neat.render()`

For an immediate render. Helpful outside of a use function.

### `var output = require('neat-log/output')`

Get a function to make your template literals nicer. Removes spaces and stuff™.

# Licensing

This package is free to use for noncommercial purposes and for commercial purposes during a trial period under the terms of the [Prosperity Public License](./LICENSE).

Licenses for long-term commercial use are available via [licensezero.com](https://licensezero.com).

[![licensezero.com pricing](https://licensezero.com/projects/0153a099-6acd-4023-8a96-9d81d9969a58/badge.svg)](https://licensezero.com/projects/0153a099-6acd-4023-8a96-9d81d9969a58)


[npm-image]: https://img.shields.io/npm/v/neat-log.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/neat-log
[travis-image]: https://img.shields.io/travis/joehand/neat-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/joehand/neat-log
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

