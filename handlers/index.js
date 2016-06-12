var debug = require('debug')('saml:ctrl')

/**
 * Login
 * @function
 * @param {Object} request - A Hapi Request
 * @param {Object} reply - A Hapi Reply
 */
exports.login = function (request, reply) {
  var saml = request.server.plugins['hapi-passport-saml'].instance

  saml.getAuthorizeUrl({
    headers: request.headers,
    body: request.payload,
    query: request.query
  }, function (err, loginUrl) {
    if (err !== null) {
      return reply('Something failed').code(500)
    }
    return reply.redirect(loginUrl)
  })
}

/**
 * Assert endpoint for when login completes
 * @function
 * @param {Object} request - A Hapi Request
 * @param {Object} reply - A Hapi Reply
 */
exports.assert = function (request, reply) {
  var saml = request.server.plugins['hapi-passport-saml'].instance

  if (request.payload.SAMLRequest) {
  // Implement your SAMLRequest handling here
    debug(request.payload)
    return reply('Something failed').code(500)
  }
  if (request.payload.SAMLResponse) {
    // Handles SP use cases, e.g. IdP is external and SP is Hapi
    saml.validatePostResponse(request.payload, function (err, profile) {
      debug(err)
      debug(profile)
      if (err !== null) {
        return reply('Something failed').code(500)
      }

      // Save profile for logout in yar
      request.yar.set('profile', profile)

      return reply(profile)
    })
  }
}

/**
 * Logout
 * @function
 * @param {Object} request - A Hapi Request
 * @param {Object} reply - A Hapi Reply
 */
exports.logout = function (request, reply) {
  var saml = request.server.plugins['hapi-passport-saml'].instance

  request.user = request.yar.get('profile')
  if (!request.user) {
    return reply('Not logged in').code(500)
  }
  saml.getLogoutUrl(request, function (err, url) {
    if (err !== null) {
      return reply('Something failed').code(500)
    }
    request.yar.reset()
    return reply.redirect(url)
  })
}
