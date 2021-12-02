const express = require('express')
const app = express()
const port = process.env.PORT || 3500;
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express')
const usersProfiles = require('./app/service/v1/userService')
let fs = require('fs');

app.get('/', (req, res) => {
    res.send('Hello World!')
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

//Folders for the uploads user photos
const dirUploads = './configs/';

if (!fs.existsSync(dirUploads)){
    fs.mkdirSync(dirUploads);
    usersProfiles.getAllUsersProfiles();
}

const rentUserRouteV1 = require('./app/routes/v1/userRoute');
const vehiclesInfoRouteV1 = require('./app/routes/v1/vehiclesInfoRoute');
app.use('/v1/rent/user',  rentUserRouteV1); 
app.use('/v1/rent/vehicle',  vehiclesInfoRouteV1); 

const expressSwagger = require('express-swagger-generator')(app);
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: 'Projeto AS - Rent Service API',
            title: 'Projeto AS - Rent Service API',
            version: '1.0.0',
        },
        host: 'localhost: ' + port,
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

