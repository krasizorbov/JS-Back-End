const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
    body('email')
    .isEmail().withMessage("Email is invalid!")
    .matches(/\d/).withMessage('Email must contain a number!'),
    body('username')
    .isAlphanumeric().withMessage("Username must contain letters and digits!")
    .custom(username => {
        return User.findOne({username: username}).then(user => {
          if (user) {
            return Promise.reject('User already exist!');
          }
        });
      }),
    body('password')
    .isLength({min: 5}).withMessage("Password must be at least 5 characters long!")
    .matches(/\d/).withMessage('Password must contain a number!'),
    body('repeatPassword').custom(passwordCheck)
]

function passwordCheck(repeatPassword, {req}){
    if (repeatPassword !== req.body.password) {
        throw new Error('Passwords do not match!');
    }
    return true;
}