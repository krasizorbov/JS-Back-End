const Router = require('express').Router;
const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const router = Router();


router.use('/home', homeController);
router.use('/about', aboutController);
router.get('*', (req, res) => {
    res.render('404');
})


module.exports = router;

