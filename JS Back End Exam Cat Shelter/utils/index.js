const jwt = require('./jwt');
const auth = require('./auth');
const registerValidator = require('./registerValidator');
const loginValidator = require('./loginValidator');
const formValidator = require('./formValidator');

module.exports = {
    jwt,
    auth,
    registerValidator,
    formValidator,
    loginValidator
};