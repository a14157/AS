const express = require('express');
const router = express.Router();
const rentController = require('../../controllers/v1/rentController');


/**
 * @route Get /rent/
 * @group Rent operations.
 * @description Route to get all Rents
 * @returns {object} 200 - Return All rent
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', rentController.getAllRentalRecords); 

/**
 * @route Get /rent/:emailUser
 * @group Rent operations.
 * @description Route to get rents made by user
 * @returns {object} 200 - Return All Rens
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
 router.get('/:emailUser', rentController.getAllUserRentalRecords); 

/**
 * @route Post /rent/
 * @group Rent operations.
 * @description Route to add an Rent
 * @param {object} Rent - Rent
 * @returns {object} 201 - Resource Created(Type Rent)
 * @returns {Error}  400  - Bad request
 */
router.post('/', rentController.addRental); 


module.exports = router;