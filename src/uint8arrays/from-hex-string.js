'use strict'

/**
 * Turn a string of hex characters into a Uint8Array
 *
 * @param {String} str A hex string with two characters per digit
 * @returns {Uint8Array}
 */
function fromHexString (str) {
  if (str.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }

  str = str.toLowerCase()

  if (!str.match(/^[0-9a-f]+$/)) {
    throw new Error('Invalid hex string')
  }

  const parts = []

  for (let i = 0; i < str.length; i += 2) {
    parts.push(parseInt(`${str[i]}${str[i + 1]}`, 16))
  }

  return Uint8Array.from(parts)
}

module.exports = fromHexString
