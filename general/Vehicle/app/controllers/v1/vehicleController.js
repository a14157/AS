const vehicleService = require('../../service/v1/vehicleService');
const apiTokens = require('../../config/apiTokens.json');

exports.getAllVehicles = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            const result = await vehicleService.getAll();
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.getAllFreeVehiclesByType = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let dateUntilItIsBusy = new Date(req.params.dateUntilItIsBusy).toISOString();
            let type = req.params.type;
            let userPosLat = req.params.userPosLat;
            let userPosLong = req.params.userPosLong;
            let userDistance = req.params.distance;
            const result = await vehicleService.getAllFreeVehiclesByType(dateUntilItIsBusy, type, userPosLat, userPosLong, userDistance);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.getVehicle = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let idVehicle = req.params.idVehicle;
            const result = await vehicleService.getVehicle(idVehicle);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.addVehicle = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let idVehicle = req.body.idVehicle;
            let dateUntilItIsBusy = new Date().toISOString();
            let idTypeVehicle = req.body.idTypeVehicle;
            let location = req.body.location;
            let latLocation = req.body.latLocation;
            let lagLocation = req.body.lagLocation;
            let vehicleChargePercentage = req.body.vehicleChargePercentage;
            let isBusy = req.body.isBusy;
            const result = await vehicleService.addVehicle(idTypeVehicle, dateUntilItIsBusy, idVehicle, location, latLocation, lagLocation, vehicleChargePercentage, isBusy);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.updateVehicleState = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let idVehicle = req.params.idVehicle;
            let dateUntilItIsBusy = new Date(req.body.dateUntilItIsBusy).toISOString();
            let location = req.body.location;
            let isBusy = req.body.isBusy;
            let vehicleLat = req.body.lat;
            let vehicleLong = req.body.long;
            const result = await vehicleService.updateVehicleUtilizationDate(idVehicle, dateUntilItIsBusy, location, isBusy, vehicleLat, vehicleLong);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.updateVehicleCharge = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let idVehicle = req.params.idVehicle;
            let chargeValue = req.params.chargeValue;
            let operation = req.params.operation;
            const result = await vehicleService.updateVehicleCharge(idVehicle, chargeValue, operation);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};