var Hapi = require('hapi')
var server = new Hapi.Server()
var config = require('./config')
var service = require('./index')

// Create a server with a host and port
server.connection({
  port: config.SERVER_PORT
})

var decryptionCert = config.passport.decryptionPvk

// Dependencies
server.app = {
  decryptionCert: decryptionCert,
  user: {}
}

server.register({
  register: require('hapi-passport-saml'),
  options: config.passport
}, function (err) {
  if (err) {
    console.log(err)
  }
})

server.register({
  register: require('./routes'),
  options: {}
})

server.register({
  register: service,
  options: {}
})

function startServer () {
  server.start(function () {
    console.log('Server running at:', server.info.uri)
  })
}

function stopServer () {
  server.stop(function () {
    console.log('Server stopped')
  })
}

module.exports.start = startServer

module.exports.stop = stopServer
