var neatLog = require('..')
var output = require('../output')
var chalk = require('chalk')
var prompt = require('prompt')

var log = neatLog(function view (state) {
  if (!state.results) return 'Hello to so neat prompt!'

  var results = state.results
  return output`
    Hello ${results.name}!
    You are ${results.havingFun ? 'definitely' : 'NOT'} having fun.

    This has been updating for ${state.seconds} seconds.

    Shh....
    ${chalk.dim(results.secret)}
  `
})

log.use(function (state, bus) {
  bus.emit('render') // render initial state
  prompt.message = ''
  prompt.colors = true
  prompt.start()
  prompt.get(
    [
      {
        name: 'name',
        required: true
      },
      {
        name: 'havingFun',
        description: 'Are you having fun? (t/f)',
        required: true,
        type: 'boolean'
      },
      {
        name: 'secret',
        description: 'Tell me a secret',
        hidden: true,
        replace: '=)'
      }
    ], function (err, results) {
    if (err) return console.log(err.message)
    state.results = results
    bus.clear()
    doThings()
  })

  function doThings () {
    state.seconds = 0
    setInterval(function () {
      state.seconds++
      bus.emit('render')
    }, 1000)
    bus.emit('render')
  }
})
