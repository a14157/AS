const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/v1/vehicleController');


/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to get all vehicles
 * @returns {object} 200 - Return All Vehicles
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', vehicleController.getAllVehicles); 

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to get all free vehicles by date and type
 * @param {String} dateUntilItIsBusy - Date until vehicle is busy
 * @param {String} type - Type of Vehicle - Car, Scooter, etc
 * @returns {object} 200 - Return All Free Vehicles
 * @returns {object} 204 - No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/getAllFreeVehiclesByType/:dateUntilItIsBusy/:type', vehicleController.getAllFreeVehiclesByType); 

/**
 * @route Get /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to get a vehicle by ID
 * @param {String} idVehicle - ID Vehicle
 * @returns {object} 200 - Return Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/:idVehicle', vehicleController.getVehicle); 


/**
 * @route Patch /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to update a vehicle state(if is free or busy) by ID
 * @param {String}  idVehicle - ID Vehicle
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
 router.patch('/:idVehicle', vehicleController.updateVehicleState); 

 /**
 * @route Patch /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to update a vehicle charge by ID
 * @param {String} idVehicle - ID Vehicle
 * @param {String} chargeValue - Charge value that we want to remove or add
 * @param {String} operation - Operation: add or remove charge
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
  router.patch('/:idVehicle/:chargeValue/:operation', vehicleController.updateVehicleCharge);

/**
 * @route Post /vehicle/
 * @group Vehicle operations.
 * @description Route to add Vehicle
 * @param {object} Vehicle - Vehicle
 * @returns {object} -  Resource Created(Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.post('/', vehicleController.addVehicle); 




module.exports = router;