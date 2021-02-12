const { Course } = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (res.locals.isLoggedIn === true) {
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
            } else {
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
            } 
        },
    }
};
