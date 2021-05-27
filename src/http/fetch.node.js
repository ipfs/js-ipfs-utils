'use strict'
const { Request, Response, Headers, default: nativeFetch } = require('../fetch')
// @ts-ignore
const toStream = require('it-to-stream')
const { Buffer } = require('buffer')
/**
 * @typedef {import('stream').Readable} NodeReadableStream
 *
 * @typedef {import('../types').FetchOptions} FetchOptions
 * @typedef {import('../types').ProgressFn} ProgressFn
 */

/**
 * @param {string|Request} url
 * @param {FetchOptions} [options]
 * @returns {Promise<Response>}
 */
const fetch = (url, options = {}) =>
  // @ts-ignore
  nativeFetch(url, withUploadProgress(options))

/**
 * Takes fetch options and wraps request body to track upload progress if
 * `onUploadProgress` is supplied. Otherwise returns options as is.
 *
 * @param {FetchOptions} options
 * @returns {FetchOptions}
 */
const withUploadProgress = (options) => {
  const { onUploadProgress, body } = options
  if (onUploadProgress && body) {
    const source = iterateBodyWithProgress(normalizeBody(body), onUploadProgress)
    return {
      ...options,
      body: toStream.readable(source)
    }
  } else {
    return options
  }
}

/**
 * @param {BodyInit | NodeReadableStream} input
 */
const normalizeBody = (input) => {
  if (input instanceof ArrayBuffer) {
    return Buffer.from(input)
  } else if (ArrayBuffer.isView(input)) {
    return Buffer.from(input.buffer, input.byteOffset, input.byteLength)
  } else if (typeof input === 'string') {
    return Buffer.from(input)
  }
  return input
}

/**
 * Takes body from native-fetch response as body and `onUploadProgress` handler
 * and returns async iterable that emits body chunks and emits
 * `onUploadProgress`.
 *
 * @param {Blob | FormData | ReadableStream<Uint8Array> | NodeReadableStream | Buffer} body
 * @param {ProgressFn} onUploadProgress
 * @returns {AsyncIterable<Uint8Array>}
 */
const iterateBodyWithProgress = async function * (body, onUploadProgress) {
  if (body == null) {
    onUploadProgress({ total: 0, loaded: 0, lengthComputable: true })
  } else if (Buffer.isBuffer(body)) {
    const total = body.byteLength
    const lengthComputable = true
    yield body
    onUploadProgress({ total, loaded: total, lengthComputable })
  } else {
    const progress = estimateTotal(body)

    let loaded = 0
    // @ts-ignore - Response does not take node stream
    for await (const chunk of new Response(body).body) {
      loaded += chunk.byteLength
      yield chunk
      onUploadProgress({ ...progress, loaded })
    }
  }
}

/**
 * @param {any} value
 */
const estimateTotal = (value) => {
  if (typeof value.size === 'number') {
    return { total: value.size, lengthComputable: true }
  } else {
    return { total: 0, lengthComputable: false }
  }
}

module.exports = {
  fetch,
  Request,
  Headers
}
