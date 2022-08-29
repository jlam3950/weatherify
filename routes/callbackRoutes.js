const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const pool = require('../db');
const callbackController = require ('../controllers/callbackController');

router.get('/', callbackController.retrieveToken)

module.exports = router;