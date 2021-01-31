'use strict'

const { isReactNative } = require('../env')

if (isReactNative) {
  module.exports = require('./fetch.react-native')
} else if (typeof XMLHttpRequest === 'function') {
  // Electron has `XMLHttpRequest` and should get the browser implementation
  // instead of node.
  module.exports = require('./fetch.browser')
} else {
  module.exports = require('./fetch.node')
}
