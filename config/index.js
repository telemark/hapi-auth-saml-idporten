'use strict'

var fs = require('fs')

var privateCertPath = process.env.SAML_PRIV_CERT_PATH || './cert/key.pem'
var decryptionPvkPath = process.env.SAML_PRIV_DEC_PATH || './cert/key.pem'
var certPath =  process.env.SAML_CERT_PATH || './cert/cert.pem'

var config = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  SAML_YAR_SECRET: process.env.SAML_YAR_SECRET || 'The string he tied Has been unravelled by years and the dry weather of trunks',
  route: {
    login: process.env.SAML_ROUTE_LOGIN || '/login',
    loginResponse: process.env.SAML_ROUTE_LOGIN_RESPONSE || '/loggedIn',
    logout: process.env.SAML_ROUTE_LOGOUT || '/logout',
    logoutResponse: process.env.SAML_ROUTE_LOGOUT_RESPONSE || '/logoutResponse'
  },
  passport: {
    strategy: 'saml',
    privateCert: fs.readFileSync(privateCertPath, 'utf-8'),
    decryptionPvk: fs.readFileSync(decryptionPvkPath, 'utf-8'),
    cert: fs.readFileSync(certPath, 'utf-8'),
    protocol:  process.env.SAML_PROTOCOL || 'https://',
    path:  process.env.SAML_LOGIN_PATH || '/loggedIn',
    pathLogout:  process.env.SAML_LOGOUT_PATH || '/logout',
    loginUrl: process.env.SAML_LOGIN_URL || 'https://yourdomain.no/loggedIn', // Metadata XML: Location from AssertionConsumerService
    logoutUrl: process.env.SAML_LOGOUT_URL || 'https://idporten-ver1.difi.no/opensso/IDPSloRedirect/metaAlias/norge.no/idp3', // Metadata XML: location from SingleLogoutService-tag (http-redirect)
    logoutCallbackUrl: process.env.SAML_LOGOUT_CALLBACK || 'https://yourdomain.no/logoutResponse', // Metadata XML: ResponseLocation from SingleLogoutService-tag
    entryPoint: process.env.SAML_ENTRY_POINT || 'https://idporten-ver1.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp3', // Metadata XML: location from SingleSignOnService-tag (http-redirect)
    issuer: process.env.SAML_ISSUER || 'your entityId', // Metadata XML: entityID from EntityDescriptor-tag
    identifierFormat: process.env.SAML_IDENT_FORMAT || 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient' // Metadata XML: Data inside NameIDFormat
  }
}

module.exports = config

