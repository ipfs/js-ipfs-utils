'use strict'

const { isElectronMain } = require('./env')

if (isElectronMain) {
  module.exports = require('@achingbrain/electron-fetch')
} else {
  // use window.fetch if it is available, fall back to node-fetch if not
  module.exports = require('native-fetch')
}
