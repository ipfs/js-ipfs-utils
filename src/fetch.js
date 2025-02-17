/**
 * @typedef {globalThis.Headers} Headers
 * @typedef {globalThis.Request} Request
 * @typedef {globalThis.Response} Response
 */

import { isElectronMain } from './env.js'
// use window.fetch if it is available, fall back to node-fetch if not
const fetchImpl = isElectronMain
  ? await import('electron-fetch')
  : {
      default: globalThis.fetch,
      Request: globalThis.Request,
      Response: globalThis.Response,
      Headers: globalThis.Headers
    }

export const fetch = fetchImpl.default
export const Request = fetchImpl.Request
/** @type {typeof globalThis.Response} */
// @ts-expect-error
export const Response = fetchImpl.Response
export const Headers = fetchImpl.Headers

export default fetch
