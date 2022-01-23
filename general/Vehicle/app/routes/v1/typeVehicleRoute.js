const express = require('express');
const router = express.Router();
const typeVehicleController = require('../../controllers/v1/typeVehicleController');


/**
 * @route Get /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to get all types of Vehicle
 * @returns {object} 200 - Return All Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', typeVehicleController.getAllTypeVehicle); 


/**
 * @route Get /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to get types of vehicle by name
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 200 - Return Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/:nameTypeVehicle', typeVehicleController.getVehicleTypeByName); 


/**
 * @route Post /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to add an type of vehicle
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 201 - Resource Created(Type Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.post('/', typeVehicleController.addTypeVehicle); 

/**
 * @route Patch /typevehicle/
 * @group Type Vehicle operations.
 * @description Route to update price by hour by vehicle type ID
 * @param {String}  idTypeVehicle - ID Type of Vehicle
 * @param {String}  priceByHourTypeVehicle - New Price by hour
 * @returns {object} 201 - Resource Updated (Type Vehicle)
 * @returns {Error}  400  - Bad request
 */
 router.patch('/:idTypeVehicle/:priceByHourTypeVehicle', typeVehicleController.updatePriceByHour); 


module.exports = router;