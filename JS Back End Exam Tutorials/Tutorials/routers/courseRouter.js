const { courseController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { createValidator } = require('../utils');

module.exports = (router) => {

    router.get('/create', isAuthenticated, courseController.get.create);
    router.get('/details/:courseId', isAuthenticated, courseController.get.details);
    router.get('/enroll/:courseId', isAuthenticated, courseController.post.enroll);
    router.get('/edit/:courseId', isAuthenticated, courseController.get.edit);
    router.get('/delete/:courseId', isAuthenticated, courseController.get.delete);

    router.post('/create', isAuthenticated, createValidator, courseController.post.create);
    router.post('/edit/:courseId', isAuthenticated, createValidator, courseController.post.edit);

    return router;
};