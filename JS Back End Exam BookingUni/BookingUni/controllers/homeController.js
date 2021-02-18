const { Hotel } = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (res.locals.isLoggedIn === true) {
                Hotel
                .find({})
                .lean()
                .then((hotels) => {
                    if (req.session.notification) {
                        res.render('./home/home.hbs', {
                            hotels, notification: req.session.notification
                        });
                        req.session.notification = undefined;
                        return;
                    }
                    res.render('./home/home.hbs', {
                        hotels
                    });
                })
                .catch((e) => console.log(e));
            } else {
                Hotel
                .find({})
                .sort({freeRooms: 'descending'})
                .lean()
                .then((hotels) => {
                    if (req.session.notification) {
                        res.render('./home/home.hbs', {
                            hotels, notification: req.session.notification
                        });
                        req.session.notification = undefined;
                        return;
                    }
                    res.render('./home/home.hbs', {
                        hotels
                    });
                })
                .catch((e) => console.log(e));
            } 
        },
    }
};
