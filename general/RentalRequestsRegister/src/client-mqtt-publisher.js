'use strict';

// configuração MQTT --------------------------
const mqtt = require('mqtt')

const config = require('./config')
//const log = require('./utils/logs')

exports.sendRecordToNodeRed = async function () {
    const receptor = {};

    console.log('aqui')

    receptor.connect = function connect(connectCallback, messageCallback) {
        const connectOptions = {
            host: config.mqtt.broker,
            port: config.mqtt.port
        };

        console.log(`Publisher: Trying to connect to the MQTT broker at ${config.mqtt.broker} on port ${config.mqtt.port}`);

        receptor.client = mqtt.connect(connectOptions);

        receptor.client.on('connect', () => {
            receptor.client.subscribe(config.mqtt.topic);

            client.publish(config.mqtt.topic, 'nodejs mqtt test', {
                qos: 0,
                retain: false
            }, (error) => {
                if (error) {
                    console.error(error)
                }
            })
        });

        return {
            success: 201,
            body: finalCarBehavior 
          };

    };
}