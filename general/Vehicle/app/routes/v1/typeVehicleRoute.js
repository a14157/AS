const express = require('express');
const router = express.Router();
const typeVehicleController = require('../../controllers/v1/typeVehicleController');


/**
 * @route Get /typevehicle/
 * @group Type Vehicle operations.
 * @returns {object} 200 - Get All Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', typeVehicleController.getAllTypeVehicle); 


/**
 * @route Post /typevehicle/
 * @group Type Vehicle operations.
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 201 - Resource Created(Type Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.post('/', typeVehicleController.addTypeVehicle); 


module.exports = router;