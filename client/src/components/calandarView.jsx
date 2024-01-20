import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './calandarView.css';


const calandarView = () => {
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
    <CalendarHeatmap
              key=""
              startDate={new Date('2024-01-01')}
              endDate={new Date('2024-12-31')}
              values={[
                { date: '2024-01-16', count: 12 },
                // ... other data
              ]}
              showWeekdayLabels={true}
              showOutOfRangeDays={true}
            />
);}

export default calandarView;