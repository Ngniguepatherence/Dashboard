const mongoose = require('mongoose')

const VisitorSchema = new mongoose.Schema({
    name: {type: String, require: true},
    Address: { type: String, require: true},
    Purpose: { type: String, require: true},
    time_visited: { type: Date, require: true}
});

const Visitor = mongoose.model('Visitor', VisitorSchema);

module.exports = Visitor;

