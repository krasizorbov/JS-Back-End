const { Hotel } = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (res.locals.isLoggedIn === true) {
                Hotel
                .find({})
                .lean()
                .then((hotels) => {
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
                    res.render('./home/home.hbs', {
                        hotels
                    });
                })
                .catch((e) => console.log(e));
            } 
        },
    }
};
