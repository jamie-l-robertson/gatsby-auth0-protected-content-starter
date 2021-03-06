const { NetlifyJwtVerifier, removeNamespaces, claimToArray } = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  mapClaims: (claims) => {
    const user = claims;
    user.scope = claimToArray(user.scope);
    return user;
  }
});

/**
 * Require the request to be authenticated.
 */
module.exports.requireAuth = verifyJwt;
