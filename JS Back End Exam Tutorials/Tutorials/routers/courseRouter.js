const { courseController } = require('../controllers');

module.exports = (router) => {

    router.get('/create', courseController.get.create);
    router.get('/details/:courseId', courseController.get.details);
    router.get('/enroll/:courseId', courseController.get.enroll);
    router.get('/edit/:courseId', courseController.get.edit);
    router.get('/delete/:courseId', courseController.get.delete);

    router.post('/create', courseController.post.create);
    router.post('/edit/:courseId', courseController.post.edit);

    return router;
};