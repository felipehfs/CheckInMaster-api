const Invite = require('../models/invite')
const User = require('../models/user')

exports.createInvite = async function(req, res) {
    try {
        const destUser = await User.findOne({ email: req.body.email })
        if (!destUser) {
            res.status(404).json({ message: 'Email not found!' })
            return
        }
        const newInvite = await Invite.create({ from: req.user.id,  to: destUser._id})
        res.status(201).json(newInvite)
    }catch(err) {
        console.error(err)
        res.status(500).json({ message: err})
    }
}