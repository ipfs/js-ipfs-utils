'use strict'

const { isElectronMain } = require('./env')

// use window.fetch if it is available, fall back to node-fetch if not
let fetch = 'native-fetch'

if (isElectronMain) {
  fetch = 'electron-fetch'
}

module.exports = require(fetch)
