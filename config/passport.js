const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy 
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, cb) {
    return User.findOne({ email, password })
        .then(user => {
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.'})
            }
            return cb(null, user, { message: 'Logged on successfully'})
        })
        .catch(err => cb(err))
}))

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'jwt_secret'
}, function(jwtPayload, cb) {
    return User.findById(jwtPayload.id)
        .then(user => {
            return cb(null, user)
        })
        .catch(err => { return cb(err)})
}))

module.exports = {
    initialize: function() {
        return passport.initialize()
    },
    authenticate: function() {
        return passport.authenticate("jwt", { session: false })
    }
}