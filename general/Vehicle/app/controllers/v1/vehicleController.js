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
        let dateUntilItIsBusy = new Date(req.params.dateUntilItIsBusy).toISOString();
        let type = req.params.type;
        console.log(dateUntilItIsBusy)
        console.log(type)
        const result = await vehicleService.getAllFreeVehiclesByType(dateUntilItIsBusy, type);
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
        let dateUntilItIsBusy = new Date().toISOString();
        let idTypeVehicle = req.body.idTypeVehicle;
        let location = req.body.location;
        const result = await vehicleService.addVehicle(idTypeVehicle, dateUntilItIsBusy, idVehicle, location);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.updateVehicleState = async function (req, res) {
    try {
        let idVehicle = req.params.idVehicle;
        let dateUntilItIsBusy = new Date(req.body.dateUntilItIsBusy).toISOString();
        const result = await vehicleService.updateVehicleUtilizationDate(idVehicle, dateUntilItIsBusy);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};