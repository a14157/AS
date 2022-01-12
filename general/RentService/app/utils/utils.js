const axios = require('axios');
const apiTokens = require('../config/apiTokens.json');
const userToken = require('../../configs/user.json');

/* USER API */

// Get all users profiles
exports.getAllUsersProfiles = async function () {
    var config = {
        method: 'get',
        url: 'http://localhost:3000/v1/userprofile/',
        headers: {
            'user-api-token': apiTokens.userAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data
}

exports.getUserByEmail = async function (email) {
    var config = {
        method: 'get',
        url: 'http://localhost:3000/v1/user/' + email,
        headers: {
            'user-api-token': apiTokens.userAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data
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
            if (error.response) {
                return error.response.data
            }
        });

    return data;
}

// Get all users profiles
exports.logoutUser = async function () {
    var config = {
        method: 'get',
        url: 'hhttp://localhost:3000/v1/user/logoutUser/',
        headers: {
            'user-api-token': apiTokens.userAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data
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
            'Content-Type': 'application/json',
            'user-api-token': apiTokens.userAPI,
            'rent-api-token': apiTokens.rentAPI
        },
        data: data
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data;
}

/* TYPE VEHICLES API */
exports.getAllTypesOfVehicles = async function () {
    var config = {
        method: 'get',
        url: 'http://localhost:4000/v1/typevehicle/',
        headers: {
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data
}

exports.getVehicleTypeByName = async function (nameTypeVehicle) {

    var config = {
        method: 'get',
        url: 'http://localhost:4000/v1/typevehicle/' + nameTypeVehicle,
        headers: {
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data
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
            'Content-Type': 'application/json',
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        },
        data: data
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data;
}

exports.updateUserMoney = async function (email, money, operation) {

    var config = {
        method: 'patch',
        url: 'http://localhost:3000/v1/user/' + email + '/' + money + '/' + operation,
        headers: {
            'Content-Type': 'application/json',
            'user-api-token': apiTokens.userAPI,
            'rent-api-token': apiTokens.rentAPI
        },
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data;
}

/* VEHICLES API */
exports.getAllVehicles = async function () {

    var config = {
        method: 'get',
        url: 'http://localhost:4000/v1/vehicle/',
        headers: {
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });
    return data;
}

exports.getVehicleByID = async function(vehicleID){

    var config = {
        method: 'get',
        url: 'http://localhost:4000/v1/vehicle/' + vehicleID,
        headers: {
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });
    return data;
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
            'Content-Type': 'application/json',
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        },
        data: data
    };


    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data;

}

exports.getAllFreeVehiclesByType = async function (dateUntilItIsBusy, nameTypeVehicle, source, userDistance) {
    let distance = (userDistance) ? userDistance : 10;
    let url = 'http://localhost:4000/v1/vehicle/getAllFreeVehiclesByType/' + dateUntilItIsBusy + '/' + nameTypeVehicle + '/' + source.lat + '/' + source.long + '/' + distance
    var config = {
        method: 'get',
        url: url,
        headers: {
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        }
    };

    console.log(url)

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });
    return data;
}

exports.updateVehicleUtilizationDate = async function (idVehicle, dateUntilItIsBusy, location, isBusy, lat, long) {

    var data = JSON.stringify({
        "dateUntilItIsBusy": dateUntilItIsBusy,
        "location": location,
        "isBusy": isBusy,
        "lat": lat,
        "long": long
    });

    var config = {
        method: 'patch',
        url: 'http://localhost:4000/v1/vehicle/' + idVehicle,
        headers: {
            'Content-Type': 'application/json',
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        },
        data: data
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });
    return data;
}

exports.updateVehicleCharge = async function (idVehicle, chargeValue, operation) {

    var config = {
        method: 'patch',
        url: 'http://localhost:4000/v1/vehicle/' + idVehicle + '/' + chargeValue + '/' + operation,
        headers: {
            'Content-Type': 'application/json',
            'vehicle-api-token': apiTokens.vehicleAPI,
            'rent-api-token': apiTokens.rentAPI
        },
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
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
            'Content-Type': 'application/json',
            'route-price-token': apiTokens.routPriceAPI,
            'rent-api-token': apiTokens.rentAPI
        },
        data: data
    };

    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
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
            'Content-Type': 'application/json',
            'rental-requests-api-token': apiTokens.rentalRequestAPI,
            'rent-api-token': apiTokens.rentAPI
        },
        data: data
    };


    var data = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return data;

}

exports.getUserAgeAndGender = async function (filePath) {
    let FormData = require('form-data');
    let fs = require('fs');
    let data = new FormData();
    data.append('image', fs.createReadStream(filePath));

    let config = {
        method: 'post',
        url: 'http://localhost:9000/api/predict',
        headers: {
            'python-api-token': apiTokens.pythonAPI,
            ...data.getHeaders()
        },
        data: data
    };

    let finalData = await axios(config)
        .then(function (response) {
            return JSON.stringify(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return finalData;

}


exports.verifyUserToken = async function () {
    var config = {
        method: 'get',
        url: 'http://localhost:3000/v1/user/verifytoken',
        headers: {
            'x-access-token': userToken.token
        }
    };

    let finalData = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });

    return finalData;
}

exports.stopRent = async function (travelUniqueID, emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate) {
    var data = JSON.stringify({
        "travelUniqueID": travelUniqueID,
        "emailUser": emailUser,
        "destiny": destiny,
        "source": source,
        "travelCost": travelCost,
        "travelDuration": travelDuration,
        "typeVehicle": typeVehicle,
        "idVehicle": idVehicle,
        "travelStartDate": travelStartDate,
        "travelEndDate": new Date(),
        "stateOfTravel": "Ended By user",
        "realTravelEndDate": new Date(),
        "status": "Ended By User",
    });

    var config = {
        method: 'post',
        url: 'http://127.0.0.1:1880/resetTravel',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    let finalData = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                return error.response.data
            }
        });
    
    return finalData;
}