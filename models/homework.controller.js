'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HomeworkSchema = Schema({
    nameHomework: String,
    description: String,
    urgencyLevel: String,
    importanceLevel: String
});


module.exports = mongoose.model('homeworks', HomeworkSchema);

