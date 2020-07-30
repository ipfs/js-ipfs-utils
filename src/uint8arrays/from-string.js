'use strict'

const multibase = require('multibase')
const { names } = require('multibase/src/constants')
const TextEncoder = require('../text-encoder')
const utf8Encoder = new TextEncoder('utf8')

function fromString (string, encoding = 'utf8') {
  if (encoding !== 'utf8') {
    const base = names[encoding]

    if (!base) {
      throw new Error('Unknown base')
    }

    string = `${base.code}${string}`

    return Uint8Array.from(multibase.decode(string))
  }

  return utf8Encoder.encode(string)
}

module.exports = fromString
