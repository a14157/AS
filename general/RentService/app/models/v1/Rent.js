const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @typedef Rent
 * @property {String} emailUser - User Email
 * @property {String} destiny - Travel destination
 * @property {String} source - Travel Source
 * @property {String} travelCost - Travel Cost
 * @property {String} timeTravel - Time of travel
 * @property {String} typeVehicle - Type Vehicle
 * @property {String} idVehicle - Vehicle ID
 * @property {Date} travelStartDate - Travel Start Date
 * @property {Date} travelEndDate - Estimated Travel End Date
 * @property {String} stateOfTravel - In process, processed, etc
 * @property {Date} realTravelEndDate - Real End Travel Date
 */
const rentSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    travelUniqueID: {
        type: String,
        required: true
    },
    emailUser: { 
        type: String,
        required: true
    },
    destiny: {
        type: String,
         required: true
    },
    source: {
        type: String,
        required: true
    },
    travelCost:{
        type: String,
        required: true
    },
    travelDuration: {
        type: String,
        required: true
    },
    typeVehicle: {
        type: String,
        required: true
    },
    idVehicle: {
        type: String,
        required: true
    },
    travelStartDate: {
        type: Date,
        required: true
    },
    travelEndDate: {
        type: Date,
    },
    stateOfTravel: {
        type: String,
        required: true
    },
    realTravelEndDate: {
        type: Date
    },
});

// --------------------------------------------------
// - export the Rent Schema 
module.exports = mongoose.model('Rent', rentSchema);