const { Course } = require('../models');

module.exports = {
    get: {
        create(req, res, next) {
            res.render('./course/create.hbs');
        },

        // details(req, res, next) {

        //     Course
        //         .findOne({ _id: req.params.courseId })
        //         .lean()
        //         .then((course) => {
        //             res.render('./course/details.hbs', { ...course });
        //         })
        // },

        // edit(req, res, next) {

        //     Shoe
        //         .findOne({ _id: req.params.shoeId })
        //         .then((shoe) => {
        //             res.render('./shoes/edit.hbs', shoe);
        //         });
        // },

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
                .create({ ...req.body, usersEnrolled: req.user._id })
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