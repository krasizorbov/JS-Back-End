const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const { auth } = require('../utils');
const session = require('express-session');

module.exports = (express, app) => {
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));

    app.use(cookieParser());

    app.use(auth);

    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: 'base-layout.hbs',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));
    app.set('viewengine', 'hbs');

};
