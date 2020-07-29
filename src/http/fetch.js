'use strict'

// Electron has `XMLHttpRequest` and should get the browser implementation
// instead of node.
if (typeof XMLHttpRequest !== 'undefined') {
  module.exports = require('./fetch.browser')
} else {
  const fetch = require('node-fetch')
  exports.fetch = fetch
  exports.Request = fetch.Request
  exports.Headers = fetch.Headers
}
