import React, { useState } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import SaveTheFrogs from './pages/save-the-frogs'


// Set up axios defaults
axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // State to track current theme

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode); // Toggle theme
    document.body.classList.toggle('app-dark', !isDarkMode);
    document.body.classList.toggle('app-light', isDarkMode);
  };

  return (
    <UserContextProvider>
      <Navbar toggleTheme={toggleTheme} />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/save-the-frogs' element={<SaveTheFrogs />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App;
