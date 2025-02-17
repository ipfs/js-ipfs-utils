const { polyfill: polyfillEncoding } = require('react-native-polyfill-globals/src/encoding')
const { polyfill: polyfillReadableStream } = require('react-native-polyfill-globals/src/readable-stream')
const { polyfill: polyfillURL } = require('react-native-polyfill-globals/src/url')

polyfillURL()
polyfillReadableStream()
polyfillEncoding()
