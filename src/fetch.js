'use strict'

/**
 * @typedef {globalThis.Headers} Headers
 * @typedef {globalThis.Request} Request
 * @typedef {globalThis.Response} Response
 */

const { isElectronMain } = require('./env')

// use window.fetch if it is available, fall back to node-fetch if not
if (isElectronMain) {
  module.exports = require('electron-fetch')
} else {
  module.exports = require('native-fetch')
}
