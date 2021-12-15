var mongoose = require('mongoose');
var TypeVehicle
var Schema = mongoose.Schema;

/**
 * @typedef Vehicle
 * @property {String} idVehicle - Vehicle identification
 * @property {Boolean} isBusy - Vehicle status: busy or free
 * @property {TypeVehicle} TypeVehicle - Type Vehicle
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
    }

});

module.exports = mongoose.model('vehicles', vehicleSchema);

//idAluno, nome, Cartao( codigoCartao, validade) )