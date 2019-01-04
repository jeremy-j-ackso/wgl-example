const winston = require('winston');
const { format } = require('winston');
const WinstonGraylog2 = require('winston-graylog2');

const options = {
  name: 'wgl-example',
  level: 'debug',
  silent: false,
  graylog: {
    servers: [
      { host: 'localhost', port: 12201 }
    ],
  },
  staticMeta: {
    me: 'you',
  },
};

const duplicatingOldErrorHandler = format((info, opts) => {
  let formatted = {};

  if (info instanceof Error) {
    // An error object is not 100% like a normal object, so
    // we have to jump through hoops to get needed info out
    // of error objects for logging.
    formatted = Object.assign(formatted, info);
    formatted.message = info.stack;
  } else {
    formatted = info;
  }

  return formatted;
});

const logger = winston.createLogger({
  level: 'debug',
  levels: {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
  },
  format: format.combine(
    duplicatingOldErrorHandler(),
    format.json(),
  ),
  transports: [new WinstonGraylog2(options)],
});

setInterval(() => {
  logger.info(`Time is ${(new Date).toLocaleString()}`);
}, 3000);

setInterval(() => {
  logger.error(new Error('FakeError'));
}, 3000);
