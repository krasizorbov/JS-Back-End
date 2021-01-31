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

router.post('/create', (req, res, next) => {
    const {id, name, description, imageUrl, difficultyLevel} = req.body;   
    if (id === "" || name === "" || description === "" || imageUrl === "" || difficultyLevel === "") {
        res.redirect('/home/create');
    } else {
        productService.create(req.body);
        res.redirect('/home');
    }
    next();
});

router.get('/details/:productId', (req, res) => {
    const product = productService.getById(req.params.productId);
    res.render('details', {title: 'Product Details', product});
});

module.exports = router;