'use strict'

const { isElectronMain, isNode } = require('./env')

if (isElectronMain) {
  module.exports = require('electron-fetch')
} else if (isNode) {
  module.exports = require('@web-std/fetch')
} else {
  const lib = { default: fetch, Response, Request, Headers }
  module.exports = lib
}
