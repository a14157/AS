const express = require('express');
const router = express.Router();
const vehiclesInfoController = require('../../controllers/v1/vehiclesInfoController');

/**
 * @route Get /vehicle/typevehicle/
 * @group Type Vehicle operations.
 * @description Route to get all Types of Vehicle
 * @returns {object} 200 - Return All Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/typevehicle/', vehiclesInfoController.getAllTypesOfVehicles); 

/**
 * @route Post /vehicle/typevehicle/
 * @group Type Vehicle operations.
 * @description Route to add an Type of Vehicle
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 201 - Resource Created(Type Vehicle)
 * @returns {Error}  400  - Bad request
 */
 router.post('/typevehicle', vehiclesInfoController.addTypeVehicle); 

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to fetch all vehicles
 * @returns {object} 200 - Return All Vehicles
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/', vehiclesInfoController.getAllVehicles); 

 /**
 * @route Post /vehicle/
 * @group Vehicle operations.
 * @description Route to add Vehicle
 * @param {object} Vehicle - Vehicle
 * @returns {object} -  Resource Created(Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.post('/', vehiclesInfoController.addNewVehicle); 

module.exports = router;