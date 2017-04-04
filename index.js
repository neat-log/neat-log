var logger = require('status-logger')
var nanobus = require('nanobus')

module.exports = neatLog

function neatLog (views, opts) {
  if (!views) throw new Error('views required')
  if (!Array.isArray(views)) views = [views]
  if (!opts) opts = {}

  var state = {}
  var output = []
  var log = logger([], opts)
  var bus = nanobus()
  bus.on('render', render)

  return {
    render: render,
    use: register
  }

  function register (cb) {
    cb(state, bus)
  }

  function render () {
    log.messages = []
    views.map(function (view) {
      return log.messages.push(view(state))
    })
    log.print()
  }
}

