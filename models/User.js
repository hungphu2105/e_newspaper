const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    pass_word: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    birth_day: {
        type: Date,
    },
    gender: {
        type: String,
    },
    gmail: {
        type: String,
    },
    role: {
        type: Number,
        default: 1,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    avatar: {
        publicId: {
            type: String,
        },
        url: {
            type: String,
            default: "https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg",
        },
    },
})

module.exports = mongoose.model('User', User);