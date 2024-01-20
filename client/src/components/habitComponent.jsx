import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './habitComponents.css';


const HabitComponent = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('/habits');
        setHabits(response.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    fetchHabits();
  }, []);

  return (
    <div className="habit-container">
      {habits.map((habit) => (
        <div key={habit._id} className="habit-entry">
          <label className="habit-name" htmlFor="habit1">
            {habit.habit_name} {habit.emoji}
          </label>
          <button type="button" className="add-entry-btn">
            {/* Add your button content */}
          </button>
        </div>
      ))}
    </div>
  );
};

export default HabitComponent;
