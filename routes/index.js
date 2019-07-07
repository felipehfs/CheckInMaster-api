const { userHandler, inviteHandler } = require('../controllers')
const passport = require("passport")

module.exports = app => {
    app.get("/", (req, res) => res.send("Hello world"))
    app.get("/api/home", passport.authenticate('jwt', { session: false}), (req, res) => res.send("home"))
  
    // autenticacao
    app.post("/api/register", userHandler.register)
    app.post("/api/login", userHandler.signIn)

    app.post("/api/invites/accept", passport.authenticate('jwt', { session: false}), inviteHandler.acceptInvite)
    app.post("/api/invites/negate", passport.authenticate('jwt', { session: false}), inviteHandler.negateInvite)

    app.get("/api/invites", passport.authenticate('jwt', { session: false}), inviteHandler.getWaitingInvites)
    app.post("/api/invites", passport.authenticate('jwt', { session: false}), inviteHandler.createInvite)
    
    app.get("/api/users", passport.authenticate('jwt', {session: false}), userHandler.getUser)
    app.put("/api/users/:id", passport.authenticate('jwt', { session: false}), userHandler.updateUser)
}