const testService = require('../../service/v1/testService');

exports.testAllEndPoints = async function (req, res) {
    try {
        const result = await testService.testAllEndpoints();
        res.status(result.success).json(result.body);
    } catch (err) {
        res.status(400).json(err);
    }
};