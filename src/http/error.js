export class TimeoutError extends Error {
  constructor (message = 'Request timed out') {
    super(message)
    this.name = 'TimeoutError'
  }
}

export class AbortError extends Error {
  constructor (message = 'The operation was aborted.') {
    super(message)
    this.name = 'AbortError'
  }
}

export class HTTPError extends Error {
  /**
   * @param {Response} response
   */
  constructor (response) {
    super(response.statusText)
    this.name = 'HTTPError'
    this.response = response
  }
}
