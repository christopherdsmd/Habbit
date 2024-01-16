const mongoose = require('mongoose');
const { Schema } = mongoose;

const HabitSchema = new Schema({
    habit_name: { type: String, required: true },
    emoji: String,
    daily_check: { type: [Date], default: [] },
});

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    habits: [HabitSchema] // Embed HabitSchema directly
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
