const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors')
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser');
const emoji = require('emoji');
const app = express();

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch((err) => console.log('Database Not Connected', err))

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))



app.use('/', require('./routes/authRoutes'))

//port 8000 server test 
const port = 8000;
app.listen(port, () => 
    console.log(`Server is running on port ${port}`))

  app.post('/habit', (req,res) => {
    const book = req.body

    Db.collection('habits')
    .insertOne(HabitName)
    .insertOne(emoji)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: "Unable to add habit to database"})
    })

  })