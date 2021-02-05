const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
    body('email').custom(value => {
        return User.findOne({email: value}).then(user => {
          if (!user) {
            return Promise.reject('E-mail does not exist!');
          }
        });
      }),
    body('password', 'Password must be at leas 6 characters long').isLength({min: 6})
]
