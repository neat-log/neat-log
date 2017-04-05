var logger = require('status-logger')
var nanobus = require('nanobus')
var throttle = require('lodash.throttle')
var consoleLog = require('console-log-level')

module.exports = neatLog

function neatLog (views, opts) {
  if (!views) throw new Error('views required')
  if (!Array.isArray(views)) views = [views]
  if (!opts) opts = {}

  var log
  var state = {}
  var logspeed = opts.logspeed || 250
  var bus = nanobus()

  if (opts.debug) {
    debugLog()
  } else {
    log = logger([], {debug: opts.verbose, quiet: opts.quiet })
    bus.on('render', throttle(render, logspeed))
  }

  return {
    render: render,
    use: register
  }

  function register (cb) {
    cb(state, bus)
  }

  function render () {
    if (opts.debug) return // TODO
    log.messages = []
    views.map(function (view) {
      return log.messages.push(view(state))
    })
    log.print()
  }

  function debugLog () {
    log = require('console-log-level')({
      prefix: function (level) {
        return new Date().toISOString()
      },
      level: 'debug'
    })

    bus.on('*', function (eventName, data) {
      if (eventName === 'render') return // TODO ?
      if (!/^log:\w{4,5}/.test(eventName)) {
        data = data || ''
        log.info(eventName, data)
      }
      var listeners = bus.listeners(eventName)
      if (!listeners.length) {
        log.error('No listeners for ' + eventName)
      }
    })

    bus.on('log:debug', function (msg, data) {
      data = data || ''
      log.debug(msg, data)
    })

    bus.on('log:info', function (msg, data) {
      data = data || ''
      log.info(msg, data)
    })

    bus.on('log:warn', function (msg, data) {
      data = data || ''
      log.warn(msg, data)
    })

    bus.on('log:error', function (msg, data) {
      data = data || ''
      log.error(msg, data)
    })

    bus.on('log:fatal', function (msg, data) {
      data = data || ''
      log.fatal(msg, data)
    })
  }
}
