'use strict';

const Rent = require('../../models/v1/Rent');
const express = require("express");
const utils = require('../../utils/utils')
const user = require('../../../configs/user.json')

//get all rental records
// only for admins
exports.getAllRentalRecords = async function () {
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
}

//get all rental records by user
// only for admins
exports.getAllUserRentalRecords = async function (emailUser) {
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
}

//save new type Vehicle
exports.addRental = async function (emailUser, destiny, source, typeVehicle, travelDate) {
    if (user && user.hasOwnProperty('token') && user.token != null) {
        // get user info - idade e dinheiro - para verificar se tem mais de 16 anos (User)
        let getUser = await utils.getUserByEmail(emailUser);
        getUser = getUser[Math.floor(Math.random() * getUser.length)];
        // registar hora de inicio
        let newTravelDate = new Date(travelDate).toISOString();
        // ir buscar um carro do tipo x mais perto e livre (Vehicle)
        let vehicle = await utils.getAllFreeVehiclesByType(newTravelDate, typeVehicle);
   

        //with will return an array of cars or just one car
        // check if it is only one car ou more
        // if is more than or car, make the  api call to get closest vehicle

        // just an example, i will get random value from array
        
        // check if we have available vehicles
        if (vehicle.length === 0){
            return {
                success: 204,
                body: "No vehicles available."
            };
        }
        vehicle = vehicle[Math.floor(Math.random() * vehicle.length)];


        // calcular o preço da viagem e rota mais perto (RoutePrice)
        let routePrice = await utils.addRoutePrice(source, destiny, typeVehicle, vehicle.priceByHourTypeVehicle);

        // no final do aluguer, registar hora do fim e localização do veiculo

 
        // o sistema fará uma primeira verificar para perceber se o utilizador tem dinheiro para iniciar o aluguer
        if (getUser.email == user.email && getUser.age > 16 && parseInt(getUser.money) > parseInt(routePrice.price)) {


            try {

                // send request to Rental Requests Register(mqtt / node-red) to simulate the car behavior
                // data request: source, destiny, typeVehicle, travelDate, travelDuration

                let travelUniqueID = Date.now().toString();

                let results = await utils.addRentRegister(travelUniqueID, emailUser, routePrice.price, vehicle.idVehicle, source, destiny, typeVehicle, travelDate, routePrice.timeOfTravel);


                if (results) {


                    const rentRecord = new Rent({
                        travelUniqueID: travelUniqueID,
                        emailUser: getUser.email,
                        destiny: destiny,
                        source: source,
                        travelCost: routePrice.price,
                        travelDuration: routePrice.timeOfTravel,
                        typeVehicle: typeVehicle,
                        idVehicle: vehicle.idVehicle,
                        travelStartDate: travelDate,
                        stateOfTravel: "In process"
                    });

                    var finalRentRecord;
                    try{
                        finalRentRecord = await rentRecord.save();
                    }catch (err) {
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
            success: 404,
            body: "Unauthorized"
        };
    }
}

//save new type Vehicle
exports.saveRental = async function (emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate, travelEndDate, travelUniqueID) {
    if (user && user.hasOwnProperty('token') && user.token != null) {

        //service that will save the data sended by node-red 

        // CREATE NEW ROUTE TO RECEIVE THE REQUESTS FROM NODE-RED

        try {

            // then update car property "dateUntilItIsBusy" to the date it will be busy and final location of the car with the destination
            // (mqtt / node-red) will simulate the car behavior and set the rent property "travelEndDate" with the date that the rent will be over
            let results = await utils.updateVehicleUtilizationDate(idVehicle, travelEndDate, destiny);

            // also update user money atual - cost of travel
            let userUpdated = await utils.updateUserMoney(emailUser, travelCost, "remove");


            if (results && userUpdated) {

                const rentRecord = new Rent({
                    travelUniqueID: travelUniqueID,
                    emailUser: emailUser,
                    destiny: destiny,
                    source: source,
                    travelCost: travelCost,
                    travelDuration: travelDuration,
                    typeVehicle: typeVehicle,
                    idVehicle: idVehicle,
                    travelStartDate: travelStartDate,
                    travelEndDate: travelEndDate,
                    stateOfTravel: "Rent processed."
                });

                let finalRentRecord;
                try{
                    finalRentRecord = await rentRecord.save();
                }catch(err){
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
            success: 404,
            body: "Unauthorized"
        };
    }
}