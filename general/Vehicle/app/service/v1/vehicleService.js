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
exports.addVehicle = async function (idTypeVehicle, isBusy, idVehicle, location) {

    let typeVehicle = await TypeVehicle.findById(idTypeVehicle);

    if (typeVehicle) {

        const vehicle = new Vehicle({
            idVehicle: idVehicle,
            isBusy: isBusy,
            typeVehicle: typeVehicle,
            location: location,
            nameTypeVehicle: typeVehicle.nameTypeVehicle,
            priceByHourTypeVehicle: typeVehicle.priceByHourTypeVehicle
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
exports.getAllFreeVehiclesByType = async function (isBusy, nameTypeVehicle) {
    try {

        const vehicles = await Vehicle.find({
            "isBusy": isBusy,
            "nameTypeVehicle": nameTypeVehicle
        });

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

exports.updateVehicleState = async function (idVehicle, isBusy) {
    try {

        let vehicle = await Vehicle.findOneAndUpdate({
            "idVehicle": idVehicle
        }, {
            $set: {
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