const { userHandler } = require('../controllers')
const passport = require("passport")

module.exports = app => {
    app.get("/", (req, res) => res.send("Hello world"))
    app.get("/api/home", passport.authenticate('jwt', { session: false}), (req, res) => res.send("home"))
  
    // autenticacao
    app.post("/api/register", userHandler.register)
    app.post("/api/login", userHandler.signIn)

    app.put("/api/users/:id", passport.authenticate('jwt', { session: false}), userHandler.updateUser)
}