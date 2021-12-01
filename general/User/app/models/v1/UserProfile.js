var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @typedef User Profile
 * @property {String} idVehicle -Type of Vehicle identification
 * @property {String} nameTypeVehicle - Vehicle type name (car, van, etc.)
 */

const userProfileSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    profileID:{ 
        type: String,
        unique : true, 
        required : true
    },
    nameProfile: {
        type : String,
        unique : true, 
        required : true
    },
});

module.exports = mongoose.model('userProfileSchema', userProfileSchema);
