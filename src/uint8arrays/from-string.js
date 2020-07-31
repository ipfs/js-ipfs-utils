'use strict'

const multibase = require('multibase')
const { names } = require('multibase/src/constants')
const TextEncoder = require('../text-encoder')
const utf8Encoder = new TextEncoder()

/**
 * Create a `Uint8Array` from the passed string
 *
 * @param {String} string
 * @param {String} [encoding=utf8] utf8, base16, base64, base64urlpad, etc
 * @returns {Uint8Array}
 * @see {@link https://www.npmjs.com/package/multibase|multibase} for supported encodings other than `utf8`
 */
function fromString (string, encoding = 'utf8') {
  if (encoding === 'utf8' || encoding === 'utf-8') {
    return utf8Encoder.encode(string)
  }

  const base = names[encoding]

  if (!base) {
    throw new Error('Unknown base')
  }

  string = `${base.code}${string}`

  return Uint8Array.from(multibase.decode(string))
}

module.exports = fromString
