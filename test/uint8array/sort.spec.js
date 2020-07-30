'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const sort = require('../../src/uint8array/sort')

describe('Uint8Array sort', () => {
  it('is stable', () => {
    const a = Uint8Array.from([0, 1, 2, 3])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect([a, b].sort(sort)).to.deep.equal([
      a,
      b
    ])
    expect([b, a].sort(sort)).to.deep.equal([
      b,
      a
    ])
  })

  it('sorts two Uint8Arrays', () => {
    const a = Uint8Array.from([0, 1, 2, 4])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect([a, b].sort(sort)).to.deep.equal([
      b,
      a
    ])
    expect([b, a].sort(sort)).to.deep.equal([
      b,
      a
    ])
  })

  it('sorts two Uint8Arrays with different lengths', () => {
    const a = Uint8Array.from([0, 1, 2, 3, 4])
    const b = Uint8Array.from([0, 1, 2, 3])

    expect([a, b].sort(sort)).to.deep.equal([
      b,
      a
    ])
    expect([b, a].sort(sort)).to.deep.equal([
      b,
      a
    ])
  })
})
