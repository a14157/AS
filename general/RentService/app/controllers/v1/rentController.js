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

/*
{
  source: 'Viana',
  destiny: 'Porto',
  typeVehicle: 'Car',
  travelStartDate: 2021-12-06T11:52:03.095Z,
  travelEndDate: 2021-12-06T13:32:03.095Z,
  travelDuration: '100',
  signalState: 'out',
  idVehicle: '1',
  _id: new ObjectId("61ae91e7d0878847a159f0e2"),
  __v: 0
}
*/

exports.saveRental = async function (req, res) {
    try{
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

        const result = await rentService.saveRental(emailUser, destiny, source, travelCost, travelDuration, typeVehicle, idVehicle, travelStartDate, travelEndDate, travelUniqueID);
        res.status(result.success).send(result.body);

    }catch(err){
        res.status(400).send(err); 
    }
};