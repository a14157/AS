'use strict';

const Rent = require('../../models/v1/Rent');
const express = require("express");
const utils = require('../../utils/utils')

// get all rental records
// only for admins
exports.getAllRentalRecords = async function () {
    let user = require('../../../configs/user.json')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.hasOwnProperty('profile') && user.profile == 'admin') {
            try {
                const rentalRecords = await Rent.find();
                if (!(rentalRecords.length)) {
                    return {
                        success: 204,
                        body: "There's no rental records registered in our system!"
                    };
                } else {
                    return {
                        success: 200,
                        body: rentalRecords
                    };
                }
            } catch (err) {
                return {
                    success: 400,
                    body: err
                };
            }
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

//get all rental records by user
// only for admins
exports.getAllUserRentalRecords = async function (emailUser) {
    let user = require('../../../configs/user.json')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null && user.email == emailUser) {
            try {
                const rentalRecords = await Rent.find({
                    "emailUser": emailUser
                });

                if (!(rentalRecords.length)) {
                    return {
                        success: 204,
                        body: "There's no rental records registered in our system!"
                    };
                } else {
                    return {
                        success: 200,
                        body: rentalRecords
                    };
                }
            } catch (err) {
                return {
                    success: 400,
                    body: err
                };
            }
        }
    } else {
        return {
            success: 403,
            body: "Unauthorized"
        };
    }
}

