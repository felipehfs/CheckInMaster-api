const mongoose = require('mongoose')

const _schema = {
    name: { type: String, required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
}