const express = require('express');
const router = express.Router();
const VehicleController = require('../controller/vehicleController');


router.post('/',VehicleController.addVehicle);
router.get('/',VehicleController.getAll);

module.exports = router;