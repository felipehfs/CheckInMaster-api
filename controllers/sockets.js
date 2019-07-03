const User = require("../models/user")

module.exports = function(io) {
    const friends = []

    return function(socket) {
        socket.emit("sendUserInfo")
    }
}