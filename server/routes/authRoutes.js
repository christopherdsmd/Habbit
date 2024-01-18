const express = require('express');
const router = express.Router();
const cors = require('cors')
const { test,registerUser,loginUser, getProfile, addHabit, signOut } = require('../controllers/authController')
const { User } = require('../models/user.js');

//login/register routes
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/signout', signOut)

//habit routes 
router.post('/add-habit', addHabit)
  

module.exports = router 