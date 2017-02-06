# hapi-auth-saml-idporten

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/hapi-auth-saml-idporten.svg)](https://greenkeeper.io/)
hapi saml authorization through idporten or similar

# Autoinstall

## NPM

```sh
npm install hapi-auth-saml-idporten
npm start

```

## docker

```sh
docker pull telemark/hapi-auth-saml-idporten
docker run -d -p 3000:3000 --name hapi-auth-saml-idporten telemark/hapi-auth-saml-idporten

```

# Manual installation

## Node

```sh

git clone https://github.com/telemark/hapi-auth-saml-idporten
cd hapi-auth-saml-idporten
npm setup
```

## Docker

Run the image

```sh
docker build -t hapi-auth-saml-idporten
docker run -d -p 3000:3000 --name hapi-auth-saml-idporten hapi-auth-saml-idporten
```
