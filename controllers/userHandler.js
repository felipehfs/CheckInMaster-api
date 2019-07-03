const User = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

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

exports.signup = async function(req, res) {
   try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return 
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (!isValidPassword) {
            res.status(400).json({ message: "Password wrong"})
            return
        }

        const payload = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        const token = jwt.sign(payload, 'jwt_secret', { expiresIn: '7d'})
        res.json({
            token,
            username: user.username
        })
   } catch(err) {
        res.status(500).json({
            message: err
        })
   }
}

exports.updateUser = async function(req, res) {
    try {
        const updated = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true})
        res.json(updated)
    } catch(err) {
        res.status(500).json({
            message: err
        })
    }
}