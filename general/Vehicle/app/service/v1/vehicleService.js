const Vehicle = require('../../models/v1/Vehicle');
const TypeVehicle = require('../../models/v1/TypeVehicle');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//get all vehicles
exports.getAll = async function () {
    try {
        const vehicles = await Vehicle.find();
        if (!(vehicles.length)) {
            return {
                success: 204,
                body: "There's no vehicles registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: vehicles
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//get one vehicle
exports.getVehicle = async function (idVehicle) {
    try {

        const vehicle = await Vehicle.find({
            "idVehicle": idVehicle
        });

        if (!vehicle.length) {
            return {
                success: 204,
                body: "There's no vehicle registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: vehicle
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//add one vehicle
exports.addVehicle = async function (idTypeVehicle, dateUntilItIsBusy, idVehicle, location, latLocation, lagLocation, vehicleChargePercentage, isBusy) {

    let typeVehicle = await TypeVehicle.findById(idTypeVehicle);

    if (typeVehicle) {

        const vehicle = new Vehicle({
            idVehicle: idVehicle,
            dateUntilItIsBusy: dateUntilItIsBusy,
            typeVehicle: typeVehicle,
            location: location,
            nameTypeVehicle: typeVehicle.nameTypeVehicle,
            priceByHourTypeVehicle: typeVehicle.priceByHourTypeVehicle,
            latLocation: latLocation,
            lagLocation: lagLocation,
            vehicleChargePercentage: vehicleChargePercentage,
            isBusy: isBusy
        });

        try {
            const finalVehicle = await vehicle.save();

            return {
                success: 201,
                body: finalVehicle
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
            body: "Type of vehicle not found!"
        };
    }
}


// get all free vehicles
exports.getAllFreeVehiclesByType = async function (dateUntilItIsBusy, nameTypeVehicle) {
    console.log('getAllFreeVehiclesByType')
    try {
        //retorna todos os vehicles cujo a data de ocupado é inferior à data recebida por parametro
        const vehicles = await Vehicle.find({
            'dateUntilItIsBusy': { $lte: dateUntilItIsBusy },
            "nameTypeVehicle": nameTypeVehicle,
            "isBusy": false
        });

        console.log(vehicles)


        if (!(vehicles.length)) {
            return {
                success: 204,
                body: "There's no free vehicles!"
            };
        } else {
            return {
                success: 200,
                body: vehicles
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
};

exports.updateVehicleUtilizationDate = async function (idVehicle, dateUntilItIsBusy, location, isBusy) {
    try {

        let vehicle = await Vehicle.findOneAndUpdate({
            "idVehicle": idVehicle
        }, {
            $set: {
                dateUntilItIsBusy: dateUntilItIsBusy,
                location: location,
                isBusy: isBusy
            }
        });


        const vehicleUpdated = await Vehicle.find({
            "idVehicle": idVehicle
        });

        if (vehicle) {
            return {
                success: 200,
                body: vehicleUpdated
            };
        } else {
            return {
                success: 204,
                body: "There's no vehicle registered in our system with that ID!"
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }

};

exports.updateVehicleCharge = async function (idVehicle, chargeValue, operation) {
    try {

        const auxUser = await Vehicle.find({
            "idVehicle": idVehicle
        });

        // add logic
        // add or remove money from user
        let updatedCharge;

        
        if(operation == "add"){
            updatedCharge =  parseInt(auxUser[0].vehicleChargePercentage) + parseInt(chargeValue);
        }else{
            updatedCharge =  parseInt(auxUser[0].vehicleChargePercentage) - parseInt(chargeValue);
        }

        let vehicle = await Vehicle.findOneAndUpdate({
            "idVehicle": idVehicle
        }, {
            $set: {
                vehicleChargePercentage: updatedCharge
            }
        });


        const vehicleUpdated = await Vehicle.find({
            "idVehicle": idVehicle
        });



        if (vehicle) {

            if(vehicleUpdated[0].vehicleChargePercentage < 0){
                return{
                    success: 200,
                    body: {
                        message: "Vehicle without charge.",
                        statusCode: 400
                    }

                    
                }
            }


            return {
                success: 200,
                body: vehicleUpdated
            };
        } else {
            return {
                success: 204,
                body: "There's no vehicle registered in our system with that ID!"
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }

};