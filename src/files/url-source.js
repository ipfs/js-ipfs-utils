'use strict'

const HTTP = require('../http')
/**
 * @param {string} url
 * @param {import("../types").HTTPOptions} [options]
 * @returns {AsyncIterable<{
    path: string;
    content?: AsyncIterable<Uint8Array>;
}>}
 */
async function * urlSource (url, options) {
  const http = new HTTP()
  const response = await http.get(url, options)

  yield {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: response.iterator()
  }
}

module.exports = urlSource
