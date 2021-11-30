const mongoose = require('mongoose');
const urlDB = 'mongodb://localhost:27017/TPAS';

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