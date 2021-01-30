const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
        res.render('home', {title: 'Home'});
    });

router.get('/create', (req, res) => {
        res.render('create', {title: 'Create'});
    });

router.post('/create', (req, res) => {
    console.log(req.body);
     res.send('created')
});

router.get('/details/:productId', (req, res) => {
    res.render('details', {title: 'Product Details'});
})

module.exports = router;