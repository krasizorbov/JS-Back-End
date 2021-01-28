const Router = require('express').Router;
const homeController = require('../controllers/homeController');
const aboutController = require('../controllers/aboutController');
const router = Router();



module.exports = (app) => {
    app.use(homeController);
    app.use(aboutController);
};