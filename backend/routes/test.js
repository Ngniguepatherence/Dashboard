const express = require('express');
const TestController = require('../controller/test');
const router = express.Router();

router.get('/',TestController.GetAll);


module.exports = router;