const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RefreshToken = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    expires: {
        type: Date,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RefreshToken'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('RefreshToken', RefreshToken);