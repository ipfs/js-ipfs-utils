'use strict'

const TextEncoder = require('../text-encoder')
const utf8Encoder = new TextEncoder('utf8')

function fromString (str) {
  return utf8Encoder.encode(str)
}

module.exports = fromString
