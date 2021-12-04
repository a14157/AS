const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express')
const jwt = require('express-jwt');
const passport = require('passport');
var fs = require('fs');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// import configs
let db = require('./app/config/db.config');
require('./app/config/passport.config');

app.use(cors())
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, accept-version");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, PUT, DELETE");
    next();
});

const authentication = jwt({
    secret: 'secret',
    userProperty: 'payload',
    algorithms: ['HS256'] // ['rs256',"sha1", "HS256"]
});

const usersRouteV1 = require('./app/routes/v1/userRoute');
const userProfileRouteV1 = require('./app/routes/v1/userProfileRoute');
app.use('/v1/user',  usersRouteV1); 
app.use('/v1/userprofile',  userProfileRouteV1); 

const expressSwagger = require('express-swagger-generator')(app);
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: 'Projeto AS - Users',
            title: 'Projeto AS - Users',
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

