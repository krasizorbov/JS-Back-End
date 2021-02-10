const { Course } = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
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
    }
};
