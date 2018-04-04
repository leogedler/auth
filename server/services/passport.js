const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
    // Verify this email and password, call done with the user
    // if it is the correct username and password, otherwise call done with false
    try {
        const user = await User.findOne({ email });
        if(!user) return done(null, false);
        // compare passwords
        user.comparePassword(password, (err, isMatch)=>{
            if(err) return done(err, false);
            if(!isMatch) return done(null, false);

            return done(null, user);
        })
    } catch (error) {
        return done(err, false);
    }

});

// Setup options for JWY Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    // See if the user and the paylod exist in or DB
    // If it dose call done with that user
    // otherwise, call done without an user object
    try {
        const user = await User.findById(payload.sub);
        if(user) {
            done(null, user);
        }else{
            done(null, false);
        }
    } catch (error) {
        return done(err, false);
    }

});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);