/**
 * @typedef {object} fetchImpl
 * @property {globalThis.fetch} fetchImpl.fetch
 * @property {globalThis.Request} fetchImpl.Request
 * @property {globalThis.Response} fetchImpl.Response
 * @property {globalThis.Headers} fetchImpl.Headers
 */

let implName = './fetch.node.js'

if (typeof XMLHttpRequest === 'function') {
  // Electron has `XMLHttpRequest` and should get the browser implementation
  // instead of node.
  implName = './fetch.browser.js'
}

/** @type {fetchImpl} */
const fetchImpl = await import(implName).then(m => m.default)

export const fetch = fetchImpl.fetch
export const Request = fetchImpl.Request
export const Response = fetchImpl.Response
export const Headers = fetchImpl.Headers

export default fetch
