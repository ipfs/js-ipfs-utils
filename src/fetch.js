'use strict'

/**
 * @typedef {globalThis.Headers} Headers
 * @typedef {globalThis.Request} Request
 * @typedef {globalThis.Response} Response
 */

module.exports = {
    Headers: globalThis.Headers,
    Request: globalThis.Request,
    Response: globalThis.Response,
    default: globalThis.fetch
}
