const express = require('express');
const router = express.Router();
const rentRegisterController = require('../controllers/rentRegisterController');



/**
 * @route Get /rent/
 * @group Rent operations.
 * @description Route to get all Rents
 * @returns {object} 200 - Return All rent
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.post('/', rentRegisterController.addRentRecord); 

module.exports = router;