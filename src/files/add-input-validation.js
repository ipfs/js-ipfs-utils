'use strict'

const isBlob = require('is-blob')
const errcode = require('err-code')

const validateAddInput = (input) => {
  // AsyncIterator|Blob|Iterator
  const isPrimitive = (obj) => obj[Symbol.asyncIterator] || isBlob(obj) || obj[Symbol.iterator]

  // An object like { content?, path? }, where content isBufferOrStream and path isString
  const isContentObject = obj => {
    if (typeof obj !== 'object') return false
    // path is optional if content is present
    if (obj.content) return isPrimitive(obj.content)
    // path must be a non-empty string if no content
    return Boolean(obj.path) && typeof obj.path === 'string'
  }

  // An input atom: an async iterable, an iterable, a blob or a content object
  const isInput = obj => isPrimitive(obj) || isContentObject(obj)

  if (isInput(input) || (Array.isArray(input) && input.every(isInput))) {
    return true
  } else {
    throw errcode(new Error(`Input not supported. Expected AsyncIterator|Blob|Iterator|{path, content}|Iterator<{path, content}>|AsyncIterator<{path, content}> got ${typeof input}. Check the documentation for more info https://github.com/ipfs/interface-js-ipfs-core/blob/master/SPEC/FILES.md#add`), 'ERR_UNSUPPORTED_INPUT')
  }
}

module.exports = validateAddInput
