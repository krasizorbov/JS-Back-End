const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    
    app.engine('handlebars', handlebars());
    app.set('view engine', 'handlebars');
    app.use(express.static('static'));
    //TODO: Setup the view engine

    //TODO: Setup the body parser

    //TODO: Setup the static files

};