'use strict'

/* eslint-env mocha */

const { expect } = require('aegir/utils/chai')
const all = require('it-all')
const urlSource = require('../../src/files/url-source')
const last = require('it-last')
const { Buffer } = require('buffer')

describe('url-source', function () {
  it('can get url content', async function () {
    const content = 'foo'
    const file = await last(urlSource(`${process.env.ECHO_SERVER}/download?data=${content}`))

    // @ts-ignore
    await expect(all(file.content)).to.eventually.deep.equal([Buffer.from(content)])
  })
})
