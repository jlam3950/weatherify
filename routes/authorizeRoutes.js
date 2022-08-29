const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const pool = require('../db');
const authController = require ('../controllers/authorizeController.js');

router.get('/', authController.setAuthParams);

module.exports = router;