'use strict'

/* eslint-env mocha */
const chai = require('chai')
const dirtyChai = require('dirty-chai')
const env = require('../src/env')

chai.use(dirtyChai)
const expect = chai.expect

describe('env', function () {
  it('isElectron should have the correct value in each env', function () {
    if (env.isElectronMain) {
      return expect(env.isElectron).to.be.true()
    }
    if (env.isElectronRenderer) {
      return expect(env.isElectron).to.be.true()
    }
    if (env.isBrowser) {
      return expect(env.isElectron).to.be.false()
    }
    if (env.isNode) {
      return expect(env.isElectron).to.be.false()
    }
    if (env.isWebWorker) {
      return expect(env.isElectron).to.be.false()
    }

    throw new Error('Should not fail')
  })

  it('isElectronMain should have the correct value in each env', function () {
    if (env.isElectronMain) {
      return expect(env.isElectronMain).to.be.true()
    }
    if (env.isElectronRenderer) {
      return expect(env.isElectronMain).to.be.false()
    }
    if (env.isBrowser) {
      return expect(env.isElectronMain).to.be.false()
    }
    if (env.isNode) {
      return expect(env.isElectronMain).to.be.false()
    }
    if (env.isWebWorker) {
      return expect(env.isElectronMain).to.be.false()
    }

    throw new Error('Should not fail')
  })

  it('isElectronRenderer should have the correct value in each env', function () {
    if (env.isElectronRenderer) {
      return expect(env.isElectronRenderer).to.be.true()
    }
    if (env.isElectronMain) {
      return expect(env.isElectronRenderer).to.be.false()
    }
    if (env.isBrowser) {
      return expect(env.isElectronRenderer).to.be.false()
    }
    if (env.isNode) {
      return expect(env.isElectronRenderer).to.be.false()
    }
    if (env.isWebWorker) {
      return expect(env.isElectronRenderer).to.be.false()
    }

    throw new Error('Should not fail')
  })

  it('isNode should have the correct value in each env', function () {
    if (env.isElectronMain) {
      return expect(env.isNode).to.be.false()
    }
    if (env.isElectronRenderer) {
      return expect(env.isNode).to.be.false()
    }
    if (env.isBrowser) {
      return expect(env.isNode).to.be.false()
    }
    if (env.isNode) {
      return expect(env.isNode).to.be.true()
    }
    if (env.isWebWorker) {
      return expect(env.isNode).to.be.false()
    }

    throw new Error('Should not fail')
  })

  it('isBrowser should have the correct value in each env', function () {
    if (env.isElectronMain) {
      return expect(env.isBrowser).to.be.false()
    }
    if (env.isElectronRenderer) {
      return expect(env.isBrowser).to.be.false()
    }
    if (env.isBrowser) {
      return expect(env.isBrowser).to.be.true()
    }
    if (env.isNode) {
      return expect(env.isBrowser).to.be.false()
    }
    if (env.isWebWorker) {
      return expect(env.isBrowser).to.be.false()
    }
    throw new Error('Should not fail')
  })

  it('isWebWorker should have the correct value in each env', function () {
    if (env.isElectronMain) {
      return expect(env.isWebWorker).to.be.false()
    }
    if (env.isElectronRenderer) {
      return expect(env.isWebWorker).to.be.false()
    }
    if (env.isBrowser) {
      return expect(env.isWebWorker).to.be.false()
    }
    if (env.isNode) {
      return expect(env.isWebWorker).to.be.false()
    }
    if (env.isWebWorker) {
      return expect(env.isWebWorker).to.be.true()
    }

    throw new Error('Should not fail')
  })
})
