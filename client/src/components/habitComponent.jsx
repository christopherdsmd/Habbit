import React from 'react';
import './habitComponents.css';

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
