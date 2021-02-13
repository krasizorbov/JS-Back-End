const { courseController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');

module.exports = (router) => {

    router.get('/create', isAuthenticated, courseController.get.create);
    router.get('/details/:courseId', isAuthenticated, courseController.get.details);
    router.get('/enroll/:courseId', isAuthenticated, courseController.post.enroll);
    router.get('/edit/:courseId', isAuthenticated, courseController.get.edit);
    router.get('/delete/:courseId', isAuthenticated, courseController.get.delete);

    router.post('/create', isAuthenticated, courseController.post.create);
    router.post('/edit/:courseId', isAuthenticated, courseController.post.edit);

    return router;
};