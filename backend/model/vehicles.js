const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
    Model: {type: String, require: true},
    color: {type: String, require: true},
    plate_number: { type: String, require: true},
    Owner: { type: String, require: true},
    Entry_time: { type: Date, require: true},
    Exit_time: { type: Date, require: true},
    action: {type: String, require: true}
});

const Vehicle = mongoose.model('Vehicles', VehicleSchema);

module.exports = Vehicle;

