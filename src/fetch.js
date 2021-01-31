'use strict'

const { isElectronMain, isReactNative } = require('./env')

if (isReactNative) {
  module.exports = require('react-native-fetch-api')
} else if (isElectronMain) {
  module.exports = require('electron-fetch')
} else {
// use window.fetch if it is available, fall back to node-fetch if not
  module.exports = require('native-fetch')
}
