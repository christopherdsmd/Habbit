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

      // Increment the count value
      const updatedCountValue = currentCountValue + 1;
      setCountValue(updatedCountValue);

      console.log(updatedCountValue)

      // Format date to match db
      const formattedDate = date.toISOString().split('T')[0];
      const updateDailyValue = { date: formattedDate };

      console.log(updateDailyValue)

      const newDailycheckObj = {
        date: formattedDate,
        count: updatedCountValue,
      };
     
      //send post request back for todays date count + 1
      await axios.post(`/update-daily-check/${habitId}`, newDailycheckObj);


      // Success
      console.log('Habit Completed for the day');

      toast.success('Habit Completed for the day!');
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
          <label className="habit-name" htmlFor="habit1">
            {habit.habit_name} {habit.emoji}
            <br />
            <button
              type="button"
              className="add-entry-btn"
              onClick={(event) => updateDailyCheck(habit._id, habit.daily_check, new Date(), event)}
            ></button>

          </label>
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;
