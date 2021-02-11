const { Course } = require('../models');

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
                        for (let i = 1; i < course.usersEnrolled.length; i++) {
                            if (course.usersEnrolled[i].toString() == id.toString()) {
                                res.locals.isEnrolled = true;
                                break;
                            }            
                        }
                    }
                    res.render('./course/details.hbs', { ...course });
                })
        },

        enroll(req, res, next) {
            const { courseId } = req.params;
            Course
                .updateOne(
                    { _id: courseId },
                    { $push: { usersEnrolled: req.user._id } }
                ).then(() => {
                    res.locals.isEnrolled = true;
                    res.redirect('back');
                })
        },

        edit(req, res, next) {

            Course
                .findOne({ _id: req.params.courseId })
                .then((course) => {
                    res.render('./course/edit.hbs', course);
                });
        },

        // delete(req, res, next) {

        //     Shoe
        //         .deleteOne({ _id: req.params.shoeId })
        //         .then((result) => {
        //             res.redirect('/shoes/all');
        //         })
        // }

    },

    post: {
        create(req, res, next) {
            
            Course
                .create({ ...req.body, creator: req.user._id })
                .then(() => {
                    res.redirect('/home');
                });
        },

        // edit(req, res, next) {

        //     const { shoeId } = req.params;

        //     Shoe
        //         .updateOne(
        //             { _id: shoeId },
        //             { $set: { ...req.body } }
        //         ).then((updatedShoeOffer) => {
        //             res.redirect(`/shoes/details/${shoeId}`)
        //         })
        // }

        
    }
}