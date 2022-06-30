const express = require('express');
const router = express.Router();

const EmotionsController = require('../controllers/emotions');

router.get('/:emotion', EmotionsController.RetrieveSimilarWords);

module.exports = router;