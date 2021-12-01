const TypeVehicle = require('../../models/v1/TypeVehicle');
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

//save new type Vehicle
exports.addTypeVehicle = async function (idTypeVehicle, nameTypeVehicle, priceByHourTypeVehicle) {
    
    const typeVehicle = new TypeVehicle({
        idTypeVehicle : idTypeVehicle,
        nameTypeVehicle : nameTypeVehicle,
        priceByHourTypeVehicle : priceByHourTypeVehicle
    });

    console.log(typeVehicle)

    try {
        const finalTypeVehicle = await typeVehicle.save();

        return { success: 201, body: finalTypeVehicle };

    } catch (err) {
        return { success: 400, body: err };
    }
}