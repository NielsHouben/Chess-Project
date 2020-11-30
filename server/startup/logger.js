const winston = require('winston');

module.exports = function () {


  const myconsole = new winston.transports.Console({
    format: winston.format.simple(),
  });

  winston.add(myconsole);



}


// const { createLogger, transports, format } = require('winston');
// require('winston-mongodb');

// const logger = createLogger({
//   transports: [
//     new transports.Console({
//       level: 'info',
//       format: format.combine(format.timestamp(), format.simple())
//     }),
//     new transports.File({
//       filename: 'info.log',
//       level: 'info',
//       format: format.combine(format.timestamp(), format.simple())
//     })
//   ]
// });

// module.exports = logger;