import moment = require("moment");

const winston = require("winston");

const level =   process.env.LOG_LEVEL ||  'debug';

const logger = new winston.Logger({ 
    transports: [
        new winston.transports.File({
            level: 'debug',
            filename: `./logs/${moment().format('YYYY-MM-DD')}.log`, 
            json: false,
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
            timestamp: true
        }),
        new winston.transports.Console({
            timestamp: true,
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
 
export { logger };