var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * @typedef User Profile
 * @property {String} profileID - Profile identification
 * @property {String} nameProfile - Profile name (admin, user, etc)
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
