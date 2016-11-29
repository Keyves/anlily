const mongoose = require('mongoose')
const reportSchema = require('./schemas/report')

module.exports = mongoose.model('report', reportSchema)
