import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './habitComponents.css';
import DateTime from '../functions/dateandtime';

const HabitComponent = ({ habits, handleClosePopups }) => {
  const [countValue, setCountValue] = useState(0);

  const updateDailyCheck = async (habitId, habitDates, date, event) => {
    event.preventDefault();
  
    try {
      // Find the daily check data for today
      const todayDate = date.toISOString().split('T')[0];
      const todayCheck = habitDates.find((check) => check.date === todayDate);
      
      // Get the count value for today
      const currentCountValue = todayCheck ? todayCheck.count : 0;
      setCountValue(currentCountValue);
  
      // Log the current count value for today
      console.log('Current Count Value for Today:', currentCountValue);
  
      // Check if the count is less than 4
      if (currentCountValue < 4) {
        // Increment the count value
        const updatedCountValue = currentCountValue + 1;
        setCountValue(updatedCountValue);
  
        console.log(updatedCountValue);
  
        // Format date to match db
        const formattedDate = date.toISOString().split('T')[0];
        const updateDailyValue = { date: formattedDate };
  
        console.log(updateDailyValue);
  
        const newDailycheckObj = {
          date: formattedDate,
          count: updatedCountValue,
        };
       
        // Send post request back for today's date count + 1
        await axios.post(`/update-daily-check/${habitId}`, newDailycheckObj);
  
        // Success
        console.log('Habit Completed for the day');
        toast.success('Habit Completed for the day!');
      } else {
        console.log('Max Completions of 4 reached');
        toast.success('Max Completions of 4 reached');
      }
  
      handleClosePopups();
    } catch (error) {
      // Send error for error
      toast.error('Error updating daily check');
      console.error('Error updating daily check:', error.response?.data || error.message);
    }
  };

  
  return (
    <div className="habit-container">
      {habits.map((habit) => (
        <div key={habit._id} className="habit-entry">
          <label className="habit-name" htmlFor={`habit-${habit._id}`}>
            {habit.habit_name} {habit.emoji}
            <br />
            <input
              type="checkbox"
              id={`habit-${habit._id}`}
              className="add-entry-btn"
              onChange={(event) => updateDailyCheck(habit._id, habit.daily_check, new Date(), event)}
            />
          </label>
        </div>
      ))}
    </div>
  );
};
export default HabitComponent;
