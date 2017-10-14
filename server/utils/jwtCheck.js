const jwt = require('express-jwt');
const jwks = require('jwks-rsa');


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


module.exports = jwtCheck;
