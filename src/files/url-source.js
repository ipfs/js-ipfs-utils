'use strict'

const Http = require('../http')

const urlSource = (url, options) => {
  return {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: readURLContent(url, options)
  }
}

const readURLContent = async function * (url, options) {
  const http = new Http()
  const response = await http.get(url, options)
  yield * response.iterator()
}

module.exports = urlSource
