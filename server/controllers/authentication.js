const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret );
}

const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(422).json({error: 'You must define an email and password'});

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw {error: 'Email is in use', status: 422};
        }
        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email,
            password
        })
        const userCreated = await user.save();
        return res.json({ token: tokenForUser(userCreated) });

    } catch (error) {
        console.log('error', error);
        if(error.status === 422){
             return res.status(422).json(error);
        }
        return res.status(500).json(error);
    }
}

const signin = (req, res, next) => {
    // User has already had their email and password auth
    // We just need to give them a token
    return res.json({ token: tokenForUser(req.user) });
}

module.exports = { signup, signin };