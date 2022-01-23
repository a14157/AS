const typeVehicleService = require('../../service/v1/typeVehicleService');
const apiTokens = require('../../config/apiTokens.json');

exports.getAllTypeVehicle = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            const result = await typeVehicleService.getAll();
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.getVehicleTypeByName = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let nameTypeVehicle = req.params.nameTypeVehicle;
            const result = await typeVehicleService.getVehicleTypeByName(nameTypeVehicle);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.addTypeVehicle = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {

        try {
            let codigoCartao = req.body.idTypeVehicle;
            let validade = req.body.nameTypeVehicle;
            let priceByHourTypeVehicle = req.body.priceByHourTypeVehicle;
            const result = await typeVehicleService.addTypeVehicle(codigoCartao, validade, priceByHourTypeVehicle);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.updatePriceByHour = async function (req, res) {
    if (req.headers['vehicle-api-token'] && req.headers['vehicle-api-token'] == apiTokens.vehicleAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let idTypeVehicle = req.params.idTypeVehicle;
            let priceByHourTypeVehicle = req.params.priceByHourTypeVehicle;
            const result = await typeVehicleService.updatePriceByHour(idTypeVehicle, priceByHourTypeVehicle);
            res.status(result.success).json(result.body);
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};