const Vehicle = require('../../models/v1/Vehicle');
const TypeVehicle = require('../../models/v1/TypeVehicle');
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


function getCurrentCapacity(typeOfehicle, atualCharge) {
    let currentCapacity;
    switch (typeOfehicle) {
        case 'Car':
            currentCapacity = atualCharge * 1.3 + " Km";
            break;
        case 'Van':
            currentCapacity = atualCharge * 1.4 + " Km";
            break;
        case 'Scooter':
            currentCapacity = atualCharge * 1.5 + " Km";
            break;
        case 'Truck':
            currentCapacity = atualCharge * 1.6 + " Km";
            break;
        default:
            currentCapacity = atualCharge * 2 + " Km";
    }
    return currentCapacity.toString();

}

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
            let auxArray = [];
            for(let i = 0; i < vehicles.length; i++){
                let aux = vehicles[i].toObject();
                aux['capacity'] = getCurrentCapacity(aux.nameTypeVehicle, aux.vehicleChargePercentage);
                auxArray.push(aux);
            }
            return {
                success: 200,
                body: auxArray
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
            let finalVehicle = vehicle[0].toObject();
            finalVehicle['capacity'] = getCurrentCapacity(finalVehicle.nameTypeVehicle, finalVehicle.vehicleChargePercentage);
            return {
                success: 200,
                body: finalVehicle
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

function distance(lat1, lon1, lat2, lon2, unit) {
    let radlat1 = Math.PI * lat1 / 180
    let radlat2 = Math.PI * lat2 / 180
    let theta = lon1 - lon2
    let radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist
}

// get all free vehicles
exports.getAllFreeVehiclesByType = async function (dateUntilItIsBusy, nameTypeVehicle, userPosLat, userPosLong, userDistance) {

    try {
        //retorna todos os vehicles cujo a data de ocupado é inferior à data recebida por parametro 
        const vehicles = await Vehicle.find({
            'dateUntilItIsBusy': {
                $lte: dateUntilItIsBusy
            },
            "nameTypeVehicle": nameTypeVehicle,
            "isBusy": false
        });

        let availableVehicles = [];

        for (let i = 0; i < vehicles.length; i++) {
            // if this location is within {userDistance} of the user, add it to the list
            if (distance(userPosLat, userPosLong, vehicles[i].latLocation, vehicles[i].lagLocation, "K") <= parseInt(userDistance)) {
                console.log(vehicles[i])
                let aux = vehicles[i].toObject();
                aux['capacity'] = getCurrentCapacity(aux.nameTypeVehicle, aux.vehicleChargePercentage);
                availableVehicles.push(aux);
            }
        }


        if (!availableVehicles.length) {
            return {
                success: 204,
                body: "There's no free vehicles!"
            };
        } else {
            return {
                success: 200,
                body: availableVehicles
            };
        }
    } catch (err) {
        return {
            success: 400,
            body: err
        };
    }
};

exports.updateVehicleUtilizationDate = async function (idVehicle, dateUntilItIsBusy, location, isBusy, vehicleLat, vehicleLong) {
    try {

        let vehicle = await Vehicle.findOneAndUpdate({
            "idVehicle": idVehicle
        }, {
            $set: {
                dateUntilItIsBusy: dateUntilItIsBusy,
                location: location,
                isBusy: isBusy,
                latLocation: vehicleLat,
                lagLocation: vehicleLong
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


        if (operation == "add") {
            updatedCharge = parseInt(auxUser[0].vehicleChargePercentage) + parseInt(chargeValue);
        } else {
            updatedCharge = parseInt(auxUser[0].vehicleChargePercentage) - parseInt(chargeValue);
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

            if (vehicleUpdated[0].vehicleChargePercentage < 0) {
                return {
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