const { Course } = require('../models');
const { formValidator } = require('../utils');

module.exports = {
    get: {
        create(req, res, next) {
            res.render('./course/create.hbs');
        },

        details(req, res, next) {
            Course
                .findOne({ _id: req.params.courseId })
                .lean()
                .then((course) => {
                    if (course.creator.toString() == req.user._id.toString()) {
                        res.locals.isCreator = true;
                    }
                    if (course.usersEnrolled.length > 0) {
                        const id = req.user._id;
                        for (let i = 0; i < course.usersEnrolled.length; i++) {
                            if (course.usersEnrolled[i].toString() == id.toString()) {
                                res.locals.isEnrolled = true;
                                break;
                            }            
                        }
                    }
                    res.render('./course/details.hbs', { ...course });
                })
        },

        edit(req, res, next) {
            Course
                .findOne({ _id: req.params.courseId })
                .then((course) => {
                    res.render('./course/edit.hbs', course);
                });
        },

        delete(req, res, next) {
            Course
                .deleteOne({ _id: req.params.courseId })
                .then(() => {
                    res.redirect('/home');
                })
        }

    },

    post: {
        create(req, res, next) {
            const validForm = formValidator(req);
            if (!validForm.isOk) {
                res.render('./course/create.hbs', validForm.options);
                return;
            }
            Course
                .create({ ...req.body, creator: req.user._id, count: 0 })
                .then(() => {
                    res.redirect('/home');
                });
        },

        edit(req, res, next) {
            const validForm = formValidator(req);
            if (!validForm.isOk) {
                const _id = req.params.courseId;
                validForm.options._id = _id;
                res.render(`./course/edit.hbs`, validForm.options);
                return;
            }
            const { courseId } = req.params;
            Course
                .updateOne(
                    { _id: courseId },
                    { $set: { ...req.body } }
                ).then(() => {
                    res.redirect(`/course/details/${courseId}`)
                })
        },

        enroll(req, res, next) {
            const { courseId } = req.params;
            Course
                .updateOne(
                    { _id: courseId },
                    { $push: { usersEnrolled: req.user._id }, $inc: { count: 1 } },
                ).then(() => {
                    res.locals.isEnrolled = true;
                    res.redirect(`/course/details/${courseId}`);
                })
        },
    }
}