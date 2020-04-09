'use strict'

const Http = require('../http')

module.exports = async function * urlSource (url, options) {
  options = options || {}
  const http = new Http()
  const response = await http.get(url)

  yield {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: response.iterator()
  }
}
