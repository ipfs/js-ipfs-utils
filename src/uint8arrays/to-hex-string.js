'use strict'

/**
 * Turn a Uint8Array into a string of hex characters
 *
 * @param {Uint8Array} buf A Uint8Array to turn into a string
 * @returns {String}
 */
function toHexString (buf) {
  return Array.from(buf).map(i => i.toString(16).padStart(2, '0')).join('')
}

module.exports = toHexString
