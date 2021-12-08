/*
 * Disponibilização das principais configurações do serviço 
 *
 */

// Container for all environments
//const environment = {};

const environment = {
  mqtt: {
    broker: 'localhost',// 'broker.hivemq.com' ,
    port: 1883,
    topic: 'receiver',
  },
  log: {
    level: process.env.LOG_LEVEL,
  }
};



// export the module
module.exports = environment;