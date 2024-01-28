const { response } = require("express");
const { hashPassword, comparePasswords} = require("../helpers/auth")
const jwt = require("jsonwebtoken");
const { User, Habit } = require('../models/user');
const { ObjectId } = require('mongoose').Types;

//middleware
const authenticateUser = require('../helpers/auth');

const emoji = require("emoji");

const test = (req,res) => {
    res.json('test is working')
}

//register endpoint
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;
        // Check is name was entered 
        if(!name) {
            return res.json({
                error: 'Name is required'
            })
        };
        //check if password is good 
        if(!password || password.length < 6) {
            return res.json({
                 error: 'Password is required and should be atleast 6 characters long'
        })
    };
    //check email
    const exist = await User.findOne({email});
    if(exist) {
        return res.json({
            error: 'Email already in use'
        })
    }   

    const hashedPassword = await hashPassword(password)
        //create user in database 
        const user = await User.create({
            name,
            email, 
            password: hashedPassword,
        });

        return res.json(user)
    } catch(error) {
        console.log(error)
    } 
}

//login endpoint
const loginUser = async (req,res) => {
try {
    const {email, password} = req.body;

    //check if user exist
    const user = await User.findOne({email});
    if(!user) { 
        return res.json ({
        error: 'No user found'
      })
    
    }

    //check if passwords match
    const match = await comparePasswords(password, user.password)
    if(match) {
       jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err,token) => {
        if(err) throw err;
        res.cookie('token', token).json(user)
       })
    } 
    if (!match) { 
        res.json({
            error: "Passwords do not match"
        })
    }
}catch(error){
    console.log(error)
 }
}
 
//verify json webtoken
const getProfile = (req,res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else { 
        res.json(null)
    }
    }

    const signOut = (req, res) => {
        res.clearCookie('token');
      
        res.json({ message: 'Logged out successfully' });
      };

      

    const addHabit = async (req, res) => {
        try {
            // Destructure habitName and selectedEmoji from req.body
            const { habitName, emoji: selectedEmoji } = req.body;
    
            // Check if habitName and selectedEmoji are entered
            if (!habitName || !selectedEmoji) {
                return res.status(400).json({
                    error: 'Habit Name and Emoji are required',
                });
            }
    
            // Get the user's ID from the decoded JWT token
            const token = req.cookies.token;
    
            if (!token) {
                return res.status(401).json({
                    error: 'Unauthorized: Missing token',
                });
            }
    
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.id;


            // Create a new habit using the Habit model
            const newHabit = new Habit({
                userId: userId,
                habit_name: habitName,
                emoji: selectedEmoji,
            });
    
            // Save the new habit
            await newHabit.save();
    
            // Update the user's habits array by pushing the new habit's ID
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { habits: newHabit._id } },
                { new: true }
            );
    
            return res.status(201).json({ message: 'Habit added successfully', user: updatedUser });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    };


 // authController.js

const getHabits = async (userId) => {
    try {
      // Find the user with the specified userId and populate the 'habits' field
      const user = await User.findById(userId).populate('habits');
  
      if (!user) {
        // Handle the case where the user is not found
        console.error('User not found');
        return [];
      }
  
      // Access the populated habits array from the user document
      const habits = user.habits;
      
      return habits;
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw new Error('Internal Server Error');
    }
  };
  
  const deleteHabit = async (habitId, req, res) => {
    try {
        // Check if habitId is a valid ObjectId
        if (!ObjectId.isValid(habitId)) {
            console.log('Invalid habitId:', habitId);
            return { error: 'Invalid habitId' };
        }

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                error: 'Unauthorized: Missing token',
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        console.log('Received request to delete habit:', habitId, 'for user:', userId);

        // Find and delete the habit based on habitId
        let deletedHabit;
        try {
            deletedHabit = await Habit.findByIdAndDelete(habitId);

            if (!deletedHabit) {
                console.log('Habit not found for deletion:', habitId);
                return { error: 'Habit not found' };
            }
        } catch (error) {
            throw new Error('Internal Server Error');
        }

        // Remove the habitId from the user's habits array
        await User.findByIdAndUpdate(userId, { $pull: { habits: habitId } });

        // Log the deleted habit and updated user for debugging
        console.log('Deleted Habit:', deletedHabit);
        const updatedUser = await User.findById(userId).populate('habits');
        console.log('Updated User:', updatedUser);

        return { message: 'Habit deleted successfully', deletedHabit, updatedUser };
    } catch (error) {
        console.error('Error deleting habit:', error);
        throw new Error('Internal Server Error');
    }
};



    
module.exports = {
    test ,
    registerUser,
    loginUser,
    getProfile,
    addHabit,
    getHabits,
    deleteHabit,
}