const { Hotel } = require('../models');
const { formValidator } = require('../utils');

module.exports = {
    get: {
        create(req, res, next) {
            res.render('./hotel/create.hbs');
        },

        details(req, res, next) {
            Hotel
                .findOne({ _id: req.params.hotelId })
                .lean()
                .then((hotel) => {
                    if (hotel.owner.toString() == req.user._id.toString()) {
                        res.locals.isOwner = true;
                    }
                    if (hotel.usersBooked.length > 0) {
                        const id = req.user._id;
                        for (let i = 0; i < hotel.usersBooked.length; i++) {
                            if (hotel.usersBooked[i].toString() == id.toString()) {
                                res.locals.isBooked = true;
                                break;
                            }            
                        }
                    }
                    res.render('./hotel/details.hbs', { ...hotel });
                })
        },

        edit(req, res, next) {
            Hotel
                .findOne({ _id: req.params.hotelId })
                .then((hotel) => {
                    res.render('./hotel/edit.hbs', hotel);
                });
        },

        delete(req, res, next) {
            Hotel
                .deleteOne({ _id: req.params.hotelId })
                .then(() => {
                    res.redirect('/home');
                })
        }

    },

    post: {
        create(req, res, next) {
            const validForm = formValidator(req);
            if (!validForm.isOk) {
                res.render('./hotel/create.hbs', validForm.options);
                return;
            }
            Hotel
                .create({ ...req.body, owner: req.user._id, count: 0 })
                .then(() => {
                    res.redirect('/home');
                });
        },

        edit(req, res, next) {
            const validForm = formValidator(req);
            if (!validForm.isOk) {
                const _id = req.params.hotelId;
                validForm.options._id = _id;
                res.render(`./hotel/edit.hbs`, validForm.options);
                return;
            }
            const { hotelId } = req.params;
            Hotel
                .updateOne(
                    { _id: hotelId },
                    { $set: { ...req.body } }
                ).then(() => {
                    res.redirect(`/hotel/details/${hotelId}`)
                })
        },

        book(req, res, next) {
            const { hotelId } = req.params;
            Hotel
                .updateOne(
                    { _id: hotelId },
                    { $push: { usersBooked: req.user._id }, $inc: { count: 1, freeRooms: -1 } },
                ).then(() => {
                    res.locals.isBooked = true;
                    res.redirect(`/hotel/details/${hotelId}`);
                })
        },
    }
}