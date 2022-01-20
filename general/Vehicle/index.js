const express = require('express')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express')

app.get('/', (req, res) => {
    res.json('Hello World From Vehicle! ')
})

// import configs
let db = require('./app/config/db.config');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accept-version");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
    next();
});

const typeVehicleRouteV1 = require('./app/routes/v1/typeVehicleRoute');
const vehicleRouteV1 = require('./app/routes/v1/vehicleRoute');


app.use('/v1/typevehicle',  typeVehicleRouteV1); 
app.use('/v1/vehicle',  vehicleRouteV1); 

const expressSwagger = require('express-swagger-generator')(app);
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: 'Projeto AS - Vehicle and Type of Vehicle',
            title: 'Projeto AS- Vehicle and Type of Vehicle',
            version: '1.0.0',
        },
        host: 'localhost:' + port,
        basePath: '/v1/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http'],
        securityDefinitions: {}
    },
    basedir: __dirname, //app absolute path
    files: ['./app/models/v1/*.js', './app/routes/v1/*.js'] //Path to the API handle folder
};

expressSwagger(swaggerOptions);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

