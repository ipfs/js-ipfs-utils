'use strict'

const EchoServer = require('aegir/utils/echo-server')
const { format } =require('iso-url')

let echo = new EchoServer()

module.exports = {
  hooks: {
    pre: async () => {
      const server = await echo.start()
      const { address, port } = server.server.address()
      return {
        env: { ECHO_SERVER : format({ protocol: 'http:', hostname: address, port })}
      }
    },
    post: async () => {
      await echo.stop()
    }
  }
}