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
 * @route Get /typevehicle/:nametypevehicle
 * @group Type Vehicle operations.
 * @description Route to get Types of Vehicle by name
 * @param {object} Type Vehicle - Type Vehicle
 * @returns {object} 200 - Return Type Vehicle
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/typevehicle/:nametypevehicle', vehiclesInfoController.getVehicleTypeByName);

/**
 * @route Get /vehicle/
 * @group Vehicle operations.
 * @description Route to get all free vehicles by date and type
 * @param {String} dateUntilItIsBusy - Date until vehicle is busy
 * @param {String} type - Type of Vehicle - Car, Scooter, etc
 * @param {userPosLat} userPosLat - Latitude of the user's current position
 * @param {userPosLong} userPosLong - Longitude of the user's current position
 * @param {distance} distance - Search radius from user position
 * @returns {object} 200 - Return All Free Vehicles
 * @returns {object} 204 - No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/getAllFreeVehiclesByType/:dateUntilItIsBusy/:type/:userPosLat/:userPosLong/:distance', vehiclesInfoController.getAllFreeVehiclesByType); 

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
 * @route Get /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to fetch all vehicles
 *  @param {String}  idVehicle - ID Vehicle
 * @returns {object} 200 - Return Vehicle
 * @returns {object} 204 - No Content
 * @returns {Error}  400 - Bad request
 */
 router.get('/:idVehicle', vehiclesInfoController.getVehicleByID);

/**
 * @route Patch /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to update a vehicle by ID
 * @param {String}  idVehicle - ID Vehicle
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.patch('/:idVehicle', vehiclesInfoController.updateVehicleState);

/**
 * @route Patch /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to update a vehicle by ID
 * @param {String}  idVehicle - ID Vehicle
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
 router.patch('/typeofvehicle/:idTypeVehicle/:priceByHourTypeVehicle', vehiclesInfoController.updatePriceByHour);

/**
 * @route Patch /vehicle/:idVehicle
 * @group Vehicle operations.
 * @description Route to update a vehicle charge by ID
 * @param {String}  idVehicle - ID Vehicle
 * @returns {object} Resource Updated(Vehicle)
 * @returns {Error}  400  - Bad request
 */
router.get('/:idVehicle/:chargeValue/:operation', vehiclesInfoController.updateVehicleCharge);

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