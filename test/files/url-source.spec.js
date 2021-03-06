'use strict'

/* eslint-env mocha */

const { expect } = require('aegir/utils/chai')
const all = require('it-all')
const urlSource = require('../../src/files/url-source')
const { Buffer } = require('buffer')

describe('url-source', function () {
  it('can get url content', async function () {
    const content = 'foo'
    const file = urlSource(`${process.env.ECHO_SERVER}/download?data=${content}`)

    expect(file).to.have.property('path', 'download')

    if (file && file.content) {
      await expect(all(file.content)).to.eventually.deep.equal([Buffer.from(content)])
    } else {
      throw new Error('empty response')
    }
  })
})
