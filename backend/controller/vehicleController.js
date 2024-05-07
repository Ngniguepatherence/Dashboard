const Vehicle = require('../model/vehicles');

const VehicleController = {
    addVehicle: async (req,res) => {
        console.log(req.body);
        const {model, color, plate_number, owner, entry_time, exit_time, action} = req.body;
        try {
            const newVehicl = new Vehicle({
            Model: model, color: color, plate_number: plate_number, Owner: owner, Entry_time: entry_time, Exit_time: exit_time, action: action
            });
            await newVehicl.save();
            res.status(201).json(newVehicl);
        }
        catch(error) {
            res.status(500).json({ message: error.message} );
        }
    },

    getAll: async(req,res) => {
        try {
            const vehicles = await Vehicle.find();
            res.json(vehicles);
        }catch(error) {
            res.status(500).json({ message: error.message});
        }
    }
}

module.exports = VehicleController;