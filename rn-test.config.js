
module.exports = {
  require: require.resolve('./rn-test.require.js'),
  runner: 'mocha',
  modules: [
    'react-native-url-polyfill',
    'web-streams-polyfill',
    'text-encoding'
  ],
  patches: [{
    path: require.resolve('react-native-polyfill-globals/patches/react-native+0.63.3.patch')
  }]
}
