'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const supports = require('../src/supports')
const env = require('../src/env')

describe('supports', function () {
  it('supportsFileReader should return false in node', function () {
    if (env.isNode) {
      expect(supports.supportsFileReader).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsFileReader should return true in browser', function () {
    if (env.isBrowser) {
      expect(supports.supportsFileReader).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsFileReader should return true in Web Worker', function () {
    if (env.isWebWorker) {
      expect(supports.supportsFileReader).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsFileReader should return false in Electron main', function () {
    if (env.isElectron && !env.isElectronRenderer) {
      expect(supports.supportsFileReader).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsFileReader should return true in Electron renderer', function () {
    if (env.isElectronRenderer) {
      expect(supports.supportsFileReader).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsFileReader should return true in React Native', function () {
    if (env.isReactNative) {
      expect(supports.supportsFileReader).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTC should return false in node', function () {
    if (env.isNode) {
      expect(supports.supportsWebRTC).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTC should return true in browser', function () {
    if (env.isBrowser) {
      expect(supports.supportsWebRTC).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTC should return false in Web Worker', function () {
    if (env.isWebWorker) {
      expect(supports.supportsWebRTC).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTC should return false in Electron main', function () {
    if (env.isElectron && !env.isElectronRenderer) {
      expect(supports.supportsWebRTC).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTC should return true in Electron renderer', function () {
    if (env.isElectronRenderer) {
      expect(supports.supportsWebRTC).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTC should return false in React Native', function () {
    if (env.isReactNative) {
      expect(supports.supportsWebRTC).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTCDataChannels should return false in node', function () {
    if (env.isNode) {
      expect(supports.supportsWebRTCDataChannels).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTCDataChannels should return true in browser', function () {
    if (env.isBrowser) {
      expect(supports.supportsWebRTCDataChannels).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTCDataChannels should return false in Web Worker', function () {
    if (env.isWebWorker) {
      expect(supports.supportsWebRTCDataChannels).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTCDataChannels should return false in Electron main', function () {
    if (env.isElectron && !env.isElectronRenderer) {
      expect(supports.supportsWebRTCDataChannels).to.be.false()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTCDataChannels should return true in Electron renderer', function () {
    if (env.isElectronRenderer) {
      expect(supports.supportsWebRTCDataChannels).to.be.true()
    } else {
      this.skip()
    }
  })

  it('supportsWebRTCDataChannels should return true in React Native', function () {
    if (env.isReactNative) {
      expect(supports.supportsWebRTCDataChannels).to.be.false()
    } else {
      this.skip()
    }
  })
})
