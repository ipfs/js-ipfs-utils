'use strict'

module.exports = {
  require: require.resolve('./rn-test.require.js'),
  runner: 'mocha',
  modules: [
    'react-native-url-polyfill',
    'web-streams-polyfill'
  ],
  patches: [{
    path: require.resolve('react-native-polyfill-globals/patches/react-native+0.63.3.patch')
  }]
}
