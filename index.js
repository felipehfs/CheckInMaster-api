const mongoose = require("mongoose")
const app = require("./config/express")
const http = require("http").createServer(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3900

mongoose.connect(require("./config/database").mongoUri, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err))

io.on('connection', require('./controllers/sockets')(io))

http.listen(port, () => console.log(`Running on http://localhost:${port}`))