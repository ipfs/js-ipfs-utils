'use strict'

const errCode = require('err-code')
const { Buffer } = require('buffer')

/*
 * Transform one of:
 *
 * ```
 * Buffer|ArrayBuffer|TypedArray
 * Blob|File
 * { path, content: Blob }
 * { path, content: String }
 * { path, content: Iterable<Number> }
 * { path, content: Iterable<Buffer> }
 * { path, content: Iterable<Iterable<Number>> }
 * { path, content: AsyncIterable<Iterable<Number>> }
 * String
 * Iterable<Number>
 * Iterable<Buffer>
 * Iterable<Blob>
 * Iterable<{ path, content: Buffer }>
 * Iterable<{ path, content: Blob }>
 * Iterable<{ path, content: Iterable<Number> }>
 * Iterable<{ path, content: AsyncIterable<Buffer> }>
 * AsyncIterable<Buffer>
 * AsyncIterable<{ path, content: Buffer }>
 * AsyncIterable<{ path, content: Blob }>
 * AsyncIterable<{ path, content: Iterable<Buffer> }>
 * AsyncIterable<{ path, content: AsyncIterable<Buffer> }>
 * ```
 * Into:
 *
 * ```
 * AsyncIterable<{ path, content: AsyncIterable<Buffer> }>
 * ```
 *
 * @param input Object
 * @return AsyncInterable<{ path, content: AsyncIterable<Buffer> }>
 */
module.exports = function normaliseInput (input) {
  // must give us something
  if (input === null || input === undefined) {
    throw errCode(new Error(`Unexpected input: ${input}`, 'ERR_UNEXPECTED_INPUT'))
  }

  // { path, content: ? }
  if (isFileObject(input)) {
    return (async function * () { // eslint-disable-line require-await
      yield toFileObject(input)
    })()
  }

  // String
  if (typeof input === 'string' || input instanceof String) {
    return (async function * () { // eslint-disable-line require-await
      yield toFileObject(input)
    })()
  }

  // Buffer|ArrayBuffer|TypedArray
  // Blob|File
  if (isBytes(input) || isBloby(input)) {
    return (async function * () { // eslint-disable-line require-await
      yield toFileObject(input)
    })()
  }

  // Iterable<?>
  if (input[Symbol.iterator]) {
    // Iterable<Number>
    if (!isNaN(input[0])) {
      return (async function * () { // eslint-disable-line require-await
        yield toFileObject([input])
      })()
    }

    // Iterable<Buffer>
    // Iterable<Blob>
    return (async function * () { // eslint-disable-line require-await
      for (const chunk of input) {
        yield toFileObject(chunk)
      }
    })()
  }

  // AsyncIterable<?>
  if (input[Symbol.asyncIterator]) {
    return (async function * () { // eslint-disable-line require-await
      for await (const chunk of input) {
        yield toFileObject(chunk)
      }
    })()
  }

  throw errCode(new Error('Unexpected input: ' + typeof input), 'ERR_UNEXPECTED_INPUT')
}

function toFileObject (input) {
  return {
    path: input.path || '',
    content: toAsyncIterable(input.content || input)
  }
}

function toAsyncIterable (input) {
  // Buffer|ArrayBuffer|TypedArray|array of bytes
  if (isBytes(input)) {
    return (async function * () { // eslint-disable-line require-await
      yield toBuffer(input)
    })()
  }

  if (typeof input === 'string' || input instanceof String) {
    return (async function * () { // eslint-disable-line require-await
      yield toBuffer(input)
    })()
  }

  // Blob|File
  if (isBloby(input)) {
    return blobToAsyncGenerator(input)
  }

  // Iterator<?>
  if (input[Symbol.iterator]) {
    if (!isNaN(input[0])) {
      return (async function * () { // eslint-disable-line require-await
        yield toBuffer(input)
      })()
    }

    return (async function * () { // eslint-disable-line require-await
      for (const chunk of input) {
        yield toBuffer(chunk)
      }
    })()
  }

  // AsyncIterable<?>
  if (input[Symbol.asyncIterator]) {
    return (async function * () {
      for await (const chunk of input) {
        yield toBuffer(chunk)
      }
    })()
  }

  throw errCode(new Error(`Unexpected input: ${input}`, 'ERR_UNEXPECTED_INPUT'))
}

function toBuffer (chunk) {
  if (isBytes(chunk)) {
    return chunk
  }

  if (typeof chunk === 'string' || chunk instanceof String) {
    return Buffer.from(chunk)
  }

  if (Array.isArray(chunk)) {
    return Buffer.from(chunk)
  }

  throw new Error('Unexpected input: ' + typeof chunk)
}

function isBytes (obj) {
  return Buffer.isBuffer(obj) || ArrayBuffer.isView(obj) || obj instanceof ArrayBuffer
}

function isBloby (obj) {
  return typeof Blob !== 'undefined' && obj instanceof global.Blob
}

// An object with a path or content property
function isFileObject (obj) {
  return typeof obj === 'object' && (obj.path || obj.content)
}

function blobToAsyncGenerator (blob) {
  if (typeof blob.stream === 'function') {
    // firefox < 69 does not support blob.stream()
    return streamBlob(blob)
  }

  return readBlob(blob)
}

async function * streamBlob (blob) {
  const reader = blob.stream().getReader()

  while (true) {
    const result = await reader.read()

    if (result.done) {
      return
    }

    yield result.value
  }
}

async function * readBlob (blob, options) {
  options = options || {}

  const reader = new global.FileReader()
  const chunkSize = options.chunkSize || 1024 * 1024
  let offset = options.offset || 0

  const getNextChunk = () => new Promise((resolve, reject) => {
    reader.onloadend = e => {
      const data = e.target.result
      resolve(data.byteLength === 0 ? null : data)
    }
    reader.onerror = reject

    const end = offset + chunkSize
    const slice = blob.slice(offset, end)
    reader.readAsArrayBuffer(slice)
    offset = end
  })

  while (true) {
    const data = await getNextChunk()

    if (data == null) {
      return
    }

    yield Buffer.from(data)
  }
}
