const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
  body('username').custom(value => {
    return User.findOne({username: value}).then(user => {
      if (!user) {
        return Promise.reject('Username does not exist!');
      }
    });
  }),
  body('password', 'Password must be at least 6 characters long').isLength({min: 6}).custom(passwordCheck)
]

function passwordCheck(password, { req }){
  return User.findOne({username: req.body.username}).then(user => {
    return user.comparePasswords(password).then(result => {
      if (!result) {
        return Promise.reject('Invalid password!');
      }
    })
  }) 
}