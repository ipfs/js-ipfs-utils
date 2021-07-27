'use strict'

class TimeoutError extends Error {
  /**
   * @param {string} message
   * @param {Response} [response]
   */
  constructor (message = 'Request timed out', response) {
    super(message)
    this.name = 'TimeoutError'
    /**
     * @type {Response}
     * @public
     */
    this.response = response
  }
}
exports.TimeoutError = TimeoutError

class AbortError extends Error {
  /**
   * @param {string} message
   * @param {Response} [response]
   */
  constructor (message = 'The operation was aborted.', response) {
    super(message)
    this.name = 'AbortError'
    /**
     * @type {Response}
     * @public
     */
    this.response = response
  }
}
exports.AbortError = AbortError

class HTTPError extends Error {
  /**
   * @param {Response} response
   */
  constructor (response) {
    super(response.statusText)
    this.name = 'HTTPError'
    /**
     * @type {Response}
     * @public
     */
    this.response = response
  }
}
exports.HTTPError = HTTPError
