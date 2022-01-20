const axios = require('axios');

exports.testVehicle = async function(){
    var config = {
        method: 'get',
        url: process.env.URL_VEHICLE,
        headers: { }
      };
      
      let finalData = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    
    return finalData;
}

exports.testUser = async function(){
    var config = {
        method: 'get',
        url: process.env.URL_USER,
        headers: { }
      };
      
      let finalData = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    
    return finalData;
}

exports.testRoutePrice = async function(){
    var config = {
        method: 'get',
        url: process.env.URL_USER,
        headers: { }
      };
      
      let finalData = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    
    return finalData;
}


exports.testRentalRequestRegister = async function(){
    var config = {
        method: 'get',
        url: process.env.URL_USER,
        headers: { }
      };
      
      let finalData = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error;
      });
    
    return finalData;
}