const { hotelController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { createValidator } = require('../utils');

module.exports = (router) => {

    router.get('/create', isAuthenticated, hotelController.get.create);
    router.get('/details/:hotelId', isAuthenticated, hotelController.get.details);
    router.get('/book/:hotelId', isAuthenticated, hotelController.post.book);
    router.get('/edit/:hotelId', isAuthenticated, hotelController.get.edit);
    router.get('/delete/:hotelId', isAuthenticated, hotelController.get.delete);

    router.post('/create', isAuthenticated, createValidator, hotelController.post.create);
    router.post('/edit/:hotelId', isAuthenticated, createValidator, hotelController.post.edit);

    return router;
};