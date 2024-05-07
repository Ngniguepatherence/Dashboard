const Visitor = require('../model/visitor');

const VisitorController = {
    addVehicle: async (req,res) => {
        
        const {name, address, purpose, time_visited} = req.body;
        try {
            const newVisitor = new Visitor({
            name: name, Address: address, Purpose: purpose, time_visited: time_visited
            });
            await newVisitor.save();
            res.status(201).json(newVisitor);
        }
        catch(error) {
            res.status(500).json({ message: error.message} );
        }
    },

    getAll: async(req,res) => {
        try {
            const visitors = await Visitor.find();
            res.json(visitors);
        }catch(error) {
            res.status(500).json({ message: error.message});
        }
    }
}

module.exports = VisitorController;