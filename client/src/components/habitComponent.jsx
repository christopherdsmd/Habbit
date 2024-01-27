import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './habitComponents.css';

const HabitComponent = ({ setHabits }) => {
  const [localHabits, setLocalHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('/habits');
        setLocalHabits(response.data);
        setHabits(response.data); // Update the habits in the parent component
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, [setHabits]);

  return (
    <div className="habit-container">
      {localHabits.map((habit) => (
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
