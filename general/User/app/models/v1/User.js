const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/**
 * @typedef user
 * @property {String} profile - User Profile Name
 * @property {String} username - Username
 * @property {String} name - User name
 * @property {String} email - User Email
 * @property {String} password - User password
 * @property {String} money - User money
 * @property {String} Gender - User Gender
 * @property {Number} age - User Age
 */
const userSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    profile: { 
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: {
            hash: String,
            salt: String
        },
        required: true
    },
    money:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});


// --------------------------------------------------
// - Methods associated with Schema

// ------------------------------
// - setPassword(password): calculates the hash of a given password, and saves


userSchema.methods.setPassword = function (textPassword) {
    const saltUser = crypto.randomBytes(16).toString('hex');
    this.password.salt = saltUser;
    this.password.hash = crypto.pbkdf2Sync(textPassword, saltUser, 1000, 64, 'sha512').toString('hex');
};

// --------
// - checkPassword(password)
userSchema.methods.checkPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.password.salt, 1000, 64, 'sha512').toString('hex');
    return this.password.hash === hash;
};

// --------
// - generateJwT()

userSchema.methods.generateJwT = function () {
    const validity = new Date();
    validity.setDate(validity.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email,
        name: this.name,
        exp: parseInt(validity.getTime() / 1000, 10),
    }, 'secret');
};

// --------------------------------------------------
// - export the User Schema 
module.exports = mongoose.model('User', userSchema);