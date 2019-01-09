const winston = require('winston');
const { format } = require('logform');
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
    format.errors({ stack: true }),
    format.metadata(),
  ),
  transports: [new WinstonGraylog2(options)],
});

setInterval(() => {
  logger.info(`Time is ${(new Date).toLocaleString()}`);
}, 3000);

setInterval(() => {
  logger.info({ message: 'I should know the meaning of life', meaningOfLife: 42 });
}, 3000);

setInterval(() => {
  logger.error({ message: new Error('FakeError'), meta: 'lolerror' });
}, 3000);
