const rentService = require('../../service/v1/rentService');
const apiTokens = require('../../config/apiTokens.json');


exports.getAllRentalRecords = async function (req, res) {
    try {
        const result = await rentService.getAllRentalRecords();
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.getAllUserRentalRecords = async function (req, res) {
    try {
        let emailUser = req.params.emailUser;
        const result = await rentService.getAllUserRentalRecords(emailUser);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
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
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};


exports.saveRental = async function (req, res) {
    if (req.headers['rent-api-token'] && req.headers['rent-api-token'] == apiTokens.rentAPI && req.headers['rental-requests-api-token'] && req.headers['rental-requests-api-token'] == apiTokens.rentalRequestAPI) {

        try {
            let emailUser = req.body.emailUser;
            let destiny = req.body.destiny;
            let source = req.body.source;
            let travelCost = req.body.travelCost;
            let typeVehicle = req.body.typeVehicle;
            let travelDuration = req.body.travelDuration;
            let travelStartDate = new Date(req.body.travelStartDate);
            let travelEndDate = new Date(req.body.travelEndDate);
            let travelUniqueID = req.body.travelUniqueID;
            let idVehicle = req.body.idVehicle;
            let status = req.body.status;

            const result = await rentService.saveRental(emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate, travelEndDate, travelUniqueID, status);
            res.status(result.success).json(result.body);

        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(403).json('API token required.');
    }
};

exports.stopRent = async function (req, res) {
    try {
        let travelUniqueID = req.body.travelUniqueID;
        let emailUser = req.body.emailUser;
        let destiny = req.body.destiny;
        let source = req.body.source;
        let travelCost = req.body.travelCost;
        let travelDuration = req.body.travelDuration;
        let typeVehicle =  req.body.typeVehicle;
        let idVehicle =  req.body.idVehicle;
        let travelStartDate =  req.body.travelStartDate;

        const result = await rentService.stopRent(travelUniqueID, emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate);
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};