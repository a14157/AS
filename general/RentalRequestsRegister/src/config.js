/*
 * Disponibilização das principais configurações do serviço 
 *
 */

// Container for all environments
//const environment = {};

const environment = {
  // Docker mqtt conf
  mqtt: {
    broker: process.env.BROCKER,// 'broker.hivemq.com' , 
    port: process.env.BROKER_PORT,
    topic: process.env.BROKER_RECEIVER,
  },
  // Local mqtt conf
  /*mqtt: {
    broker: 'localhost',// 'broker.hivemq.com' ,
    port: 1883,
    topic: 'receiver',
  },*/
  log: {
    level: process.env.LOG_LEVEL,
  }
};



// export the module
module.exports = environment;