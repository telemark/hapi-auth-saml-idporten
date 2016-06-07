var samlCtrl = require('../controller')

var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) { reply({ path: '/login || /logout || /assertionconsumer' }) },
    config: {
      description: 'login',
      notes: 'login',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/login',
    handler: samlCtrl.login,
    config: {
      description: 'login',
      notes: 'login',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/logoutResponse',
    handler: function (request, reply) { reply('Logged out \o/') },
    config: {
      description: 'login',
      notes: 'login',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/assertionconsumer',
    handler: samlCtrl.assert,
    config: {
      description: 'assert',
      notes: 'assert',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: samlCtrl.logout,
    config: {
      description: 'logout',
      notes: 'logout',
      tags: ['api']
    }
  }
]

module.exports = routes
