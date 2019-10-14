const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const { logger } = require('./errors');


// Check JSON web token
const jwtCheck = (scope) =>
  jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://learn-anything.auth0.com/.well-known/jwks.json',
    }),
    audience: 'https://learn-anything.xyz/api',
    issuer: 'https://learn-anything.auth0.com/',
    algorithms: ['RS256'],
  });

const getUserID = auth =>
  axios('https://learn-anything.auth0.com/userinfo', {
    headers: { Authorization: auth }
  })
  .then(({ data }) => data.sub)
  .catch(err => logger(err));


module.exports = {
  jwtCheck,
  getUserID,
};
