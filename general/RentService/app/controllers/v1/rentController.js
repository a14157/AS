const rentService = require('../../service/v1/rentService');

exports.getAllRentalRecords = async function (req, res) {
    try {
        const result = await rentService.getAllRentalRecords();
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.getAllUserRentalRecords = async function (req, res) {
    try {
        let emailUser = req.params.emailUser;
        const result = await rentService.getAllUserRentalRecords(emailUser);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.addRental = async function (req, res) {

    try {
        let emailUser = req.body.emailUser;
        let destiny = req.body.destiny;
        let source = req.body.source;
        let typeVehicle = req.body.typeVehicle;
        let travelDate = new Date(req.body.travelDate);
        const result = await rentService.addRental(emailUser, destiny, source, typeVehicle, travelDate);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err); 
    }
};