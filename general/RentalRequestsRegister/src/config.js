/*
 * Disponibilização das principais configurações do serviço 
 *
 */

// Container for all environments
//const environment = {};

const environment = {
  mqtt: {
    broker: process.env.BROCKER,// 'broker.hivemq.com' ,
    port: process.env.BROKER_PORT,
    topic: process.env.BROKER_RECEIVER,
  },
  log: {
    level: process.env.LOG_LEVEL,
  }
};



// export the module
module.exports = environment;