import isElectronFn from 'is-electron'
const isEnvWithDom = typeof window === 'object' && typeof document === 'object' && document.nodeType === 9
const isElectron = isElectronFn()
const isBrowser = isEnvWithDom && !isElectron
const isElectronMain = isElectron && !isEnvWithDom
const isElectronRenderer = isElectron && isEnvWithDom
const isNode = typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node' && !isElectron
// @ts-ignore - we either ignore worker scope or dom scope
const isWebWorker = typeof importScripts === 'function' && typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope
const isTest = typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NODE_ENV === 'test'
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
export {
  isTest, isElectron, isElectronMain, isElectronRenderer, isNode,
  /**
   * Detects browser main thread  **NOT** web worker or service worker
   */
  isBrowser, isWebWorker, isEnvWithDom, isReactNative
}

}
