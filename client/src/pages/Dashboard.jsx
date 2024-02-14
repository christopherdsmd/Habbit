import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { getDailyRandomInt, getRandomInt } from '../functions/DailyrandomNumber.jsx';
import DateTime from '../functions/dateandtime.jsx';
import '../index.css';
import axios from 'axios';
import Popup from '../components/addPopup.jsx';
import HabitComponent from '../components/habitComponent.jsx';
import CalendarView from '../components/calandarView';
import DeletePopup from '../components/deletePopup.jsx';
import { Tooltip } from 'react-tooltip';

const randInt = getRandomInt(); // for rand frog img on refresh

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [DailyrandNum, setDailyrandNum] = useState(0); // daily random frog
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [DeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const response = await axios.get('/habits');
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const toggleAddPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleDeletePopup = () => {
    setDeletePopupOpen(!DeletePopupOpen);
  };

  useEffect(() => {
    setDailyrandNum(getDailyRandomInt());
  }, []);

  const handleImageClick = () => {
    const image = document.getElementById('rotating-image');
    image.classList.toggle('rotate-360');
  };

  // Callback function to handle closing of pop-ups and fetch habits
  const handleClosePopups = () => {
    setIsPopupOpen(false);
    setDeletePopupOpen(false);
    fetchHabits(); // Call fetchHabits to update habit list
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

        <p style={{ marginBottom: '0' }}>Daily Habit Tracker</p>
        {!!user && <h2 style={{ margin: '0' }}>Welcome back, {user.name}! </h2>}

        <div className="Date and time">
          <hr className="solidline" />
          <div className="Habit Tracker Dyanamic">
            <DateTime />
            <p>
              <u>Habits</u>
            </p>
            <HabitComponent habits={habits} handleClosePopups={handleClosePopups} />
            <button onClick={toggleAddPopup}>Add Habit +</button>

            {isPopupOpen && (
              <Popup setHabits={setHabits} handleClose={handleClosePopups} content={<div><h3>Add Habit</h3></div>} />
            )}
          </div>
          <hr className="solidline" />
          <div className="habit calandars">
            <p>
              <u>Calendar View</u>
            </p>
            <CalendarView habits={habits} />
            <button className="deletebtn" onClick={toggleDeletePopup}>
              Delete Habit
            </button>
          {DeletePopupOpen && (
           <DeletePopup userID={user._id} setHabits={setHabits} setDeletePopupOpen={setDeletePopupOpen} handleClosePopups={handleClosePopups} />
          )}
          </div>
        </div>
      </header>
      <Tooltip effect="solid" place="bottom" id="rotating-image-tooltip" />
    </div>
  );
}
