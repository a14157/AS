var mongoose = require('mongoose');
var TypeVehicle
var Schema = mongoose.Schema;

/**
 * @typedef Vehicle
 * @property {String} idVehicle - Vehicle identification
 * @property {Date} dateUntilItIsBusy - Date until vehicle is busy
 * @property {String} location - Vehicle location
 * @property {String} latLocation - Vehicle location latitude
 * @property {String} lagLocation - Vehicle location longitude
 * @property {TypeVehicle} typeVehicle - Type Vehicle
 * @property {String} nameTypeVehicle - Name Type Vehicle
 * @property {Number} priceByHourTypeVehicle - Price By Hour
 * @property {Number} vehicleChargePercentage - Vehicle Charge Percentage
 * @property {Boolean} isBusy - Vehicle status: busy or free
 */
const vehicleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    idVehicle:{ 
        type: String,
        unique : true, 
        required : true
    },
    dateUntilItIsBusy: {
        type : Date
    },
    location: {
        type : String,
        required : true
    },
    latLocation: {
        type: String,
        required : true
    },
    lagLocation: {
        type: String,
        required : true
    },
    typeVehicle: {
        type: mongoose.Schema.Types.ObjectId,
        required : true
    },
    nameTypeVehicle:{
        type: String,
        required : true
    },
    priceByHourTypeVehicle:{
        type: String,
        required : true
    },
    vehicleChargePercentage:{
        type: Number,
        required : true,
        min: 0,
        max: 100
    },
    isBusy:{
        type: Boolean,
        required : true,
    }

});

module.exports = mongoose.model('vehicles', vehicleSchema);

//idAluno, nome, Cartao( codigoCartao, validade) )