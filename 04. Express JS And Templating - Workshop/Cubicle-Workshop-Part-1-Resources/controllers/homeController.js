const Router = require('express').Router;
const productService = require('../services/productService');
const router = Router();

router.get('/', (req, res) => {
    let products = productService.getAll();
        res.render('home', {title: 'Home', products});
    });

router.get('/create', (req, res) => {
        res.render('create', {title: 'Create'});
    });

router.post('/create', (req, res) => {
    // Validate req.body here or use middleware!!!
    let data = req.body;
    productService.create(data);
     res.redirect('/home');
});

router.get('/details/:productId', (req, res) => {
    res.render('details', {title: 'Product Details'});
})

module.exports = router;