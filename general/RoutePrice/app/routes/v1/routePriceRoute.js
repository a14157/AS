const express = require('express');
const router = express.Router();
const routePriceController = require('../../controllers/v1/routePriceController');


/**
 * @route Get /typevehicle/
 * @group Route Price operations.
 * @description Route to get all Route Prices already used
 * @returns {object} 200 - Return All Route Price
 * @returns {object} 204 -No Content
 * @returns {Error}  400  - Bad request
 */
router.get('/', routePriceController.getAll); 


/**
 * @route Post /typevehicle/
 * @group Route Price operations.
 * @description Route to add an Route Price
 * @body {object} Route Price - Route Price
 * @returns {object} 201 - Resource Created(Route Pricee)
 * @returns {Error}  400  - Bad request
 */
router.post('/', routePriceController.addRoutePrice); 


module.exports = router;