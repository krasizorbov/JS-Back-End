var express = require('express');
var authenticate = require('../middlewares/authenticate-middleware');
var User = require('../data/models/user-model');
var router = express.Router();

router
  .post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const userData = { username, password, email };
    const user = new User(userData);

    user.save()
      .then(() => user.generateAuthToken())
      .then((token) => {
        res.header('x-auth', token).send(user);
      })
      .catch(error => {
        res.status(400).send(error.message);
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body;

    User.findByCredentials(email, password)
      .then(user => user.generateAuthToken())
      .then(token => res.send(user))
      .catch(error => {
        res.status(400).send(error.message);
      })
  })
  .get('/me', authenticate, (req, res) => {
    res.send(req.user);
  });

module.exports = router;
