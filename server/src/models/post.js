const mongoose = require('mongoose')
const postSchema = require('./schemas/post')

module.exports = mongoose.model('Post', postSchema)
