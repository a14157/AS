const routePriceService = require('../../service/v1/routePriceService');

exports.getAll = async function (req, res) {
    try {
        const result = await routePriceService.getAll();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addRoutePrice = async function (req, res) {

    try {
        let startingPoint = req.body.startingPoint;
        let arrivalPoint = req.body.arrivalPoint;
        let typeOfVehicle = req.body.typeOfVehicle;
        const result = await routePriceService.addRoutePrice(startingPoint, arrivalPoint, typeOfVehicle);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};
