const express = require('express');
const router = express.Router();
const vehicleController = require('../../controllers/v1/vehicleController');


/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @returns {object} 200 - Get All Vehicles
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', vehicleController.getAllVehicles); 

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @returns {object} 200 - Get All Free Vehicles
 * @returns {object} 204 - No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/getAllFreeVehicles/', vehicleController.getAllFreeVehicles); 

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @param {String} idVehicle - ID Vehicle
 * @returns {object} 200 - Get Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/:idVehicle', vehicleController.getVehicle); 


/**
 * @route Patch /vehicle/
 * @group Vehicle operations.
 * @param {String}  idVehicle - ID Vehicle
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
 router.patch('/:idVehicle', vehicleController.updateVehicleState); 

/**
 * @route Post /vehicle/
 * @group Vehicle operations.
 * @param {object} Vehicle - Vehicle
 * @returns {object} -  Resource Created(Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.post('/', vehicleController.addVehicle); 




module.exports = router;