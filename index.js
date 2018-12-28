const winston = require('winston');
const winstonGraylog2 = require('winston-graylog2');

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

winston.add(new winstonGraylog2(options));

setInterval(() => {
  winston.info(`Time is ${(new Date).toLocaleString()}`);
}, 3000);
