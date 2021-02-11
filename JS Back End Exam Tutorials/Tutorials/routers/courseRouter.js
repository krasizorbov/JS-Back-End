const { courseController } = require('../controllers');

module.exports = (router) => {

    router.get('/create', courseController.get.create);
    router.get('/details/:courseId', courseController.get.details);
    router.get('/enroll/:courseId', courseController.get.enroll);
    
    // router.get('/edit/:shoeId', shoeController.get.edit);
    // router.get('/delete/:shoeId', shoeController.get.delete);

    router.post('/create', courseController.post.create);
    
    // router.post('/edit/:shoeId', shoeController.post.edit);

    return router;
};