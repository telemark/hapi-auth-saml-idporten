###########################################################
#
# Dockerfile for hapi-auth-saml-idporten
#
###########################################################

# Setting the base to nodejs 4.4.5
FROM mhart/alpine-node:5.12.0@sha256:9da75ebafa08bac5964d3df371252088d35c6feae7dec2afc4e091b582ec60c6

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs git
RUN apk add --update --no-cache git

# Extra tools for native dependencies
RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000
ENV SAML_PRIV_CERT_PATH ./cert/key.pem
ENV SAML_PRIV_DEC_PATH ./cert/key.pem
ENV SAML_CERT_PATH ./cert/cert.pem
ENV SAML_YAR_SECRET The string he tied Has been unravelled by years and the dry weather of trunks
ENV SAML_ROUTE_LOGIN /login
ENV SAML_ROUTE_LOGIN_RESPONSE /loggedIn
ENV SAML_ROUTE_LOGOUT /logout
ENV SAML_ROUTE_LOGOUT_RESPONSE /logoutResponse
ENV SAML_PROTOCOL https://
ENV SAML_LOGIN_PATH /loggedIn
ENV SAML_LOGOUT_PATH /logout
ENV SAML_LOGIN_URL https://yourdomain.no/loggedIn
ENV SAML_LOGOUT_URL https://idporten-ver1.difi.no/opensso/IDPSloRedirect/metaAlias/norge.no/idp3
ENV SAML_LOGOUT_CALLBACK https://yourdomain.no/logoutResponse
ENV SAML_ENTRY_POINT https://idporten-ver1.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp3
ENV SAML_ISSUER YOURENTITYID
ENV SAML_IDENT_FORMAT urn:oasis:names:tc:SAML:2.0:nameid-format:transient

# Startup
CMD ["node", "standalone.js"]
