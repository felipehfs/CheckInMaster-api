const express = require("express")
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser")

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require("../routes")(app)

module.exports = app