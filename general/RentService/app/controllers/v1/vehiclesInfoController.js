const vehiclesInfoService = require('../../service/v1/vehiclesInfoService');

exports.getAllTypesOfVehicles = async function (req, res) {
    try {
        const result = await vehiclesInfoService.getAllTypesOfVehicles();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getVehicleTypeByName = async function (req, res) {
    try {
        let getVehicleTypeByName = req.params.nametypevehicle;
        const result = await vehiclesInfoService.getVehicleTypeByName(getVehicleTypeByName);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addTypeVehicle = async function (req, res) {

    try {
        let codigoCartao = req.body.idTypeVehicle;
        let validade = req.body.nameTypeVehicle;
        let priceByHourTypeVehicle = req.body.priceByHourTypeVehicle;
        const result = await vehiclesInfoService.addNewTypeOfVehicle(codigoCartao, validade, priceByHourTypeVehicle);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAllVehicles = async function (req, res) {
    try {
        const result = await vehiclesInfoService.getAllVehicles();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
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
        const result = await vehiclesInfoService.addNewVehicle(idTypeVehicle, isBusy, idVehicle, location, latLocation, lagLocation, vehicleChargePercentage);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateVehicleState = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        let dateUntilItIsBusy = new Date(req.body.dateUntilItIsBusy).toISOString();
        let location = req.body.location;
        const result = await vehiclesInfoService.updateVehicleUtilizationDate(idVehicle, dateUntilItIsBusy, location);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAllFreeVehiclesByType = async function (req, res) {
    try {
        let dateUntilItIsBusy = new Date(req.params.dateUntilItIsBusy).toISOString();
        let type = req.params.type;
        const result = await vehiclesInfoService.getAllFreeVehiclesByType(dateUntilItIsBusy, type);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateVehicleCharge = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        let chargeValue = req.params.chargeValue;
        let operation = req.params.operation;
        const result = await vehiclesInfoService.updateVehicleCharge(idVehicle, chargeValue, operation);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};