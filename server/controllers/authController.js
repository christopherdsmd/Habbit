const { response } = require("express");
const { hashPassword, comparePasswords} = require("../helpers/auth")
const jwt = require("jsonwebtoken");

const { User } = require('../models/user');

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

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}