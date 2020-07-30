'use strict'

function concat (arrs, length) {
  if (!length) {
    length = arrs.reduce((acc, curr) => acc + curr.byteLength, 0)
  }

  const output = new Uint8Array(length)
  let offset = 0

  arrs.forEach(arr => {
    output.set(arr, offset)
    offset += arr.byteLength
  })

  return output
}

module.exports = concat
