const express = require('express');
const router = express.Router();
const VisitorController = require('../controller/visitorController');


router.post('/',VisitorController.addVehicle);
router.get('/',VisitorController.getAll);

module.exports = router;