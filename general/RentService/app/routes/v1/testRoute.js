const express = require('express');
const router = express.Router();
const testController = require('../../controllers/v1/testController');

/**
 * @route Get /test/
 * @group Test operations.
 * @description Route to test all endpoints
 * @returns {object} 200 - Return All 
 * @returns {Error}  400  - Bad request
 */
 router.get('/', testController.testAllEndPoints); 

 module.exports = router;