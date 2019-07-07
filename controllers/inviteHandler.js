const Invite = require('../models/invite')
const User = require('../models/user')

exports.createInvite = async function(req, res) {
    try {
        const destUser = await User.findOne({ email: req.body.email })
        if (!destUser) {
            res.status(404).json({ message: 'Email not found!' })
            return
        }
        const newInvite = await Invite.create({ from: req.user.id,  to: destUser._id })
        res.status(201).json(newInvite)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err })
    }
}

exports.getWaitingInvites = async function(req, res) {
    try {
        const invites = await Invite.find({ to: req.user.id, accept: 'ESPERA' }).populate('from', 'username')
        res.json(invites)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err })
    }
}

exports.acceptInvite = async function(req, res) {
    try {
        const invite = await Invite.findOne({ _id: req.body.inviteId})
        const user = await User.findOne({ _id: req.user.id })
        const index = user.friends.findIndex(friends => friends === invite.from)

        if (index <  0) {
            user.friends.push(invite.from)
            await user.save()
        }

        invite.accept = "ACEITO"
        const newInvite = await invite.save()
        res.status(201).json(newInvite)
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: err})
    }
}

exports.negateInvite = async function(req, res) {
    try {
        const invite = await Invite.findOne({ _id: req.body.inviteId })
        invite.accept = "RECUSADO"
        const changedInvite = await invite.save()
        res.json(changedInvite) 
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err })
    }
}