const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
  body('email', "The provided email is not valid!").isEmail().custom(value => {
    return User.findOne({email: value}).then(user => {
      if (!user) {
        return Promise.reject('E-mail does not exist!');
      }
    });
  }),
  body('password', 'Password must be at least 6 characters long').isLength({min: 6}).custom(passwordCheck)
]

function passwordCheck(password, { req }){
  return User.findOne({email: req.body.email}).then(user => {
    return user.comparePasswords(password).then(result => {
      if (!result) {
        return Promise.reject('Invalid password!');
      }
    })
  }) 
}