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
        let data = req.body;
        productService.create(data);
        res.redirect('/home');
    }
    next();
});

router.get('/details/:productId', (req, res) => {
    res.render('details', {title: 'Product Details'});
});

module.exports = router;