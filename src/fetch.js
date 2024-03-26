/**
 * @typedef {globalThis.Headers} Headers
 * @typedef {globalThis.Request} Request
 * @typedef {globalThis.Response} Response
 */

import { isElectronMain } from './env.js'
// use window.fetch if it is available, fall back to node-fetch if not
let impl = 'native-fetch'

if (isElectronMain) {
  impl = 'electron-fetch'
}

const fetchImpl = await import(impl)

export const fetch = fetchImpl.fetch
export const Request = fetchImpl.Request
export const Response = fetchImpl.Response
export const Headers = fetchImpl.Headers

export default fetch
