const { body } = require('express-validator');
const { User } = require('../models');

module.exports = [
    body('username', "The provided username is not valid!").isLength({min: 5}).custom(username => {
        return User.findOne({username: username}).then(user => {
          if (user) {
            return Promise.reject('User already exist!');
          }
        });
      }),
    body('password', 'Password must be at least 6 characters long').isLength({min: 6}),
    body('repeatPassword').custom(passwordCheck)
]

function passwordCheck(repeatPassword, {req}){
    if (repeatPassword !== req.body.password) {
        throw new Error('Passwords do not match!');
    }
    return true;
}