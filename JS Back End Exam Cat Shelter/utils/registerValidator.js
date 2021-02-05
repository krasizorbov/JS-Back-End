const { body } = require('express-validator');

module.exports = [
    body('email', "The provided email is not valid!").isEmail(),
    body('fullName', 'The name must be at least 5 characters long').isLength({min: 5}),
    body('password', 'Password must be at leas 6 characters long').isLength({min: 6}),
    body('repeatPassword').custom(passwordCheck)
]

function passwordCheck(repeatPassword, {req}){
    if (repeatPassword !== req.body.password) {
        throw new Error('Passwords do not match!');
    }
    return true;
}