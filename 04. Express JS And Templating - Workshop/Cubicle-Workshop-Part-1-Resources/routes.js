const Router = require('express').Router;
const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const router = Router();


router.use('/', homeController);
router.use('/about', aboutController);


module.exports = router;

