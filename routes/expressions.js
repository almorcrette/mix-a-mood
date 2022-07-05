const express = require('express')
const router = express.Router();

const ExpressionsController = require('../controllers/expressions');

router.get('/', ExpressionsController.Index);

module.exports = router;