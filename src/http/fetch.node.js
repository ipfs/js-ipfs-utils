// @ts-check
'use strict'

/** @type {import('node-fetch') & typeof fetch} */
// @ts-ignore
const nodeFetch = require('native-fetch')
const toStream = require('it-to-stream')
const { Buffer } = require('buffer')
const { Request, Response, Headers } = nodeFetch
/**
 * @typedef {RequestInit & ExtraFetchOptions} FetchOptions
 *
 * @typedef {import('stream').Readable} Readable
 * @typedef {Object} LoadProgress
 * @property {number} total
 * @property {number} loaded
 * @property {boolean} lengthComputable
 * @typedef {Object} ExtraFetchOptions
 * @property {number} [timeout]
 * @property {URLSearchParams} [searchParams]
 * @property {function(LoadProgress):void} [onUploadProgress]
 * @property {function(LoadProgress):void} [onDownloadProgress]
 * @property {string} [overrideMimeType]
 * @returns {Promise<Response>}
 */

/**
 * @param {string|URL} url
 * @param {FetchOptions} [options]
 * @returns {Promise<Response>}
 */
const fetch = (url, options = {}) =>
  nodeFetch(url, withUploadProgress(options))

exports.fetch = fetch
exports.Request = Request
exports.Headers = Headers

/**
 * Takes fetch options and wraps request body to track uploda progress if
 * `onUploadProgress` is supplied. Otherwise returns options as is.
 * @param {FetchOptions} options
 * @returns {FetchOptions}
 */
const withUploadProgress = (options) => {
  const { onUploadProgress } = options
  if (onUploadProgress) {
    return {
      ...options,
      // @ts-ignore
      body: bodyWithUploadProgress(options, onUploadProgress)
    }
  } else {
    return options
  }
}

/**
 * Takes request `body` and `onUploadProgress` handler and returns wrapped body
 * that as consumed will report progress to suppled `onUploadProgress` handler.
 * @param {FetchOptions} init
 * @param {function(LoadProgress):void} onUploadProgress
 * @returns {Readable}
 */
const bodyWithUploadProgress = (init, onUploadProgress) => {
  // @ts-ignore - node-fetch is typed poorly
  const { body } = new Response(init.body, init)
  // @ts-ignore - Unlike standard Response, node-fetch `body` has a differnt
  // type see: see https://github.com/node-fetch/node-fetch/blob/master/src/body.js
  const source = iterateBodyWithProgress(body, onUploadProgress)
  return toStream.readable(source)
}

/**
 * Takes body from native-fetch response as body and `onUploadProgress` handler
 * and returns async iterable that emits body chunks and emits
 * `onUploadProgress`.
 * @param {Buffer|null|Readable} body
 * @param {function(LoadProgress):void} onUploadProgress
 * @returns {AsyncIterable<Buffer>}
 */
const iterateBodyWithProgress = async function * (body, onUploadProgress) {
  /** @type {Buffer|null|Readable} */
  if (body == null) {
    onUploadProgress({ total: 0, loaded: 0, lengthComputable: true })
  } else if (Buffer.isBuffer(body)) {
    const total = body.byteLength
    const lengthComputable = true
    yield body
    onUploadProgress({ total, loaded: total, lengthComputable })
  } else {
    const total = 0
    const lengthComputable = false
    let loaded = 0
    for await (const chunk of body) {
      loaded += chunk.byteLength
      yield chunk
      onUploadProgress({ total, loaded, lengthComputable })
    }
  }
}
