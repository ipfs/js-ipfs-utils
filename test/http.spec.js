'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const HTTP = require('../src/http')
// @ts-ignore
const toStream = require('it-to-stream')
const delay = require('delay')
const { AbortController } = require('native-abort-controller')
const drain = require('it-drain')
const all = require('it-all')
const { isBrowser, isWebWorker } = require('../src/env')
const { Buffer } = require('buffer')
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayEquals = require('uint8arrays/equals')
const uint8ArrayConcat = require('uint8arrays/concat')

const ECHO_SERVER = process.env.ECHO_SERVER || ''

describe('http', function () {
  it('makes a GET request', async function () {
    const req = await HTTP.get(`${ECHO_SERVER}/echo/query?test=one`)
    const rsp = await req.json()
    expect(rsp).to.be.deep.eq({ test: 'one' })
  })

  it('makes a GET request with redirect', async function () {
    const req = await HTTP.get(`${ECHO_SERVER}/redirect?to=${encodeURI(`${ECHO_SERVER}/echo/query?test=one`)}`)
    const rsp = await req.json()
    expect(rsp).to.be.deep.eq({ test: 'one' })
  })

  it('makes a GET request with a really short timeout', function () {
    return expect(HTTP.get(`${ECHO_SERVER}/redirect?to=${encodeURI(`${ECHO_SERVER}/echo/query?test=one`)}`, {
      timeout: 1
    })).to.eventually.be.rejectedWith().instanceOf(HTTP.TimeoutError)
  })

  it('respects headers', async function () {
    const req = await HTTP.post(`${ECHO_SERVER}/echo/headers`, {
      headers: {
        foo: 'bar'
      }
    })
    const rsp = await req.json()
    expect(rsp).to.have.property('foo', 'bar')
  })

  it('respects constructor headers', async function () {
    const http = new HTTP({
      headers: {
        bar: 'baz'
      }
    })
    const req = await http.post(`${ECHO_SERVER}/echo/headers`)
    const rsp = await req.json()
    expect(rsp).to.have.property('bar', 'baz')
  })

  it('makes a JSON request', async () => {
    const req = await HTTP.post(`${ECHO_SERVER}/echo`, {
      json: {
        test: 2
      }
    })

    const out = await req.text()
    expect(out).to.be.eq('{"test":2}')
  })

  it('makes a DELETE request', async () => {
    const req = await HTTP.delete(`${ECHO_SERVER}/echo`, {
      json: {
        test: 2
      }
    })

    const out = await req.text()
    expect(out).to.be.eq('{"test":2}')
  })

  it('allow async aborting', async function () {
    const controller = new AbortController()
    const res = HTTP.get(ECHO_SERVER, {
      signal: controller.signal
    })
    controller.abort()

    await expect(res).to.eventually.be.rejectedWith(/aborted/)
  })

  it('parses the response as ndjson', async function () {
    const res = await HTTP.post(`${ECHO_SERVER}/echo`, {
      body: '{}\n{}'
    })

    const entities = await all(res.ndjson())

    expect(entities).to.deep.equal([{}, {}])
  })

  it('parses the response as an async iterable', async function () {
    const res = await HTTP.post('echo', {
      base: ECHO_SERVER,
      body: 'hello world'
    })

    const entities = await all(res.iterator())

    expect(entities).to.deep.equal([Buffer.from('hello world')])
  })

  it.skip('should handle errors in streaming bodies', async function () {
    if (isBrowser || isWebWorker) {
      // streaming bodies not supported by browsers
      return this.skip()
    }

    const err = new Error('Should be caught')
    const body = (async function * () {
      yield Buffer.from('{}\n')

      await delay(100)

      throw err
    }())

    const res = await HTTP.post(ECHO_SERVER, {
      body: toStream.readable(body)
    })

    await expect(drain(res.ndjson())).to.eventually.be.rejectedWith(/aborted/)
  })

  it.skip('should handle errors in streaming bodies when a signal is passed', async function () {
    if (isBrowser || isWebWorker) {
      // streaming bodies not supported by browsers
      return this.skip()
    }

    const controller = new AbortController()
    const err = new Error('Should be caught')
    const body = (async function * () {
      yield Buffer.from('{}\n')

      await delay(100)

      throw err
    }())
    const res = await HTTP.post(ECHO_SERVER, {
      body: toStream.readable(body),
      signal: controller.signal
    })

    await expect(drain(res.ndjson())).to.eventually.be.rejectedWith(/aborted/)
  })

  it('progress events', async () => {
    let upload = 0
    const body = new Uint8Array(1000000 / 2)
    const request = await HTTP.post(`${ECHO_SERVER}/echo`, {
      body,
      onUploadProgress: (progress) => {
        expect(progress).to.have.property('lengthComputable').to.be.a('boolean')
        expect(progress).to.have.property('total', body.byteLength)
        expect(progress).to.have.property('loaded').that.is.greaterThan(0)
        upload += 1
      }
    })

    const out = uint8ArrayConcat(await all(request.iterator()))
    expect(uint8ArrayEquals(out, body))

    expect(upload).to.be.greaterThan(0)
  })

  it('makes a GET request with unprintable characters', async function () {
    const buf = uint8ArrayFromString('a163666f6f6c6461672d63626f722d626172', 'base16')
    const params = Array.from(buf).map(val => `data=${val.toString()}`).join('&')

    const req = await HTTP.get(`${ECHO_SERVER}/download?${params}`)
    const rsp = await req.arrayBuffer()
    expect(uint8ArrayEquals(new Uint8Array(rsp), buf)).to.be.true()
  })
})
