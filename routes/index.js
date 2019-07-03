const { userHandler } = require('../controllers')

module.exports = app => {
    app.get("/", (req, res) => res.send("Hello world"))

    app.post("/api/register", userHandler.register)
}