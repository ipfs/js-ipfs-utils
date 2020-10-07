'use strict'

/* eslint-env browser */

// JSDOM has `XMLHttpRequest` but it does not have a `fetch` or `Response` so
// we workaround by pulling in node-fetch.
// See: https://github.com/jsdom/jsdom/issues/1724
exports.fetch = typeof fetch === 'function'
  ? fetch
  : require('node-fetch')

exports.Response = typeof Response === 'function'
  ? Response
  : require('node-fetch').Response

exports.Request = typeof Request === 'function'
  ? Request
  : require('node-fetch').Response

exports.Headers = typeof Headers === 'function'
  ? Headers
  : require('node-fetch').Headers
