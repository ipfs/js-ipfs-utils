'use strict'

const TextEncoder = require('../text-encoder')
const utf8Encoder = new TextEncoder('utf8')

/**
 * Returns a Uint8Array created from the passed utf8 encoded string
 *
 * @param {String} str
 * @returns {Uint8Array}
 */
function fromString (str) {
  return utf8Encoder.encode(str)
}

module.exports = fromString
