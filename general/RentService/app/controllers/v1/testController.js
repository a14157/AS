const testService = require('../../service/v1/testService');

exports.testAllEndPoints = async function (req, res) {
    try {
        console.log('aqui')
        const result = await testService.testAllEndpoints();
        console.log(result)
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};