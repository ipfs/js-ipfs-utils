import EchoServer from 'aegir/echo-server'
import { format } from 'iso-url'
import url from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

/** @type {import('aegir').Options["build"]["config"]} */
const esbuild = {
  format: 'esm',
  plugins: [
    {
      name: 'node built ins',
      setup (build) {
        build.onResolve({ filter: /^stream$/ }, () => {
          return { path: require.resolve('readable-stream')  }
        })
        build.onResolve({filter: /^url$/}, () => {
          return { path: require.resolve('url/') }
        })
      }
    }
  ]
}

/** @type {import('aegir').PartialOptions} */
export default {
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
