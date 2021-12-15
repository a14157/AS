'use strick';

const mqtt = require('mqtt')
const config = require('../config')
const CarBehavior = require('../models/CarBehavior')

exports.addRentRecord = async function (source, destiny, typeVehicle, dateBegin, travelDuration, signalState, idVehicle, travelUniqueID, emailUser, travelCost) {

    console.log("addRentRecord")

    try {
        const carBehavior = new CarBehavior({
            source: source,
            destiny: destiny,
            typeVehicle: typeVehicle,
            travelStartDate: dateBegin,
            travelDuration: travelDuration,
            signalState: signalState,
            idVehicle: idVehicle,
            travelUniqueID: travelUniqueID,
            emailUser: emailUser,
            travelCost: travelCost
        });

        //const finalCarBehavior = await carBehavior.save();

        const host = config.mqtt.broker
        const port = config.mqtt.port
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

        const connectUrl = `mqtt://${host}:${port}`
        const client = mqtt.connect(connectUrl, {
            clientId,
            clean: true,
            connectTimeout: 4000,
            username: 'emqx',
            password: 'public',
            //reconnectPeriod: 1000,
        })

        const topic = 'rent'
        client.on('connect', () => {
            console.log('Publisher: Connected')
            client.subscribe(topic, function (err) {
                if (!err) {
                    client.publish(topic, JSON.stringify(carBehavior))
                }
            })
        })
        client.on('message', (topic, payload) => {
            console.log('Publisher: Received Message:', topic, payload.toString())
        })

        return {
            success: 201,
            body: carBehavior
        };

    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }

};