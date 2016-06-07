var debug = require('debug')('saml:ctrl')

/**
 * Endpoint to retrieve metadata
 * @function
 * @param {Object} request - A Hapi Request
 * @param {Object} reply - A Hapi Reply
 */
exports.metadata = function (request, reply) {
  var saml = request.server.plugins['hapi-passport-saml'].instance
  return reply(saml.generateServiceProviderMetadata(request.server.app.decryptionCert).type('application/xml'))
}

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
      return reply.code(500)
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
    return reply(500)
  }
  if (request.payload.SAMLResponse) {
    // Handles SP use cases, e.g. IdP is external and SP is Hapi
    saml.validatePostResponse(request.payload, function (err, profile) {
      debug(err)
      debug(profile)
      if (err !== null) {
        return reply.code(500)
      }

      // Save name_id and session_index for logout
      // Note:  In practice these should be saved in the user session, not globally.
      var name_id = profile.nameID
      var session_index = profile.sessionIndex

      request.server.app.name_id = name_id
      request.server.app.session_index = session_index
      request.server.app.user = profile
      return reply('Hello ' + profile.uid + '!')
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
  saml.getLogoutUrl(request, function (err, url) {
    if (err !== null) {
      return reply.code(500)
    }
    return reply.redirect(url)
  })
}
