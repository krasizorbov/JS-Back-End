const { homeController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');

module.exports = (router) => {
    router.get('/', homeController.get.home);
    return router;
};
