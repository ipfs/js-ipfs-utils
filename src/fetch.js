'use strict'

const { isElectronMain, isNode } = require('./env')

if (isElectronMain) {
  module.exports = require('electron-fetch')
} else if (isNode) {
  module.exports = require('@web-std/fetch')
} else {
  module.exports = {
    default: fetch, Response, Request, Headers
  }
}
