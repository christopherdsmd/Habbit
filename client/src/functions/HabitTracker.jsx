import React from 'react';
import axios from 'axios';

const HabitComponent = () => {

    const addHabit = async (habitData) => {
        try {
            const response = await axios.post('/api/habits/add-habit', habitData);
            console.log(response.data); // Handle the response as needed
          } catch (error) {
            console.error('Error adding habit:', error);
          }
        };
    
        const deleteHabit = async (habitId) => {
            try {
              const response = await axios.post('/api/habits/delete-habit', { habitId });
              console.log(response.data); // Handle the response as needed
            } catch (error) {
              console.error('Error deleting habit:', error);
            }
          };
};

export default HabitComponent;