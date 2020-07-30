'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const fromString = require('../../src/uint8arrays/from-string')
const TextEncoder = require('../../src/text-encoder')

describe('Uint8Array fromString', () => {
  it('creates a Uint8Array from a string', () => {
    const str = 'hello world'
    const arr = new TextEncoder('utf8').encode(str)

    expect(fromString(str)).to.deep.equal(arr)
  })
})
