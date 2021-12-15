const vehicleService = require('../../service/v1/vehicleService');

exports.getAllVehicles = async function (req, res) {
    try {
        const result = await vehicleService.getAll();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAllFreeVehiclesByType = async function (req, res) {
    try {
        let dateUntilItIsBusy = new Date(req.params.dateUntilItIsBusy).toISOString();
        let type = req.params.type;
        const result = await vehicleService.getAllFreeVehiclesByType(dateUntilItIsBusy, type);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getVehicle = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        const result = await vehicleService.getVehicle(idVehicle);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addVehicle = async function (req, res) {
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
        let isBusy = req.body.isBusy;
        const result = await vehicleService.updateVehicleUtilizationDate(idVehicle, dateUntilItIsBusy, location, isBusy);
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
        const result = await vehicleService.updateVehicleCharge(idVehicle, chargeValue, operation);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};