const winston = require('winston');

module.exports = () => {
    winston.add(winston.transports.File, { filename: 'error.log' });
};
