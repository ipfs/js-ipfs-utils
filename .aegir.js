'use strict'

const EchoServer = require('./src/echo-server')

let echo2 = new EchoServer()

module.exports = {
  hooks: {
    pre: async () => {
      const server = await echo2.start()
    },
    post: async () => {
      await echo2.stop()
    }
  }
}