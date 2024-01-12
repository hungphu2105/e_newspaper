const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        required: true,
        default: 0,
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    reason_for_refuse: {
        type: String,
    },
    image: {
        publicId: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    public_date: {
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Blog', Blog);