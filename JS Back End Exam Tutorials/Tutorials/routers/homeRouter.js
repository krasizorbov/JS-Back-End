const { homeController } = require('../controllers');
const isAuthenticated = require('../middlewares/isAuthenticated');

module.exports = (router) => {
    router.get('/', homeController.get.homeGuest);
    router.get('/', isAuthenticated, homeController.get.homeAuth);
    return router;
};
