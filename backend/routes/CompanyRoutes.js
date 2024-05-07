const express =require('express');
const router = express.Router();
const company = require('../controller/companyController');

router.post('/', company.addCompany);
router.get('/',company.getAll);



module.exports = router;