const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
  body('username').custom(value => {
    return User.findOne({username: value}).then(user => {
      if (!user) {
        return Promise.reject('Username is invalid!');
      }
    });
  }),
  body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters long')
  .matches(/\d/).withMessage('Password must contain a number!')
  .custom(passwordCheck)
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