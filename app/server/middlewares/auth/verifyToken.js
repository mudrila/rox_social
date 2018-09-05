const jwt = require('jsonwebtoken');
const config = require('../../../../config/index');
const baseResponse = require('../../base_response');
const baseWarningResponse = baseResponse.baseWarningResponse;
const baseErrorResponse = baseResponse.baseErrorResponse;

function verifyToken(request, response, next) {
  let token = request.headers['authorization'];
  if (!token) {
    return response.status(403).json(baseWarningResponse('No access token provided.'))
  }
  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err) {
      return response.status(500).json(baseErrorResponse('Failed to authenticate token'))
    }
    request.user = decoded.user;
    if (next) {
      next()
    }
  })
}
module.exports = verifyToken;
