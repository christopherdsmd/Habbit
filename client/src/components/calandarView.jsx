import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './calandarView.css';

import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const CalendarView = () => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  
  // Function to generate an array of date objects with a default count
  const generateDateValues = (start, end, defaultCount) => {
    const dateValues = [];
    let currentDate = new Date(start);
  
    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      dateValues.push({ date: dateString, count: defaultCount });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateValues;
  };
  
  const defaultCount = 0;
  
  const values = generateDateValues(startDate, endDate, defaultCount);
  
  console.log(values);
  

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
    <div>
      {habits.map((habit) => (
        <div key={habit._id} className="habit-calendar">
          <h2>{habit.habit_name}{habit.emoji}</h2>
          <CalendarHeatmap
            key={habit._id}
            startDate={new Date('2024-01-01')}
            endDate={new Date('2024-12-31')}
            values={[
              { values },
            ]}
            showWeekdayLabels={true}
            showOutOfRangeDays={true}
          />
        </div>
      ))}
      
    </div>
  );
};

export default CalendarView;
