var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @typedef TypeVehicle
 * @property {String} idVehicle -Type of Vehicle identification
 * @property {String} nameTypeVehicle - Vehicle type name (car, van, etc.)
 * @property {Number} priceByHourTypeVehicle - Price by hour vehicle
 */

const typeVehicleSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    idTypeVehicle:{ 
        type: String,
        unique : true, 
        required : true
    },
    nameTypeVehicle: {
        type : String,
        unique : true, 
        required : true
    },
    priceByHourTypeVehicle: {
        type : Number,
        required : true
    },
});

module.exports = mongoose.model('typeVehicleSchema', typeVehicleSchema);
