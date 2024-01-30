const mongoose = require('mongoose');
const { Schema } = mongoose;

const initializeDailyCheck = () => {
  // Initialize daily_check array with 365 dates starting from '2024-01-01'
  const startDate = new Date('2024-01-01');
  return Array.from({ length: 366 }, (_, index) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + index);

    // Get the date in 'YYYY-MM-DD' format
    const dateString = currentDate.toISOString().split('T')[0];

    return { date: dateString, count: 0 };
  });
};

const HabitSchema = new Schema({
  habit_name: { type: String, required: true },
  emoji: String,
  daily_check: {
    type: [{ date: { type: String }, count: { type: Number, default: 0 } }],
    default: initializeDailyCheck,
  },
});

const Habit = mongoose.model('Habit', HabitSchema);

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  habits: [{ type: Schema.Types.ObjectId, ref: 'Habit' }],
});

const User = mongoose.model('User', userSchema);

module.exports = { User, Habit };
