const utils = require('../../utils/utils')
const user = require('../../../configs/user.json')

//getAllTypesOfVehicles
exports.getAllTypesOfVehicles = async function () {
    console.log('aqui')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {
                let results = await utils.getAllTypesOfVehicles();
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }
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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

exports.addNewTypeOfVehicle = async function (idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {

                let results = await utils.addNewTypeOfVehicle(idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle);
                if (results['code']) {
                    if (results['code'] === 11000) {
                        return {
                            success: 400,
                            body: 'Invalid key value: ' + results.keyValue.idTypeVehicle
                        };
                    } else {
                        return {
                            success: 400,
                            body: 'Bad Request'
                        };
                    }
                }

                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }


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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}


//get type vehicles by name
exports.getVehicleTypeByName = async function (nameTypeVehicle) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null) {
            try {
                let results = await utils.getVehicleTypeByName(nameTypeVehicle);
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }
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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}


//getAllVehicles
exports.getAllVehicles = async function () {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {
                let results = await utils.getAllVehicles();
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }
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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

//getAllVehicles
exports.getVehicleByID = async function (vehicleID) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {
                let results = await utils.getVehicleByID(vehicleID);
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }
                if (results) {
                    return {
                        success: 200,
                        body: results
                    };
                } else {
                    return {
                        success: 204,
                        body: 'No vehicle founded with that ID!'
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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

exports.addNewVehicle = async function (idVehicle, isBusy, idTypeVehicle, location, latLocation, lagLocation, vehicleChargePercentage, isBusy) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {

                let results = await utils.addNewVehicle(idVehicle, isBusy, idTypeVehicle, location, latLocation, lagLocation, vehicleChargePercentage, isBusy);

                if (results['code']) {
                    if (results['code'] === 11000) {
                        return {
                            success: 400,
                            body: 'Invalid key value: ' + results.keyValue.idVehicle
                        };
                    } else {
                        return {
                            success: 400,
                            body: 'Bad Request'
                        };
                    }
                }

                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }

                if (!results) {
                    return {
                        success: 204,
                        body: "Error on add a new vehicle!"
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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

//get type vehicles by name
exports.getAllFreeVehiclesByType = async function (dateUntilItIsBusy, type, userPosLat, userPosLong, userDistance) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null) {
            try {
                let origin = {
                    lat: userPosLat,
                    long: userPosLong
                }
                let results = await utils.getAllFreeVehiclesByType(dateUntilItIsBusy, type, origin, userDistance);
                
                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }

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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

exports.updateVehicleUtilizationDate = async function (idVehicle, dateUntilItIsBusy, location, isBusy) {
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null) {
            try {
                let results = await utils.updateVehicleUtilizationDate(idVehicle, dateUntilItIsBusy, location, isBusy);

                if (results === 'API token required.') {
                    return {
                        success: 403,
                        body: "API token required."
                    };
                }


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
                success: 403,
                body: "Unauthorized"
            };
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
};

exports.updateVehicleCharge = async function (idVehicle, chargeValue, operation) {
    try {
        let results = await utils.updateVehicleCharge(idVehicle, chargeValue, operation);

        if (results === 'API token required.') {
            return {
                success: 403,
                body: "API token required."
            };
        }

        if (!results) {
            return {
                success: 404,
                body: results.statusCode
            };
        } else {
            return {
                success: 201,
                body: results
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}