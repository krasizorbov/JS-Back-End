const { Course } = require('../models');

module.exports = {
    get: {
        homeAuth(req, res, next) {
            Course
                .find({})
                .sort({createdAt: 'ascending'})
                .lean()
                .then((courses) => {
                    res.render('./home/home.hbs', {
                        courses
                    });
                })
                .catch((e) => console.log(e));
        },

        homeGuest(req, res, next) {
            Course
                .find({})
                .sort({count: 'descending'})
                .limit(3)
                .lean()
                .then((courses) => {
                    res.render('./home/home.hbs', {
                        courses
                    });
                })
                .catch((e) => console.log(e));
        },
    }
};
