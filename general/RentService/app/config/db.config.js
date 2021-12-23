const mongoose = require('mongoose');
const urlDB = `${process.env.DBHOST}${process.env.DBNAME}`;

mongoose.connect(urlDB, {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('connected', () => { 
         console.log(`Mongoose: connected to ${urlDB}`);
    });
mongoose.connection.on('error', err => {
        console.log('Mongoose: error connecting: ', err);
    });
mongoose.connection.on('disconnected', () => { 
        console.log('Mongoose: disconnected. '); 
    });