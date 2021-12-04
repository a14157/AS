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
        let result = await utils.getUserByEmail(emailUser);
        //console.log(result)
        // registar hora de inicio
        console.log(travelDate)
        // o sistema fará uma primeira verificar para perceber se o utilizador tem dinheiro para iniciar o aluguer
        // ir buscar um carro do tipo x mais perto e livre (Vehicle)
        // calcular o preço da viagem e rota mais perto (RoutePrice)
        // no final do aluguer, registar hora do fim e localização do veiculo

        consooe.log(startRent)
        console.log(result)

        try {

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
            let finalRentRecord = 10;
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
        return {
            success: 404,
            body: "Unauthorized"
        };
    }
}