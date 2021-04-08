'use strict';

const EchoServer = require('aegir/utils/echo-server')
const { format } =require('iso-url')

/** @type {import('aegir').Options["build"]["config"]} */
const esbuild = {
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

/** @type {import('aegir').PartialOptions} */
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
    async before (options) {
      let echoServer = new EchoServer()
      await echoServer.start()
      const { address, port } = echoServer.server.address()
      let hostname = address
      if(options.runner === 'react-native-android') {
        hostname = '10.0.2.2'
      }
      return {
        echoServer,
        env: { ECHO_SERVER : format({ protocol: 'http:', hostname, port })}
      }
    },
    async after (options, before) {
      await before.echoServer.stop()
    }
  }
}
