const express = require('express');
const router = express.Router();

const AuthController = require('../controller/AuthController');


router.post('/login',AuthController.Login);
router.post('/register', AuthController.Register);


module.exports = router;