
/* eslint-env mocha */
import { expect } from 'aegir/chai'
import * as env from '../src/env.js'

describe('env', function () {
  it('isElectron should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isElectron).to.be.true()
        break
      case 'electron-renderer':
        expect(env.isElectron).to.be.true()
        break
      case 'node':
        expect(env.isElectron).to.be.false()
        break
      case 'browser':
        expect(env.isElectron).to.be.false()
        break
      case 'webworker':
        expect(env.isElectron).to.be.false()
        break
      case 'react-native-android':
        expect(env.isElectron).to.be.false()
        break
      case 'react-native-ios':
        expect(env.isElectron).to.be.false()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })

  it('isElectronMain should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isElectronMain).to.be.true()
        break
      case 'electron-renderer':
        expect(env.isElectronMain).to.be.false()
        break
      case 'node':
        expect(env.isElectronMain).to.be.false()
        break
      case 'browser':
        expect(env.isElectronMain).to.be.false()
        break
      case 'webworker':
        expect(env.isElectronMain).to.be.false()
        break
      case 'react-native-android':
        expect(env.isElectronMain).to.be.false()
        break
      case 'react-native-ios':
        expect(env.isElectronMain).to.be.false()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })

  it('isElectronRenderer should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isElectronRenderer).to.be.false()
        break
      case 'electron-renderer':
        expect(env.isElectronRenderer).to.be.true()
        break
      case 'node':
        expect(env.isElectronRenderer).to.be.false()
        break
      case 'browser':
        expect(env.isElectronRenderer).to.be.false()
        break
      case 'webworker':
        expect(env.isElectronRenderer).to.be.false()
        break
      case 'react-native-android':
        expect(env.isElectronRenderer).to.be.false()
        break
      case 'react-native-ios':
        expect(env.isElectronRenderer).to.be.false()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })

  it('isNode should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isNode).to.be.false()
        break
      case 'electron-renderer':
        expect(env.isNode).to.be.false()
        break
      case 'node':
        expect(env.isNode).to.be.true()
        break
      case 'browser':
        expect(env.isNode).to.be.false()
        break
      case 'webworker':
        expect(env.isNode).to.be.false()
        break
      case 'react-native-android':
        expect(env.isNode).to.be.false()
        break
      case 'react-native-ios':
        expect(env.isNode).to.be.false()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })

  it('isBrowser should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isBrowser).to.be.false()
        break
      case 'electron-renderer':
        expect(env.isBrowser).to.be.false()
        break
      case 'node':
        expect(env.isBrowser).to.be.false()
        break
      case 'browser':
        expect(env.isBrowser).to.be.true()
        break
      case 'webworker':
        expect(env.isBrowser).to.be.false()
        break
      case 'react-native-android':
        expect(env.isBrowser).to.be.false()
        break
      case 'react-native-ios':
        expect(env.isBrowser).to.be.false()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })

  it('isWebWorker should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isWebWorker).to.be.false()
        break
      case 'electron-renderer':
        expect(env.isWebWorker).to.be.false()
        break
      case 'node':
        expect(env.isWebWorker).to.be.false()
        break
      case 'browser':
        expect(env.isWebWorker).to.be.false()
        break
      case 'webworker':
        expect(env.isWebWorker).to.be.true()
        break
      case 'react-native-android':
        expect(env.isWebWorker).to.be.false()
        break
      case 'react-native-ios':
        expect(env.isWebWorker).to.be.false()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })

  it('isReactNative should have the correct value in each env', function () {
    switch (process.env.AEGIR_RUNNER) {
      case 'electron-main':
        expect(env.isReactNative).to.be.false()
        break
      case 'electron-renderer':
        expect(env.isReactNative).to.be.false()
        break
      case 'node':
        expect(env.isReactNative).to.be.false()
        break
      case 'browser':
        expect(env.isReactNative).to.be.false()
        break
      case 'webworker':
        expect(env.isReactNative).to.be.false()
        break
      case 'react-native-android':
        expect(env.isReactNative).to.be.true()
        break
      case 'react-native-ios':
        expect(env.isReactNative).to.be.true()
        break
      default:
        expect.fail(`Could not detect env. Current env is ${process.env.AEGIR_RUNNER}`)
        break
    }
  })
})
