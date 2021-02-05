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
        profile(req, res, next) {
            res.render('./user/profile.hbs')
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

            const { email, fullName, password } = { ...req.body };

            User
                .findOne({ email })
                .then(() => {
                    return User.create({ email, fullName, password })
                })
                .then(() => {
                    res.redirect('/user/login');
                })
                .catch((e) => {
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

            const { email, password } = req.body;

            User
                .findOne({ email })
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
                        .redirect('/shoes/all');

                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }
};
