'use strict'

const multibase = require('multibase')
const TextDecoder = require('../text-decoder')
const utf8Decoder = new TextDecoder('utf8')

function toString (buf, encoding = 'utf8') {
  if (encoding !== 'utf8') {
    buf = multibase.encode(encoding, buf).subarray(1)
  }

  return utf8Decoder.decode(buf)
}

module.exports = toString
