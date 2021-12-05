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
    if (user && user.hasOwnProperty('token') && user.token != null) {
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
        console.log("USER")
        console.log(getUser)
        // registar hora de inicio
        let travelDate = new Date().toISOString();
        // ir buscar um carro do tipo x mais perto e livre (Vehicle)
        let vehicle = await utils.getAllFreeVehiclesByType(travelDate, typeVehicle);
        console.log("VEHICLE")

        //with will return an array of cars or just one car
        // check if it is only one car ou more
        // if is more than or car, make the  api call to get closest vehicle

        // just an example, i will get random value from array

        vehicle = vehicle[Math.floor(Math.random() * vehicle.length)];
        console.log(vehicle)


        // calcular o preço da viagem e rota mais perto (RoutePrice)
        let routePrice = await utils.addRoutePrice(source, destiny, typeVehicle, vehicle.priceByHourTypeVehicle);
        console.log("ROUTEPRICE")
        console.log(routePrice)
        // no final do aluguer, registar hora do fim e localização do veiculo

        console.log(getUser.email == user.email)
        console.log(getUser.age > 16)
        console.log(getUser.money)
        console.log(routePrice.price)
        console.log(getUser.money > routePrice.price)

        // o sistema fará uma primeira verificar para perceber se o utilizador tem dinheiro para iniciar o aluguer
        if (getUser.email == user.email && getUser.age > 16 && parseInt(getUser.money) > parseInt(routePrice.price)) {

            console.log("dentro if")

            try {

                // send request to Rental Requests Register(mqtt / node-red) to simulate the car behavior

                // (mqtt / node-red) will simulate the car behavior and set the rent property "travelEndDate" with the date that the rent will be over

                // then update car property "dateUntilItIsBusy" to the date it will be busy

                // save the record

                /*const rentRecord = new Rent({
                    emailUser: emailUser,
                    destiny: destiny,
                    source: source,
                    travelCost: travelCost,
                    timeTravel: timeTravel,
                    typeVehicle: typeVehicle,
                    idVehicle: idVehicle,
                    travelDate: travelDate
                });
                */

                // finalRentRecord = await rentRecord.save();

                
                let finalRentRecord = "10";
                return {
                    success: 201,
                    body: finalRentRecord
                };

            } catch (err) {
                return {
                    success: 400,
                    body: err
                };
            }
        } else {
            console.log("dentro else")
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