const log4js = require('log4js');
const { faker } = require('@faker-js/faker');

require('dotenv').config();

const createRandomPerson = () => {
  return {
    userId: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};

const randomSleeper = (min, max) => {
  const ms = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, ms));
};

log4js.configure({
  appenders: {
    logstash: {
      type: '@log4js-node/logstashudp',
      host: process.env.LOGSTASH_HOST,
      port: process.env.LOGSTASH_UDP_PORT,
    },
    console: { type: 'console' },
  },
  categories: {
    default: {
      appenders: ['logstash', 'console'],
      level: 'info',
    },
  },
});

const main = async () => {
  const logger = log4js.getLogger();

  try {
    for (let i = 0; i < 1500; i++) {
      logger.info(createRandomPerson());
      await randomSleeper(1000, 2000);
    }
  } catch (error) {
    console.error('error', error);
  }
};

main();

// const main = () => {
//   const dgram = require('dgram');
//   const message = Buffer.from('{"msg": "Hello, Logstash!"}');
//   const client = dgram.createSocket('udp4');
//   client.send(message, 5001, '127.0.0.1', (err) => {
//     client.close();
//   });
// };

// main();