//save new  rent
exports.addRental = async function (emailUser, destiny, source, typeVehicle, travelDate) {
    let user = require('../../../configs/user.json')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null) {
            // get user info - idade e dinheiro - para verificar se tem mais de 16 anos (User)
            let getUser = await utils.getUserByEmail(emailUser);
            if (getUser.length === 0 || getUser == null) {
                return {
                    success: 404,
                    body: "Invalid user."
                };
            }

            getUser = getUser[Math.floor(Math.random() * getUser.length)];

            // registar hora de inicio
            let newTravelDate = new Date(travelDate).toISOString();
            // ir buscar um carro do tipo x mais perto e livre (Vehicle)
            let vehicle = await utils.getAllFreeVehiclesByType(newTravelDate, typeVehicle, source, 50);

            //with will return an array of cars or just one car
            // check if it is only one car ou more
            // if is more than or car, make the  api call to get closest vehicle

            // just an example, i will get random value from array

            // check if we have available vehicles
            if (vehicle.length === 0 || vehicle == null) {
                return {
                    success: 204,
                    body: "No vehicles available."
                };
            }
            vehicle = vehicle[Math.floor(Math.random() * vehicle.length)];

            // calcular o preço da viagem e rota mais perto (RoutePrice)
            let routePrice = await utils.addRoutePrice(source, destiny, typeVehicle, vehicle.priceByHourTypeVehicle);

            if (routePrice === 'API token required.') {
                return {
                    success: 403,
                    body: "API token required."
                };
            }

            if (routePrice.length === 0 || routePrice == null) {
                return {
                    success: 204,
                    body: "Error on getting a route price."
                };
            }


            let auxArrivalPoint = JSON.parse(routePrice.arrivalPoint);
            let auxStartPoint = JSON.parse(routePrice.startingPoint);


            // update vehicle to be busy
            let updateVehicle = await utils.updateVehicleUtilizationDate(vehicle.idVehicle, newTravelDate, auxArrivalPoint.streetName, true, auxArrivalPoint.lat, auxArrivalPoint.long)
            if (updateVehicle.length === 0 || updateVehicle == null) {
                return {
                    success: 204,
                    body: "Error on update vehicle."
                };
            }

            // no final do aluguer, registar hora do fim e localização do veiculo


            // o sistema fará uma primeira verificar para perceber se o utilizador tem dinheiro para iniciar o aluguer
            if (getUser.email == user.email && getUser.age > 16 && parseInt(getUser.money) > parseInt(routePrice.price)) {


                try {

                    // send request to Rental Requests Register(mqtt / node-red) to simulate the car behavior
                    // data request: source, destiny, typeVehicle, travelDate, travelDuration

                    let travelUniqueID = Date.now().toString();

                    let results = await utils.addRentRegister(travelUniqueID, emailUser, routePrice.price, vehicle.idVehicle, auxStartPoint.streetName, auxArrivalPoint.streetName, typeVehicle, travelDate, routePrice.timeOfTravel);

                    if (results === 'API token required.') {
                        return {
                            success: 403,
                            body: "API token required."
                        };
                    }

                    if (results) {


                        const rentRecord = new Rent({
                            travelUniqueID: travelUniqueID,
                            emailUser: getUser.email,
                            destiny: auxArrivalPoint.streetName,
                            source: auxStartPoint.streetName,
                            travelCost: routePrice.price,
                            travelDuration: routePrice.timeOfTravel,
                            typeVehicle: typeVehicle,
                            idVehicle: vehicle.idVehicle,
                            travelStartDate: travelDate,
                            stateOfTravel: "In process"
                        });

                        var finalRentRecord;
                        try {
                            finalRentRecord = await rentRecord.save();
                        } catch (err) {
                            console.log(err)
                        };



                        // CREATE NEW ROUTE TO RECEIVE THE REQUESTS FROM NODE-RED

                        // (mqtt / node-red) will simulate the car behavior and set the rent property "travelEndDate" with the date that the rent will be over

                        // then update car property "dateUntilItIsBusy" to the date it will be busy and final location of the car with the destination

                        return {
                            success: 201,
                            body: finalRentRecord
                        };

                    } else {
                        return {
                            success: 400,
                            body: "Record not sent to Node-Red."
                        };
                    }


                    // save the record

                } catch (err) {
                    return {
                        success: 400,
                        body: err
                    };
                }
            } else {
                return {
                    success: 400,
                    body: "Age or cost of travel higher than that available on the account."
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

//save new type Vehicle
exports.saveRental = async function (emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate, travelEndDate, travelUniqueID, status) {
    let user = require('../../../configs/user.json')
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null) {

            //service that will save the data sended by node-red 

            if (status == null) {
                return {
                    success: 404,
                    body: "Status is required."
                };
            }

            // CREATE NEW ROUTE TO RECEIVE THE REQUESTS FROM NODE-RED

            /*console.log(emailUser)
            console.log(destiny)
            console.log(source)
            console.log(travelCost)
            console.log(travelDuration)
            console.log(idVehicle)
            console.log(travelStartDate)
            console.log(travelEndDate)
            console.log(travelUniqueID)
            console.log(status)*/

            try {

                // then update car property "dateUntilItIsBusy" to the date it will be busy and final location of the car with the destination
                // (mqtt / node-red) will simulate the car behavior and set the rent property "travelEndDate" with the date that the rent will be over
                let results = await utils.updateVehicleUtilizationDate(idVehicle, travelEndDate, destiny, false);
                //console.log(results)
                // also update user money atual - cost of travel

                if (results) {

                    const rentRecord = new Rent({
                        travelUniqueID: travelUniqueID,
                        emailUser: emailUser,
                        destiny: destiny,
                        source: source,
                        travelCost: travelCost,
                        travelDuration: travelDuration,
                        typeVehicle: typeVehicle,
                        idVehicle: idVehicle,
                        travelStartDate: (status === 'Out of Charge' || status === 'Out of Money') ? travelStartDate.setTime(travelStartDate.getTime() + 1000 * 60) : travelStartDate, // add minute to stop car safety
                        travelEndDate: travelEndDate,
                        stateOfTravel: status,
                        realTravelEndDate: new Date().toISOString()
                    });

                    let finalRentRecord;
                    try {
                        finalRentRecord = await rentRecord.save();
                    } catch (err) {
                        console.log(err)
                    }


                    // CREATE NEW ROUTE TO RECEIVE THE REQUESTS FROM NODE-RED

                    // (mqtt / node-red) will simulate the car behavior and set the rent property "travelEndDate" with the date that the rent will be over

                    // then update car property "dateUntilItIsBusy" to the date it will be busy and final location of the car with the destination

                    // also update user money atual - cost of travel

                    return {
                        success: 201,
                        body: finalRentRecord
                    };

                } else {
                    return {
                        success: 400,
                        body: "Vehicle or user no updated. Rent was not save."
                    };
                }


                // save the record

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


//stop rent
exports.stopRent = async function (travelUniqueID, emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate) {
    let user = require('../../../configs/user.json') 
    let checkToken = await utils.verifyUserToken();
    if (checkToken.hasOwnProperty('auth') && checkToken.auth === true) {
        if (user && user.hasOwnProperty('token') && user.token != null) {
            try {

                const rentalRecords = await Rent.find({
                    "travelUniqueID": travelUniqueID
                });

                // check if exists any rental with this ID and if is in process
                if(rentalRecords.length === 0 && rentalRecords[0].stateOfTravel !== "In process"){
                    return {
                        success: 404,
                        body: 'No rental founded with that ID.'
                    };
                }

                let results = await utils.stopRent(travelUniqueID, emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate);

                if (results) {
                    return {
                        success: 200,
                        body: rentalRecords
                    };
                } else {
                    return {
                        success: 404,
                        body: 'Error on stoping the rent!'
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
    }
}