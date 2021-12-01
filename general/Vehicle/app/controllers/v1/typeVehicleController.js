const typeVehicleService = require('../../service/v1/typeVehicleService');

exports.getAllTypeVehicle = async function (req, res) {
    try {
        const result = await typeVehicleService.getAll();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addTypeVehicle = async function (req, res) {

    try {
        let codigoCartao = req.body.idTypeVehicle;
        let validade = req.body.nameTypeVehicle;
        const result = await typeVehicleService.addTypeVehicle(codigoCartao, validade);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};