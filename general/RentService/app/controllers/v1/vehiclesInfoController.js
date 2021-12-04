const vehiclesInfoService = require('../../service/v1/vehiclesInfoService');

exports.getAllTypesOfVehicles = async function (req, res) {
    try {
        const result = await vehiclesInfoService.getAllTypesOfVehicles();
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
        const result = await vehiclesInfoService.addNewVehicle(idTypeVehicle, isBusy, idVehicle, location);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};