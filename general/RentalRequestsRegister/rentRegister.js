"use strict";

const express = require("express");
const cors = require("cors");
require('dotenv').config();
const PORT = process.env.PORT || 6000;
const CarBehavior = require("./src/models/CarBehavior");
const mqttPublisher = require("./src/client-mqtt-publisher");
const bodyParser = require("body-parser");
var axios = require('axios');
const apiTokens = require('./src/config/apiTokens.json');


// Dados -----------------------------------
const lista_registos = new Array();

const receptor = require("./src/client-mqtt-receiver");

let db = require("./src/config/db.config");

const leitura_mqtt = () => {
  console.log("a iniciar...");

  receptor.connect(
    () => {
      console.log("Successfully connected to the mqtt broker");
    },
    async (obj_msg) => {
      console.log(obj_msg)
      const carBehavior = new CarBehavior({
        idVehicle: obj_msg.idVehicle,
        source: obj_msg.source,
        destiny: obj_msg.destiny,
        typeVehicle: obj_msg.typeVehicle,
        travelStartDate: obj_msg.startDate,
        travelEndDate: obj_msg.endDate,
        signalState: obj_msg.signalState,
        travelDuration: obj_msg.travelDuration,
        travelUniqueID: obj_msg.travelUniqueID,
        emailUser: obj_msg.emailUser,
        travelCost: obj_msg.travelCost,
        status: obj_msg.status,
      });

      let finalCarBehavior;

      lista_registos.push(obj_msg.value);
      try{
        let updateCarBehavior = await sendRequetToUpdateCarBehavior(obj_msg);
        finalCarBehavior = await carBehavior.save();
      }catch(err){
        console.log(err)
      }

      // send request to rent service

      // NEXT STEP -> send request to rent service
    }
  );
};

async function sendRequetToUpdateCarBehavior(obj_msg) {
  var data = JSON.stringify({
    emailUser: obj_msg.emailUser,
    destiny: obj_msg.destiny,
    source: obj_msg.source,
    travelCost: obj_msg.travelCost,
    typeVehicle: obj_msg.typeVehicle,
    travelStartDate: obj_msg.startDate || obj_msg.travelStartDate,
    travelEndDate: obj_msg.endDate || obj_msg.travelEndDate,
    travelDuration: obj_msg.travelDuration,
    travelUniqueID: obj_msg.travelUniqueID,
    idVehicle: obj_msg.idVehicle,
    status: obj_msg.status,
  });

  var config = {
    method: "post",
    url: process.env.URL_RENT_SERVICE + '/v1/rent/saveRental',
    headers: {
      "Content-Type": "application/json",
      'rental-requests-api-token': apiTokens.rentalRequestAPI, 
      'rent-api-token': apiTokens.rentAPI
    },
    data: data,
  };

  var newData = await axios(config)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}

// configura????o do express -------------------------
const app = express();

app.get('/', (req, res) => {
  res.json('Hello World from RentalRequestRegister!')
})


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
  next();
});

app.route("/registo").get((req, res) => res.json(lista_registos));

const rentRegisterRoute = require("./src/routes/rentRegisterRoute");
app.use("/v1/", rentRegisterRoute);

app.listen(PORT, () => {
  console.log(`servidor a executar em http://localhost:${PORT}`);
  leitura_mqtt();
});
