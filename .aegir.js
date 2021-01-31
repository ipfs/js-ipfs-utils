'use strict'

const EchoServer = require('aegir/utils/echo-server')
const { format } =require('iso-url')
const path = require('path')

/** @type {import('aegir').Options["build"]["config"]} */
const esbuild = {
  //inject: [path.join(__dirname, '../../scripts/node-globals.js')],
  plugins: [
    {
      name: 'node built ins',
      setup (build) {
        build.onResolve({ filter: /^stream$/ }, () => {
          return { path: require.resolve('readable-stream') }
        })
      }
    }
  ]
}

module.exports = {
  build: {
    config: esbuild
  },
  test: {
    browser: {
      config: {
        buildConfig: esbuild
      }
    },
    before: async () => {
      let echoServer = new EchoServer()
      await echoServer.start()
      const { address, port } = echoServer.server.address()
      return {
        echoServer,
        env: { ECHO_SERVER : format({ protocol: 'http:', hostname: address, port })}
      }
    },
    async after (options, before) {
      await before.echoServer.stop()
    }
  }
}
