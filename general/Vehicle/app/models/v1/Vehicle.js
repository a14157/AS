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
    isBusy: {
        type : Boolean,
        required : true
    },
    location: {
        type : String,
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
    priceByMinuteTypeVehicle:{
        type: Number,
        required : true
    }
});

module.exports = mongoose.model('vehicles', vehicleSchema);

//idAluno, nome, Cartao( codigoCartao, validade) )