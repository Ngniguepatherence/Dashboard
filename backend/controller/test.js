const TestController = {
    GetAll: async (req, res) => {
        res.status(201).json({message: "API WORK SUCCESSFULY"});
    }
}

module.exports = TestController;