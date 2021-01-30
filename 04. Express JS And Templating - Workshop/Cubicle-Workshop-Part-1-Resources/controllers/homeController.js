const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
        res.render('home', {title: 'Home'});
    });

router.get('/create', (req, res) => {
        res.render('create', {title: 'Create'});
    });



module.exports = router;