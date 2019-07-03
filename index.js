const mongoose = require("mongoose")
const server = require("./config/express")

const port = process.env.PORT || 3900

mongoose.connect(require("./config/database").mongoUri, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err))

server.listen(port, () => console.log(`Running on http://localhost:${port}`))