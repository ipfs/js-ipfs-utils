'use strict'

const HTTP = require('../http')

/**
 * @param {string} url
 * @param {import("../types").HTTPOptions} [options]
 * @returns {{
    path: string;
    content?: AsyncIterable<Uint8Array>;
}}
 */
const urlSource = (url, options) => {
  return {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: readURLContent(url, options)
  }
}

const readURLContent = async function * (url, options) {
  const http = new HTTP()
  const response = await http.get(url, options)

  yield * response.iterator()
}

module.exports = urlSource
