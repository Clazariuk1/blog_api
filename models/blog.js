const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

const blogSchema = new Schema ({
    title: { type: String, required: true },
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestanps: true
})

const Blog = model('Blog', blogSchema)

module.exports = Blog
