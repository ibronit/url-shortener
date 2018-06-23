const jwt = require('jsonwebtoken');
const Config = require('dotenv-extended').load();

function verifyToken(req, res, next) {
  const token = req.headers['authorization'].split(' ').pop();
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, Config.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    console.log(`${user.realname} logged in`)
    next();
  });
}

exports.verifyToken = verifyToken;