// @ts-nocheck
'use strict'
// @ts-ignore
const { Headers: rnHeaders, Request: rnRequest, Response: rnResponse, fetch: rnFetch } = require('react-native-fetch-api')

/** @type {import('electron-fetch').default} */
const fetch = rnFetch
/** @type {import('electron-fetch').Headers} */
const Headers = rnHeaders
/** @type {import('electron-fetch').Request} */
const Request = rnRequest
/** @type {import('electron-fetch').Response} */
const Response = rnResponse

module.exports = {
  Headers,
  Request,
  Response,
  default: fetch
}
