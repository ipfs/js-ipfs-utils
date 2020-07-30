'use strict'

/**
 * Returns a new Uint8Array created by concatenating the passed Arrays
 *
 * @param {Array<Array|TypedArray>} arrs
 * @param {Number} length
 * @returns {Uint8Array}
 */
function concat (arrs, length) {
  if (!length) {
    length = arrs.reduce((acc, curr) => {
      if (ArrayBuffer.isView(curr)) {
        return acc + curr.byteLength
      } else if (Array.isArray(curr)) {
        return acc + curr.length
      }

      throw new Error('Invalid input passed to concat, should be an Array or ArrayBuffer view')
    }, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  arrs.forEach(arr => {
    output.set(arr, offset)

    if (ArrayBuffer.isView(arr)) {
      offset += arr.byteLength
    } else if (Array.isArray(arr)) {
      offset += arr.length
    } else {
      throw new Error('Invalid input passed to concat, should be an Array or ArrayBuffer view')
    }
  })

  return output
}

module.exports = concat
