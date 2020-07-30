'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const toHexString = require('../../src/uint8arrays/to-hex-string')

describe('Uint8Array toHexString', () => {
  it('creates a hex string from a Uint8Array', () => {
    const str = '00010203aabbcc'
    const arr = Uint8Array.from([0, 1, 2, 3, 170, 187, 204])

    expect(toHexString(arr)).to.deep.equal(str)
  })

  it('creates an empty hex string from a Uint8Array', () => {
    const str = ''
    const arr = new Uint8Array()

    expect(toHexString(arr)).to.deep.equal(str)
  })
})
