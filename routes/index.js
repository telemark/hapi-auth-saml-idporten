var samlCtrl = require('../handlers')
var config = require('../config')

var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) { reply({ path: config.route.login + ' || ' + config.route.logout }) },
    config: {
      description: 'login',
      notes: 'login',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: config.route.login,
    handler: samlCtrl.login,
    config: {
      description: 'login',
      notes: 'login',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: config.route.logoutResponse,
    handler: function (request, reply) { reply('Logged out \o/') },
    config: {
      description: 'login',
      notes: 'login',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: config.route.loginResponse,
    handler: samlCtrl.assert,
    config: {
      description: 'assert',
      notes: 'assert',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: config.route.logout,
    handler: samlCtrl.logout,
    config: {
      description: 'logout',
      notes: 'logout',
      tags: ['api']
    }
  }
]

module.exports = routes
