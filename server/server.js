const winston = require('winston');
const express = require('express');
var app = express();


// const logger = require('./startup/logger.js');

require('./startup/logger.js')();
require('./startup/routes.js')(app);
require('./startup/prod.js')(app);
require('./startup/db')();

var port = 3000;//process.env.PORT ||
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;