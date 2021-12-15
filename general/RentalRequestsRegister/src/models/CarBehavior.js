var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Image Model

/**
 * @typedef CarBehavior
 * @property {String} source - Source
 * @property {String} destiny - Destiny
 * @property {String} typeVehicle - Destiny
 * @property {Date} travelStartDate - Destiny
 * @property {Date} travelEndDate - Destiny
 * @property {String} signalState - Signal entering or leaving Node-Red?
 */
 //source, destiny, typeVehicle, date begin, date end travelEndDate
const carBehavior = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    source:{ 
        type: String,
        required: true
    },
    destiny: {
        type: String,
        required: true
    },
    typeVehicle:{
        type: String,
        required: true
    },
    travelStartDate:{
        type: Date,
        required: true
    },
    travelEndDate:{
        type: Date
    },
    travelDuration:{
        type: String,
        required: true
    },
    signalState:{
        type: String,
        required: true
    },
    idVehicle:{
        type: String,
        required: true
    },
    travelUniqueID:{
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        required: true
    },
    travelCost: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model('CarBehavior', carBehavior);