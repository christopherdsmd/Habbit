import React from 'react';
import './habitComponents.css';
import DateTime from '../functions/dateandtime';

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
      // Update the habits state with the updated data
      props.setHabits(data.user.habits);

      console.log('Habit Completed for the day:', data);
      toast.success('Habit added successfully');
      props.handleClose();
    }
  } catch (error) {
    toast.error('Error updating daily check');
    console.error('Error updating daily check:', error.response?.data || error.message);
  }
};




const HabitComponent = ({ habits }) => {
  return (
    <div className="habit-container">
      {habits.map((habit) => (
        <div key={habit._id} className="habit-entry">
          <label className="habit-name" htmlFor="habit1">
            {habit.habit_name} {habit.emoji}
            <br />
            <button type="button" className="add-entry-btn"></button>
          </label>
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;
