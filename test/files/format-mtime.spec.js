'use strict'

/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const formatMtime = require('../../src/files/format-mtime')

chai.use(dirtyChai)
const expect = chai.expect

describe('format-mtime', function () {
  it('formats mtime', function () {
    expect(formatMtime({ secs: 100, nsecs: 0 })).to.equal('Jan 1, 1970, 1:01:40 AM GMT+1')
  })

  it('formats empty mtime', function () {
    expect(formatMtime()).to.equal('Jan 1, 1970, 1:00:00 AM GMT+1')
  })
})
