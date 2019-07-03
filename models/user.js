const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const _schema = {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    lastPosition: {
        type: pointSchema
    }
}

const userSchema = new mongoose.Schema(_schema)
module.exports = mongoose.model('users', userSchema)