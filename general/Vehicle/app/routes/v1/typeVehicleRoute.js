const express = require('express');
const router = express.Router();
const typeVehicleController = require('../../controllers/v1/typeVehicleController');


/**
 * @route Get /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to get all Types of Vehicle
 * @returns {object} 200 - Return All Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', typeVehicleController.getAllTypeVehicle); 


/**
 * @route Get /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to get Types of Vehicle by name
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 200 - Return Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/:nameTypeVehicle', typeVehicleController.getVehicleTypeByName); 


/**
 * @route Post /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to add an Type of Vehicle
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 201 - Resource Created(Type Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.post('/', typeVehicleController.addTypeVehicle); 


module.exports = router;