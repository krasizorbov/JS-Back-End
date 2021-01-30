const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

const express = require('express');
const routes = require('./routes');
const app = express();

require('./config/express')(app);
//require('./routes')(app);
app.use(routes);




app.listen(config.port, console.log(`Listening on port ${config.port}...`));