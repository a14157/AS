const utils = require('../../utils/utils')
const user = require('../../../configs/user.json')

//getAllTypesOfVehicles
exports.getAllTypesOfVehicles = async function () {
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {
            let results = await utils.getAllTypesOfVehicles();
            if (!(results.length)) {
                return {
                    success: 204,
                    body: "There's no types of vehicles registered in our system!"
                };
            } else {
                return {
                    success: 200,
                    body: results
                };
            }
        } catch (err) {
            return {
                success: 400,
                body: err
            };
        }
    } else {
        return {
            success: 404,
            body: "Unauthorized"
        };
    }
}

exports.addNewTypeOfVehicle = async function (idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle) {
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {

            let results = await utils.addNewTypeOfVehicle(idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle); 

            console.log(results)
            if (!results) {
                return {
                    success: 204,
                    body: "Error"
                };
            } else {
                return {
                    success: 200,
                    body: results
                };
            }
        } catch (err) {
            return {
                success: 400,
                body: err
            };
        }
    } else {
        return {
            success: 404,
            body: "Unauthorized"
        };
    }
}


//get type vehicles by name
exports.getVehicleTypeByName = async function (nameTypeVehicle) {
    if (user && user.hasOwnProperty('token') && user.token != null) {
        try {
            let results = await utils.getVehicleTypeByName(nameTypeVehicle);
            if (!(results.length)) {
                return {
                    success: 204,
                    body: "Error"
                };
            } else {
                return {
                    success: 200,
                    body: results
                };
            }
        } catch (err) {
            return {
                success: 400,
                body: err
            };
        }
    } else {
        return {
            success: 404,
            body: "Unauthorized"
        };
    }
}


//getAllVehicles
exports.getAllVehicles = async function () {
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {
            let results = await utils.getAllVehicles();
            if (!(results.length)) {
                return {
                    success: 204,
                    body: "Error"
                };
            } else {
                return {
                    success: 200,
                    body: results
                };
            }
        } catch (err) {
            return {
                success: 400,
                body: err
            };
        }
    } else {
        return {
            success: 404,
            body: "Unauthorized"
        };
    }
}

exports.addNewVehicle = async function (idVehicle, isBusy, idTypeVehicle, location) {
    if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
        try {

            let results = await utils.addNewVehicle(idVehicle, isBusy, idTypeVehicle, location); 

            console.log(results)
            if (!results) {
                return {
                    success: 204,
                    body: "There's no types of vehicles registered in our system!"
                };
            } else {
                return {
                    success: 200,
                    body: results
                };
            }
        } catch (err) {
            return {
                success: 400,
                body: err
            };
        }
    } else {
        return {
            success: 404,
            body: "Unauthorized"
        };
    }
}

