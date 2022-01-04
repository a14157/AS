const routePriceService = require('../../service/v1/routePriceService');
const apiTokens = require('../../config/apiTokens.json');

exports.getAll = async function (req, res) {
    if (req.headers['route-price-token'] && req.headers['route-price-token'] == apiTokens.routPriceAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            const result = await routePriceService.getAll();
            res.status(result.success).send(result.body);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.addRoutePrice = async function (req, res) {
    if (req.headers['route-price-token'] && req.headers['route-price-token'] == apiTokens.routPriceAPI && req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI) {
        try {
            let startingPoint = req.body.startingPoint;
            let arrivalPoint = req.body.arrivalPoint;
            let typeOfVehicle = req.body.typeOfVehicle;
            let priceByHourTypeVehicle = req.body.priceByHourTypeVehicle;
            const result = await routePriceService.addRoutePrice(startingPoint, arrivalPoint, typeOfVehicle, priceByHourTypeVehicle);
            res.status(result.success).send(result.body);
        } catch (err) {
            res.status(400).send(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};