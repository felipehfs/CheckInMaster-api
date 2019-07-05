const mongoose = require("mongoose")

const _schema = {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    online: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "rooms"}],
    avatar: String,
    location: {
        type: {
            type: String
          },
        coordinates: {
            type: [Number],
            required: true
          }
    }
}

const userSchema = new mongoose.Schema(_schema)
module.exports = mongoose.model('users', userSchema)