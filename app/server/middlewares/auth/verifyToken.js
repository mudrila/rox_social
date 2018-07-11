const jwt = require('jsonwebtoken');
const config = require('../../../../config/index');

function verifyToken(request, response, next) {
  let token = request.headers['Authorization'];
  if (!token) {
    return response.status(403).json({ success:false, messageType:'warning', messageBody:'No access token provided'})
  }
  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err) {
      return response.status(500).json({ success:false, messageType:'error', messageBody:'Failed to authenticate token'})
    }
    request.user = decoded.user;
    next()
  })
}
module.exports = verifyToken;