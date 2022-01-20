const utils = require('../../utils/testUtils')

// test all endpoints
exports.testAllEndpoints = async function () {
    try {

        let results = [];
        let a = await utils.testRentalRequestRegister();
        console.log(a)
        let b = await utils.testVehicle();
        console.log(b)
        let c = await utils.testUser();
        console.log(c)
        let d = await utils.testRoutePrice();
        console.log(d)
        results.push(a);
        results.push(b);
        results.push(c);
        results.push(d);
        
        return {
            success: 200,
            body: results 
        };

    } catch (err) {
        return {
            success: 404,
            body: err 
        };
    }

}