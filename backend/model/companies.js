const mongoose = require('mongoose');

const Company = new mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    password: { type: String, require: true}
});

const company = mongoose.model('companies', Company);

module.exports = company;