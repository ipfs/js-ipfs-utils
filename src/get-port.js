'use strict'

const { createServer } = require('net')

function getPort (port = 3000) {
  const server = createServer()
  return new Promise((resolve, reject) => {
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        server.listen(0)
      } else {
        reject(err)
      }
    })
    server.on('listening', () => {
      const { port } = server.address()
      server.close(() => resolve(port))
    })
    server.listen(port)
  })
}

module.exports = getPort
