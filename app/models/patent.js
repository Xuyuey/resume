var mongoose = require('mongoose')
var PatentSchema = require('../schemas/patent.js')
var Patent = mongoose.model('Patent',PatentSchema)

module.exports = Patent