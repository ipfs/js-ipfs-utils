'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const concat = require('../../src/uint8arrays/concat')

describe('Uint8Array concat', () => {
  it('concats two Uint8Arrays', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([4, 5, 6, 7])
    const c = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])

    expect(concat([a, b])).to.deep.equal(c)
  })

  it('concats two Uint8Arrays with a length', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([4, 5, 6, 7])
    const c = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])

    expect(concat([a, b], 8)).to.deep.equal(c)
  })

  it('concats mixed Uint8Arrays and Arrays', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = [4, 5, 6, 7]
    const c = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])

    expect(concat([a, b])).to.deep.equal(c)
  })

  it('concats mixed Uint8Arrays and Arrays with a length', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = [4, 5, 6, 7]
    const c = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7])

    expect(concat([a, b], 8)).to.deep.equal(c)
  })

  it('throws when passed non ArrayBuffer views/Arrays', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = 'Hello world'

    expect(() => concat([a, b])).to.throw(/Invalid input/)
  })

  it('throws when passed non ArrayBuffer views/Arrays with a length', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = 'Hello world'

    expect(() => concat([a, b], 100)).to.throw(/Invalid input/)
  })
})
