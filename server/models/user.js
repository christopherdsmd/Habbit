const mongoose = require('mongoose');
const { Schema } = mongoose;

const HabitSchema = new Schema({
    habit_name: { type: String, required: true },
    emoji: String,
    daily_check: { type: [Date], default: [] },
});

const Habit = mongoose.model('Habit', HabitSchema);

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    habits: [{ type: Schema.Types.ObjectId, ref: 'Habit' }] // Reference Habit model
});

const User = mongoose.model('User', userSchema);

module.exports = { User, Habit };
