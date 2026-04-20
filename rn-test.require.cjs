'use strict'

const { polyfill: polyfillReadableStream } = require('react-native-polyfill-globals/src/readable-stream.js')
const { polyfill: polyfillURL } = require('react-native-polyfill-globals/src/url.js')
const { polyfill: polyfillEncoding } = require('react-native-polyfill-globals/src/encoding.js')

polyfillURL()
polyfillReadableStream()
polyfillEncoding()
