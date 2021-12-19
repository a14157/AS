var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Image Model

/**
 * @typedef CarBehavior
 * @property {String} source - Travel Source
 * @property {String} destiny - Travel Destiny
 * @property {String} typeVehicle - Type of vehicle that will make the travel
 * @property {Date} travelStartDate - Travel start date
 * @property {Date} travelEndDate - Travel end date
 * @property {String} travelDuration - Travel duration
 * @property {String} signalState - Signal entering or leaving Node-Red?
 * @property {String} idVehicle - Vehicle Identification
 * @property {String} travelUniqueID - Travel Identification
 * @property {String} emailUser - User email of travel
 * @property {String} travelCost - Travel Cost
 * @property {status} status - Status of travel
 */
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