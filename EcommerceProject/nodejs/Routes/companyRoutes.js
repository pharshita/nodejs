const express = require('express');
const router = express.Router();
const company = require('../Components/company');

router.get('/', company.getAllCompanies);
router.post('/', company.createCompany);

module.exports = router;