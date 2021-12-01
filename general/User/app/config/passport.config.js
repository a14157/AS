const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/v1/User')

passport.use(new LocalStrategy( 
    { usernameField: 'username'  },
    
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => { 
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'username incorreto.' }); 
            }
            if (!user.checkPassword(password)) {
                 return done(null, false, { message: 'Palavra chave incorreta!'}); 
            }
            return done(null, user); 
          });
    }
  ));