const vehiclesInfoService = require('../../service/v1/vehiclesInfoService');

exports.getAllTypesOfVehicles = async function (req, res) {
    try {
        const result = await vehiclesInfoService.getAllTypesOfVehicles();
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getVehicleTypeByName = async function (req, res) {
    try {
        let getVehicleTypeByName = req.params.nametypevehicle;
        const result = await vehiclesInfoService.getVehicleTypeByName(getVehicleTypeByName);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.addTypeVehicle = async function (req, res) {
    try {
        let codigoCartao = req.body.idTypeVehicle;
        let validade = req.body.nameTypeVehicle;
        let priceByHourTypeVehicle = req.body.priceByHourTypeVehicle;
        const result = await vehiclesInfoService.addNewTypeOfVehicle(codigoCartao, validade, priceByHourTypeVehicle);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getAllVehicles = async function (req, res) {
    try {
        const result = await vehiclesInfoService.getAllVehicles();
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.addNewVehicle = async function (req, res) {
    try {
        let idVehicle = req.body.idVehicle;
        let isBusy = req.body.isBusy;
        let idTypeVehicle = req.body.idTypeVehicle;
        let location = req.body.location;
        let latLocation = req.body.latLocation;
        let lagLocation = req.body.lagLocation;
        let vehicleChargePercentage = req.body.vehicleChargePercentage;
        const result = await vehiclesInfoService.addNewVehicle(idTypeVehicle, isBusy, idVehicle, location, latLocation, lagLocation, vehicleChargePercentage, isBusy);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateVehicleState = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        let dateUntilItIsBusy = new Date(req.body.dateUntilItIsBusy).toISOString();
        let location = req.body.location;
        let isBusy = req.body.isBusy;
        const result = await vehiclesInfoService.updateVehicleUtilizationDate(idVehicle, dateUntilItIsBusy, location, isBusy);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getAllFreeVehiclesByType = async function (req, res) {
    try {
        let dateUntilItIsBusy = new Date(req.params.dateUntilItIsBusy).toISOString();
        let type = req.params.type;
        let userPosLat = req.params.userPosLat;
        let userPosLong = req.params.userPosLong;
        let userDistance = req.params.distance;
        const result = await vehiclesInfoService.getAllFreeVehiclesByType(dateUntilItIsBusy, type, userPosLat, userPosLong, userDistance);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateVehicleCharge = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        let chargeValue = req.params.chargeValue;
        let operation = req.params.operation;
        const result = await vehiclesInfoService.updateVehicleCharge(idVehicle, chargeValue, operation);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getVehicleByID = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        const result = await vehiclesInfoService.getVehicleByID(idVehicle);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updatePriceByHour = async function (req, res) {
    try {
        let idTypeVehicle = req.params.idTypeVehicle;
        let priceByHourTypeVehicle = req.params.priceByHourTypeVehicle;
        const result = await vehiclesInfoService.updatePriceByHour(idTypeVehicle, priceByHourTypeVehicle);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};