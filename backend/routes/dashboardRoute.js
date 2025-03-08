const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createTable, addColumn, getTables} = require("../controllers/dashboardController")

// Create a new table configuration
router.post('/createTable', authMiddleware,createTable);
// Add dynamic column to an existing configuration
router.post('/addColumn', authMiddleware,addColumn);
router.get('/config',authMiddleware,getTables)

module.exports = router;
