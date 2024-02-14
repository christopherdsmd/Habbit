import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const [isNavDarkMode, setNavIsDarkMode] = useState(true);
  const navigate = useNavigate();

  const toggleNavbarTheme = () => {
    setNavIsDarkMode(prevMode => !prevMode);
  };

  const signoutUser = async () => {
    try {
      await axios.post('/signout');
      navigate('/login');
      toast.success('You have been signed out');
    } catch (error) {
      console.error('Signout failed:', error);
      toast.error('Signout failed. Please try again.');
    }
  };

  const navigateToSaveTheFrogs = () => {
    navigate('/save-the-frogs');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  const navigateToAbout = () => {
    window.open("https://www.linkedin.com/in/christopherpdesmond/", "_blank");
  };

  const toggleLight_DarkModeTheme = () => {
    toggleTheme(); 
    toggleNavbarTheme();
  };

  return (
    <div>
      <nav className={`Navbar ${isNavDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
        <div className="logo-container">
          <button onClick={() => navigate('/dashboard')}>Habbit</button>
          <img src="assets/frog_hole.png" width="30" height="30" alt="frog logo" />
        </div>

        <div className="signout">
          <button onClick={navigateToSaveTheFrogs}>Save the Frogs! | </button>
          <button className="signout" onClick={signoutUser}>Signout </button> 
          <button onClick={navigateToLogin}>Login </button>
          <button onClick={navigateToRegister}>Register </button> 
          <button onClick={navigateToAbout}>About</button> 
          <button onClick={toggleLight_DarkModeTheme} id="lightDarkButton">
            <img
              src={isNavDarkMode ? "assets/Light-Dark mode photos/sun-icon.png" : "assets/Light-Dark mode photos/moon-icon.png"}
              alt="light mode"
              width="30"
              height="30"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
