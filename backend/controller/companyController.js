const company = require('../model/companies');


const CompanyController = {
    addCompany: async (req,res) => {

        try {
            const { name, email, password} = req.body;
            const newCompany = new company({
                name: name, email:email, password: password
            });
            await newCompany.save();
            res.json(newCompany);
        }
        catch(error) {
            res.status(500).json({ message: error.message} );
        }
    },

    getAll: async (req,res) => {
        try {
            const cmp = await company.find();
            res.json(cmp);
        }
        catch(error) {

            res.status(500).json({ message: error.message});
        }
    }
};

module.exports = CompanyController;