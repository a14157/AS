const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/v1/vehicleController');


/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to fetch all vehicles
 * @returns {object} 200 - Return All Vehicles
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', vehicleController.getAllVehicles); 

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to fetch all free vehicles and by vehicle type
 * @param {String} isBusy - Is Busy? True or False
 * @param {String} type - Type of Vehicle - Car, Scooter, etc
 * @returns {object} 200 - Return All Free Vehicles
 * @returns {object} 204 - No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/getAllFreeVehiclesByType/:dateUntilItIsBusy/:type', vehicleController.getAllFreeVehiclesByType); 

/**
 * @route Get /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to fetch a vehicle by ID
 * @param {String} idVehicle - ID Vehicle
 * @returns {object} 200 - Return Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/:idVehicle', vehicleController.getVehicle); 


/**
 * @route Patch /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to update a vehicle by ID
 * @param {String}  idVehicle - ID Vehicle
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
 router.patch('/:idVehicle', vehicleController.updateVehicleState); 

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