const { User } = require('../models');
const { jwt, formValidator } = require('../utils');
const { cookie } = require('../config');


module.exports = {
    get: {
        login(req, res, next) {
            res.render('./user/login.hbs')
        },
        register(req, res, next) {
            res.render('./user/register.hbs')
        },
        logout(req, res, next) {
            res
                .clearCookie(cookie)
                .redirect('/home/');
        }
    },

    post: {
        register(req, res, next) {
            const validForm = formValidator(req);
            if (!validForm.isOk) {
                res.render('./user/register.hbs', validForm.options);
                return;
            }
            const { email, username, password } = { ...req.body };
            User
                .findOne({ username })
                .then(() => {
                    return User.create({ email, username, password })
                })
                .then(() => {
                    res.redirect('/home');
                })
                .catch((e) => {
                    console.log("error");
                    console.log(e);
                    res.redirect('/user/register');
                });

        },

        login(req, res, next) {
            const validForm = formValidator(req);
            if (!validForm.isOk) {
                res.render('./user/login.hbs', validForm.options);
                return;
            }
            const { username, password } = {...req.body};
            User
                .findOne({ username })
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user,
                    ])
                })
                .then(([isPasswordMatch, user]) => {
                    if (!isPasswordMatch) {
                        throw new Error('Wrong password!');
                    }
                    const token = jwt.createToken(user._id);
                    res
                        .status(200)
                        .cookie(cookie, token, { maxAge: 86400000 })
                        .redirect('/home');

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
};
