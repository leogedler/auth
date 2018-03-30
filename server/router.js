const passportService = require('./services/passport');
const passport = require('passport');

const { signup, signin } = require('./controllers/authentication');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    app.get('/api/code', requireAuth, (req, res, next) => {
        res.send( { message: 'Code is ABC123' } );
    });

    app.post('/auth/signin', requireSignin, signin);
    app.post('/auth/signup', signup);
}