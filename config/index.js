'use strict'

var fs = require('fs')

var config = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  SAML_YAR_SECRET: 'The string he tied Has been unravelled by years and the dry weather of trunks',
  route: {
    login: '/login',
    loginResponse: '/loginResponse',
    logout: '/logout',
    logoutResponse: '/logoutResponse'
  },
  passport: {
    strategy: 'saml',
    privateCert: fs.readFileSync('./cert/key.pem', 'utf-8'),
    decryptionPvk: fs.readFileSync('./cert/key.pem', 'utf-8'),
    cert: fs.readFileSync('./cert/cert.pem', 'utf-8'),
    protocol: 'https://',
    path: '/loggedIn',
    pathLogout: '/logout',
    loginUrl: 'https://yourdomain.no/loggedIn', // Metadata XML: Location from AssertionConsumerService
    logoutUrl: 'https://idporten.difi.no/opensso/IDPSloRedirect/metaAlias/norge.no/idp3', // Metadata XML: location from SingleLogoutService-tag (http-redirect)
    logoutCallbackUrl: 'https://yourdomain/logoutResponse', // Metadata XML: ResponseLocation from SingleLogoutService-tag
    entryPoint: 'https://idporten.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp3', // Metadata XML: location from SingleSignOnService-tag (http-redirect)
    issuer: 'entity', // Metadata XML: entityID from EntityDescriptor-tag
    identifierFormat: 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient' // Metadata XML: Data inside NameIDFormat
  }
}

module.exports = config

