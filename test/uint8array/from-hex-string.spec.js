'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const fromHexString = require('../../src/uint8arrays/from-hex-string')

describe('Uint8Array fromHexString', () => {
  it('creates a Uint8Array from a hex string', () => {
    const str = '00010203aabbcc'
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(fromHexString(str)).to.deep.equal(arr)
  })

  it('rejects an invalid hex string', () => {
    const str = '00010203aabbc'

    expect(() => fromHexString(str)).to.throw(/Invalid hex string/)
  })

  it('rejects a hex string with invalid characters', () => {
    const str = '00010203aabbci'

    expect(() => fromHexString(str)).to.throw(/Invalid hex string/)
  })
})
