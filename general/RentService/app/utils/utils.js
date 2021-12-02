const axios = require('axios');

/* USER API */

// Get all users profiles
exports.getAllUsersProfiles = async function () {
    const response = await axios.get('http://localhost:3000/v1/userprofile/')
    return response.data;
}

// check if user is authenticated and type of profile
exports.checkIfUserIsAuthenticatedAndProfile = async function (username, password) {

    var data = JSON.stringify({
        "username": username,
        "password": password
    });

    var config = {
        method: 'post',
        url: 'http://localhost:3000/v1/user/authenticateUser/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };


    var data = await axios(config)
        .then(async function (response) {
            return response.data;
        })
        .catch(function (error) {
            return;
        });

    return data;
}

// Get all users profiles
exports.logoutUser = async function () {
    const response = await axios.get('http://localhost:3000/v1/user/logoutUser/')
    return response.data;
}

/* TYPE VEHICLES API */
exports.getAllTypesOfVehicles = async function () {
    const response = await axios.get('http://localhost:4000/v1/typevehicle/')
    return response.data;
}

exports.addNewVehicle = async function (idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle) {
    
    var data = JSON.stringify({
        "idTypeVehicle": idTypeVehicle,
        "nameTypeVehicle": nameTypeVehicle,
        "priceByHourTypeVehicle": priceByHourTypeVehicle
    });

    var config = {
        method: 'post',
        url: 'http://localhost:4000/v1/typevehicle/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return
        });

    return data;
}

/* VEHICLES API */
exports.getAllVehicles = async function () {
    const response = await axios.get('http://localhost:4000/v1/vehicle/')
    return response.data;
}

exports.addTypeOfVehicle = async function (idVehicle, isBusy, idTypeVehicle, location) {
    
    var data = JSON.stringify({
        "idVehicle": idVehicle,
        "isBusy": isBusy,
        "idTypeVehicle": idTypeVehicle,
        "location": location
    });

    var config = {
        method: 'post',
        url: 'http://localhost:4000/v1/vehicle/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return
        });

    return data;

}