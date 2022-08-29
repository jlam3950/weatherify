const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const pool = require('../db');
const searchController = require ('../controllers/searchController');

router.get('/', searchController.search_addUser); 
router.post('/', searchController.search_insertFavorite);

module.exports = router;