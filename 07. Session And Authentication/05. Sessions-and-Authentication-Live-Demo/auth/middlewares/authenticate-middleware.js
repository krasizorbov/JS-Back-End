const User = require('../data/models/user-model');

function authenticate(req, res, next) {
  const token = req.header('x-auth');

  User
    .findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }

      req.user = user;
      res.token = token;
      next();
    })
    .catch(error => {
      res.status(401).send();
      next();
    });
}

module.exports = authenticate;