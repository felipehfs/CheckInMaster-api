const User = require("../models/user")
const bcrypt = require('bcryptjs')

exports.register = async function(req, res) {
    try {
        const newUser = req.body
        newUser.password = bcrypt.hashSync(newUser.password, 10)
        const user = new User(newUser)
        const saved = await user.save()
        saved.password = undefined
        res.status(201).json(saved)
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
}