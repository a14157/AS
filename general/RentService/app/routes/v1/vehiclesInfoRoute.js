const express = require('express');
const router = express.Router();
const vehiclesInfoController = require('../../controllers/v1/vehiclesInfoController');

/**
 * @route Get /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to get all Types of Vehicle
 * @returns {object} 200 - Return All Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/getAllTypesOfVehicles/', vehiclesInfoController.getAllTypesOfVehicles); 

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to fetch all vehicles
 * @returns {object} 200 - Return All Vehicles
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/vehicle/', vehiclesInfoController.getAllVehicles); 

module.exports = router;