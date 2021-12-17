const axios = require('axios');

/* USER API */

// Get all users profiles
exports.getAllUsersProfiles = async function () {
    const response = await axios.get('http://localhost:3000/v1/userprofile/')
    return response.data;
}

exports.getUserByEmail = async function (email) {
    const response = await axios.get('http://localhost:3000/v1/user/' + email)
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

// check if user is authenticated and type of profile
exports.addUser = async function (username, userProfile, name, email, password, money, gender, age) {

    var data = JSON.stringify({
        "username": username,
        "name": name,
        "email": email,
        "password": password,
        "money": money,
        "age": age,
        "gender": gender,
        "userProfile": userProfile
    });


    var config = {
        method: 'post',
        url: 'http://localhost:3000/v1/user/',
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
            //  console.log(error)
        });

    return data;
}

/* TYPE VEHICLES API */
exports.getAllTypesOfVehicles = async function () {
    const response = await axios.get('http://localhost:4000/v1/typevehicle/')
    return response.data;
}

exports.getVehicleTypeByName = async function (nameTypeVehicle) {
    const response = await axios.get('http://localhost:4000/v1/typevehicle/' + nameTypeVehicle)
    return response.data;
}

exports.addNewTypeOfVehicle = async function (idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle) {

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

// axios.get(URL, { headers: { Authorization: AuthStr } }

/* VEHICLES API */
exports.getAllVehicles = async function () {
    const response = await axios.get('http://localhost:4000/v1/vehicle/')
    return response.data;
}

exports.addNewVehicle = async function (idVehicle, isBusy, idTypeVehicle, location, latLocation, lagLocation, vehicleChargePercentage, isBusy) {

    var data = JSON.stringify({
        "idVehicle": idTypeVehicle,
        "isBusy": isBusy,
        "idTypeVehicle": idVehicle,
        "location": location,
        "latLocation": latLocation,
        "lagLocation": lagLocation,
        "vehicleChargePercentage": vehicleChargePercentage,
        "isBusy": isBusy
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
            console.log(error)
        });

    return data;

}

exports.getAllFreeVehiclesByType = async function (dateUntilItIsBusy, nameTypeVehicle) {
    const response = await axios.get('http://localhost:4000/v1/vehicle/getAllFreeVehiclesByType/' + dateUntilItIsBusy + '/' + nameTypeVehicle)
    console.log(response.data)
    return response.data;
}

exports.updateVehicleUtilizationDate = async function (idVehicle, dateUntilItIsBusy, location, isBusy) {


    var data = JSON.stringify({
        "dateUntilItIsBusy": dateUntilItIsBusy,
        "location": location,
        "isBusy": isBusy
    });

    var config = {
        method: 'patch',
        url: 'http://localhost:4000/v1/vehicle/' + idVehicle,
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
            console.log(error);
        });


    return data;
}

exports.updateVehicleCharge = async function (idVehicle, chargeValue, operation) {


    var config = {
        method: 'patch',
        url: 'http://localhost:4000/v1/vehicle/' + idVehicle + '/' + chargeValue + '/' + operation,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            //console.log(error);
        });

    console.log(data)

    return data;
}

exports.updateUserMoney = async function (email, money, operation) {

    var config = {
        method: 'patch',
        url: 'http://localhost:3000/v1/user/' + email + '/' + money + '/' + operation,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

    return data;
}



exports.addRoutePrice = async function (source, destiny, typeVehicle, priceByHourTypeVehicle) {

    var data = JSON.stringify({
        "startingPoint": source,
        "arrivalPoint": destiny,
        "typeOfVehicle": typeVehicle,
        "priceByHourTypeVehicle": priceByHourTypeVehicle
    });

    var config = {
        method: 'post',
        url: 'http://localhost:4500/v1/routeprice/',
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
            console.log(error)
        });

    return data;

}

//travelUniqueID, emailUser, travelCost, vehicle.idVehicle, source, destiny, typeVehicle, travelDate, travelDuration
exports.addRentRegister = async function (travelUniqueID, emailUser, travelCost, idVehicle, source, destiny, typeVehicle, travelDate, travelDuration) {

    var data = JSON.stringify({
        "travelUniqueID": travelUniqueID,
        "emailUser": emailUser,
        "travelCost": travelCost,
        "idVehicle": idVehicle,
        "source": source,
        "destiny": destiny,
        "typeVehicle": typeVehicle,
        "dateBegin": travelDate,
        "travelDuration": travelDuration,
        "signalState": "in"
    });

    var config = {
        method: 'post',
        url: 'http://localhost:6000/v1/',
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
            console.log(error)
        });

    return data;

}

exports.getUserAgeAndGender = async function (filePath) {
    let FormData = require('form-data');
    console.log('aqui')
    let fs = require('fs');
    let data = new FormData();
    data.append('image', fs.createReadStream(filePath));

    let config = {
        method: 'post',
        url: 'http://localhost:9000/api/predict',
        headers: {
            ...data.getHeaders()
        },
        data: data
    };

    let finalData = await axios(config)
        .then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            //console.log(error);
        });

    return finalData;

}