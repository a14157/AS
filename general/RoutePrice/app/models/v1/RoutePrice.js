const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * @typedef RoutePrice
 * @property {String} startingPoint - trip starting point
 * @property {String} arrivalPoint - trip arrival point
 * @property {String} timeOfTravel - Time of travel
 * @property {String} price - travel price
 * @property {String} typeOfVehicle - type of vehicle that will make the travel
 */
const routePriceSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    startingPoint: {
        type: String,
        required: true
    },
    arrivalPoint: {
        type: String,
        required: true
    },
    timeOfTravel: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    typeOfVehicle: {
        type: String,
        required: true
    }
});


// --------------------------------------------------
// - export the User Schema 
module.exports = mongoose.model('RoutePrice', routePriceSchema);