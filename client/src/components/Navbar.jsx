import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme }) {
  const [isNavDarkMode, setNavIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleNavbarTheme = () => {
    console.log('Toggling navbar theme');
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

  const toggleLight_DarkModeTheme = () => {
    console.log('Toggling light/dark mode');
    toggleTheme(); 
    toggleNavbarTheme();
  
  };

  return (
    <div>
    <nav className={`Navbar ${isNavDarkMode ? 'navbar-dark' : 'navbar-light'}`}>

        <div className="logo-container">
          <Link to="/dashboard">Habbit</Link>
          <img src="assets/frog_hole.png" width="30" height="30" alt="frog logo" />
        </div>

        <div className="links">
          <Link to="/save-the-frogs">Save the Frogs! </Link> <br />
          <p> | </p>
          <button className="signout" onClick={signoutUser}>
            Signout 
          </button>{' '}
          <br />
          <Link to="/login">Login</Link>
          <br />
          <Link to="/register">Register</Link>
          <a href="https://www.linkedin.com/in/christopherpdesmond/"> About </a>
          <button onClick={toggleLight_DarkModeTheme} id="lightDarkButton">
            <img
              src={theme === 'dark' ? 'assets/Light-Dark mode photos/sun-icon.png' : 'assets/Light-Dark mode photos/moon-icon.png'}
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
