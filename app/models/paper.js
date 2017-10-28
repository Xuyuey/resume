var mongoose = require('mongoose')
var PaperSchema = require('../schemas/Paper.js')
var Paper = mongoose.model('Paper',PaperSchema)

module.exports = Paper