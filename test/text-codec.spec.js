'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const TextEncoder = require('../src/text-encoder')
const TextDecoder = require('../src/text-decoder')

describe('text encode/decode', () => {
  const data = Uint8Array.from([
    104,
    101,
    108,
    108,
    111,
    32,
    119,
    111,
    114,
    108,
    100
  ])

  it('can encode text', () => {
    const bytes = new TextEncoder().encode('hello world')
    expect(bytes).to.be.deep.equal(data)
  })

  it('can decode text', () => {
    const text = new TextDecoder().decode(data)
    expect(text).to.be.equal('hello world')
  })
})
