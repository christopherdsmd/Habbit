import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './habitComponents.css';

const HabitComponent = ({ habits, handleClosePopups }) => {
  const [countValues, setCountValues] = useState({});
  const [clickedToday, setClickedToday] = useState(() => {
    // Load clickedToday values from localStorage, or set to empty object if not found
    const savedClickedToday = JSON.parse(localStorage.getItem('clickedToday'));
    return savedClickedToday || {};
  });

  useEffect(() => {
    const checkDateChange = () => {
      // Get the current date
      const today = new Date().toISOString().split('T')[0];
      // Get the last clicked date from localStorage
      const storedDate = localStorage.getItem('lastClickedDate');
      // If the stored date is different from today, reset the clickedToday state and localStorage
      if (storedDate !== today) {
        setClickedToday({});
        localStorage.setItem('clickedToday', JSON.stringify({}));
        localStorage.setItem('lastClickedDate', today);
      }
    };

    // Check for date change when the component mounts
    checkDateChange();

    // Check for date change every minute to handle cases where the date changes while the component is mounted
    const interval = setInterval(checkDateChange, 60000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  const updateDailyCheck = async (habitId, habitDates, date, event) => {
    event.preventDefault();

    try {
      // Find the daily check data for today
      const todayDate = date.toISOString().split('T')[0];
      const todayCheck = habitDates.find((check) => check.date === todayDate);
      
      // Get the count value for today
      const currentCountValue = todayCheck ? todayCheck.count : 0;
      setCountValues(prevState => ({
        ...prevState,
        [habitId]: currentCountValue
      }));

      // Check if the button has been clicked today
      if (!clickedToday[habitId]) {
        // Set clickedToday for this habit to true
        setClickedToday(prevState => ({
          ...prevState,
          [habitId]: true
        }));
        // Save clickedToday value to localStorage
        localStorage.setItem('clickedToday', JSON.stringify({...clickedToday, [habitId]: true}));
      }

      // Log the current count value for today
      console.log('Current Count Value for Today:', currentCountValue);

      // Check if the count is less than 4
      if (currentCountValue < 4) {
        // Increment the count value
        const updatedCountValue = currentCountValue + 1;
        setCountValues(prevState => ({
          ...prevState,
          [habitId]: updatedCountValue
        }));

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
            <button
              id={`habit-${habit._id}`}
              className={`add-entry-btn ${clickedToday[habit._id] ? 'clicked-today' : ''}`}
              onClick={(event) => updateDailyCheck(habit._id, habit.daily_check, new Date(), event)}
            >
              {clickedToday[habit._id] && <span className="checkmark-animation">✓</span>}
            </button>
          </label>
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;
