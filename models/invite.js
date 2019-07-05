const mongoose = require('mongoose')

const _schema = {
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    accept: {
        type: String,
        enum: ['ACEITO', 'RECUSADO', 'ESPERA'],
        default: 'ESPERA'
    },
    createdAt: { type: Date, default: Date.now }
}

const inviteSchema = new mongoose.Schema(_schema)

module.exports = mongoose.model('invites', inviteSchema)