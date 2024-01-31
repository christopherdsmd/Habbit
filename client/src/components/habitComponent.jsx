import React from 'react';
import axios from 'axios'; 
import toast  from "react-hot-toast"; 
import './habitComponents.css';
import DateTime from '../functions/dateandtime';

const HabitComponent = ({ habits, handleClosePopups }) => {
  const updateDailyCheck = async (habitID, date, event) => {
    event.preventDefault();

    // Assuming date is in the format 'YYYY-MM-DD'
    const formattedDate = date.toISOString().split('T')[0];

    const updateDailyValue = { date: formattedDate };

    try {
      const { data } = await axios.post(`/update-daily-check/${habitID}`, updateDailyValue);

      if (data.error) {
        toast.error(data.error);
      } else {
        
        console.log('Habit Completed for the day:', data);
        toast.success(`Habit Completed for the day!`);
   
        handleClosePopups();
      }
    } catch (error) {
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
            {/* Pass the necessary arguments to updateDailyCheck in the onClick handler */}
            <button type="button" className="add-entry-btn" onClick={(event) => updateDailyCheck(habit._id, new Date(), event)}></button>
          </label>
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;
