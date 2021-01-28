const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
require('./config/express')(app);
require('./config/routes')(app);

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.render('home', {layout: false});
})

app.listen(config.port, console.log(`Listening on port ${config.port}...`));