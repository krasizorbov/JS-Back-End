const Router = require('express').Router;
const router = Router();


router.get('/', (req, res) => {
        res.render('about');
    });

module.exports = router;