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
    console.log('getAllFreeVehiclesByType')
    try {
        let isBusy = req.params.isBusy;
        let type = req.params.type;
        const result = await vehicleService.getAllFreeVehiclesByType(isBusy, type);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getVehicle = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        console.log(idVehicle)
        const result = await vehicleService.getVehicle(idVehicle);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addVehicle = async function (req, res) {
    try {
        let idVehicle = req.body.idVehicle;
        let isBusy = req.body.isBusy;
        let idTypeVehicle = req.body.idTypeVehicle;
        let location = req.body.location;
        const result = await vehicleService.addVehicle(idTypeVehicle, isBusy, idVehicle, location);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateVehicleState = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        let isBusy = req.body.isBusy;
        const result = await vehicleService.updateVehicleState(idVehicle, isBusy);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};