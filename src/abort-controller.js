'use strict'

// Electron has `AbortController` and should use that instead of custom.
if (typeof AbortController === 'function') {
  /* eslint-env browser */
  module.exports = require('./abort-controller.browser')
} else {
  module.exports = require('abort-controller')
}
