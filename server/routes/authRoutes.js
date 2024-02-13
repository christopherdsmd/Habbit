const express = require('express');
const router = express.Router();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const { test,registerUser,loginUser, getProfile, addHabit, getHabits, deleteHabit, signoutUser,guestDelete } = require('../controllers/authController')
const { User, Habit } = require('../models/user.js');
const { ObjectId } = require('mongoose').Types;

//login/register routes
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)


//login sys routes 
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/signout', signoutUser)
router.delete('/habits/guest', guestDelete)


//habit routes 
//add new habit
router.post('/add-habit', addHabit)

//existing delete - requires habitId and user ID
router.delete('/delete-habit/:habitId/:userID', async (req, res) => {
    const { habitId } = req.params;

    try {
        const result = await deleteHabit(habitId, req, res);
        res.json(result);
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





//get habits!
router.get('/habits', async (req, res) => {
    try {
        const token = req.cookies.token;
        
        // Ensure that the token is present
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized: Missing token' });
        }

        // Decode the token to get user ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const habits = await getHabits(userId);
        res.json(habits);
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/habits/:habitID', async (req, res) => {
    const { habitId } = req.params;
  
    try {
      // Validate that habitId is a valid ObjectId
      if (!ObjectId.isValid(habitId)) {
        return res.status(400).json({ error: 'Invalid habitId' });
      }
  
      // Find the habit by ID
      const habit = await Habit.findById(habitId);
  
      if (!habit) {
        return res.status(404).json({ error: 'Habit not found' });
      }
      // Ensure that habit.dailyCheck is an array or initialize it as an empty array
      if (!Array.isArray(habit.dailyCheck)) {
        habit.dailyCheck = [];
      }
  
      // Get today's date in the format yyyy-mm-dd
      const today = new Date().toISOString().split('T')[0];
  
      // Find the daily check data for today
      const todayCheck = habit.dailyCheck.find((check) => check.date === today);
  
      // If todayCheck is found, return its count value, otherwise, return 0
      const countValue = todayCheck ? todayCheck.count : 0;
  
      res.json({ count: countValue });
    } catch (error) {
      console.error('Error fetching habit data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// update daily Check calendar view data
router.post('/update-daily-check/:habitId', async (req, res) => {
    const { habitId } = req.params;
    const newDailycheckObj = req.body; // Get newDailycheckObj from the request body

    try {
        // Find the habit by ID
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        // Find the index of the matching date in the dailyCheck array
        const index = habit.daily_check.findIndex((check) => check.date === newDailycheckObj.date);

        if (index !== -1) {
            // If the date is found, update the count
            habit.daily_check[index].count = newDailycheckObj.count;
        } else {
            // If the date is not found, push the new entry
            habit.daily_check.push(newDailycheckObj);
        }

        // Save the updated habit
        await habit.save();

        // Respond with the updated habit data
        res.json({ user: { habits: habit.daily_check } });
    } catch (error) {
        console.error('Error updating daily check:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
  



module.exports = router;

