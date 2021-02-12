const { userController } = require('../controllers');
const { registerValidator, loginValidator } = require('../utils');
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');

module.exports = (router) => {
    router.get('/login', isGuest, userController.get.login);
    router.get('/register', isGuest, userController.get.register);
    router.get('/logout', isAuthenticated, userController.get.logout);

    router.post('/register', isGuest, registerValidator, userController.post.register);
    router.post('/login', isGuest, loginValidator, userController.post.login);

    return router;
};