const rentRegisterService = require('../service/rentRegisterService');

exports.addRentRecord = async function (req, res) {
    try {
        let source = req.body.source;
        let destiny = req.body.destiny;
        let typeVehicle = req.body.typeVehicle;
        let dateBegin = new Date(req.body.dateBegin);
        let travelDuration = req.body.travelDuration;
        let signalState = req.body.signalState;
        let idVehicle =  req.body.idVehicle;
        let travelUniqueID =  req.body.travelUniqueID;
        let emailUser =  req.body.emailUser;
        let travelCost =  req.body.travelCost;

        const result = await rentRegisterService.addRentRecord(source, destiny, typeVehicle, dateBegin, travelDuration, signalState, idVehicle, travelUniqueID, emailUser, travelCost);
        res.status(result.success).send(result.body);
    } catch (err) {
        res.status(400).send(err);
    }

};