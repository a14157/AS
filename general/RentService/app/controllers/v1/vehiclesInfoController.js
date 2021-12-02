const vehiclesInfoService = require('../../service/v1/vehiclesInfoService');

exports.getAllTypesOfVehicles = async function (req, res) {
    try {
        const result = await vehiclesInfoService.getAllTypesOfVehicles();
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