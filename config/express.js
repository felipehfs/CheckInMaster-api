const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")
const auth = require("./passport")

app.use(auth.initialize())
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require("../routes")(app)

module.exports = app