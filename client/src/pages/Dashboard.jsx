import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { getDailyRandomInt, getRandomInt } from '../functions/DailyrandomNumber.jsx';
import DateTime from '../functions/dateandtime.jsx';
import '../index.css';
import axios from 'axios';
import Popup from '../components/addPopup.jsx';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';



const randInt = getRandomInt(); //for rand frog img on refresh

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [DailyrandNum, setDailyrandNum] = useState(0);  //daily random frog
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleAddPopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }


  useEffect(() => {
    setDailyrandNum(getDailyRandomInt());
  }, []);


  const handleImageClick = () => {
    const image = document.getElementById('rotating-image');
    image.classList.toggle('rotate-360');
  };

  return (
    <div>
      <header className="App-header">
        <div className={`header-content`}>
          <h1>Habbit!</h1>
          <img
            id="rotating-image"
            className={`rotate-360`}
            src={`assets/frog_photos/frog_${DailyrandNum}.png`}
            alt="frog_emoji"
            width="128"
            height="128"
            onClick={handleImageClick}
            title="New frog every day!"
          />
        </div>
       
  
        <p>Daily Habit Tracker</p>
        {!!user && <h2>Welcome back, {user.name}!</h2>}
        <div className="Date and time">
          <hr className="solidline" />
  
          <div className='Habit Tracker Dyanamic'>
            <DateTime />
            <p><u>Habits</u></p>
  
            <input type="checkbox" />
            <label htmlFor="habit1"> Yoga 🧘</label>
            <input type="checkbox" />
            <label htmlFor="habit2">Read 📚</label>
        
  
            <button onClick={toggleAddPopup}>Add Habit +</button>
  
            {isPopupOpen && (
              <Popup handleClose={() => setIsPopupOpen(false)} content={<div><h3>Add Habit</h3></div>} />
            )}
          </div>
          <hr className="solidline" />
          
          <div className='habit calandars'>
            <p><u>Calendar View</u></p>
  
            <p>Yoga 🧘</p>
            <CalendarHeatmap
              key="yoga"
              startDate={new Date('2024-01-01')}
              endDate={new Date('2024-12-31')}
              values={[
                { date: '2024-01-16', count: 12 },
                // ... other data
              ]}
              showWeekdayLabels={true}
              showOutOfRangeDays={true}
            />

            <p>Read 📚</p>
            <CalendarHeatmap
              key="read"
              startDate={new Date('2024-01-01')}
              endDate={new Date('2024-12-31')}
              values={[
                { date: '2024-01-16', count: 12 },
                // ... other data
              ]}
              showWeekdayLabels={true}
              showOutOfRangeDays={true}
            />

            
          </div>
        </div>
      </header>
    </div>
  )};