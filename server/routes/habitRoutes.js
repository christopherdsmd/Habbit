const express = require('express');
const router = express.Router();
const { addHabit, deleteHabit } = require('../controllers/habitController');

// Add habit
router.post('/add-habit', addHabit);

// Delete habit
router.post('/delete-habit', deleteHabit);

module.exports = router;