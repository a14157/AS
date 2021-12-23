// configuração MQTT --------------------------
const mqtt = require('mqtt')

const config = require('./config')
//const log = require('./utils/logs')

const receptor = {};

receptor.connect = function connect(connectCallback, messageCallback) {
  const connectOptions = {
    host: config.mqtt.broker,
    port: config.mqtt.port
  };

  console.log(`Receiver: Trying to connect to the MQTT broker at ${config.mqtt.broker} on port ${config.mqtt.port}`);

  receptor.client = mqtt.connect(connectOptions);

  receptor.client.on('connect', () => {
    //log.info(`Connected successfully to the MQTT broker at ${config.mqtt.broker} on port ${config.mqtt.port}`);
    console.log(`Receiver: Connected successfully to the MQTT broker at ${config.mqtt.broker} on port ${config.mqtt.port}`)
    receptor.client.subscribe(config.mqtt.topic);

    receptor.client.on('message', (topic, message) => {
      console.log(`Receiver: topic ${topic} `)
      console.log('Receiver: rcecetor')
      if (topic === config.mqtt.topic) {
        const obj = JSON.parse(message.toString());
        messageCallback(obj);
      }
    });

    connectCallback();
  });

  receptor.client.on('error', (err) => {
    console.log(`'Receiver: An error occurred. ${err}`);
  });
};

receptor.disconnect = function disconnect(cb) {
  receptor.client.end();
  cb();
};

module.exports = receptor;