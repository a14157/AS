const TypeVehicle = require('../../models/v1/TypeVehicle');
const Vehicle = require('../../models/v1/Vehicle');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//get all type vehicles
exports.getAll = async function () {
    try {
        const typeVehicles = await TypeVehicle.find();
        if (!(typeVehicles.length)) {
            return {
                success: 204,
                body: "There's no type vehicles registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: typeVehicles
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//get type vehicles by name
exports.getVehicleTypeByName = async function (nameTypeVehicle) {
    try {
        const typeVehicles = await TypeVehicle.find({
            "nameTypeVehicle": nameTypeVehicle
        });
        if (!(typeVehicles.length)) {
            return {
                success: 204,
                body: "There's no type vehicles registered in our system!"
            };
        } else {
            return {
                success: 200,
                body: typeVehicles
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}


//save new type Vehicle
exports.addTypeVehicle = async function (idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle) {

    const typeVehicle = new TypeVehicle({
        idTypeVehicle: idTypeVehicle,
        nameTypeVehicle: nameTypeVehicle,
        priceByHourTypeVehicle: priceByHourTypeVehicle
    });

    try {
        const finalTypeVehicle = await typeVehicle.save();

        return {
            success: 201,
            body: finalTypeVehicle
        };

    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}

//edit price by hour of type of vehicle
exports.updatePriceByHour = async function (idTypeVehicle, priceByHourTypeVehicle) {
    try {

        let typeOfVehicle = await TypeVehicle.findOneAndUpdate({
            "idTypeVehicle": idTypeVehicle
        }, {
            $set: {
                priceByHourTypeVehicle: priceByHourTypeVehicle,
            }
        });

        const typeOfVehicleUpdated = await TypeVehicle.find({
            "idTypeVehicle": idTypeVehicle
        });

        const vehicles = await Vehicle.find({
            "nameTypeVehicle": typeOfVehicleUpdated[0].nameTypeVehicle,
        });

        for(let i = 0; i < vehicles.length; i++){
            let vehicle = await Vehicle.findOneAndUpdate({
                "idVehicle": vehicles[i].idVehicle
            }, {
                $set: {
                    priceByHourTypeVehicle: priceByHourTypeVehicle,
                }
            });
        }

        if (typeOfVehicleUpdated) {
            return {
                success: 200,
                body: typeOfVehicleUpdated
            };
        } else {
            return {
                success: 204,
                body: "There's no type vehicle registered in our system with that ID!"
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
}