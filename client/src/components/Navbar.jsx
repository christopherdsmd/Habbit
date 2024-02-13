import React from "react";
import {Link, Navigate, useNavigate } from "react-router-dom"
import  './Navbar.css'
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '', 
    })

    const signoutUser = async () => {
        try {
          // Make a request to the server to sign out the user
          await axios.post('/signout');
          // After successful signout, clear user data and navigate to the login page
          setData({ email: null, password: null });
          navigate('/login')
          toast.success('Signout Success!');
        } catch (error) {
          // Handle error if signout fails
          console.error('Signout failed:', error);
          toast.error('Signout failed. Please try again.');
        }
      };
      

    return (
        <nav> 
             <div className="logo-container">
            <p className="text">Habbit</p>
            <img src="assets/frog_hole.png" width="30" height="30"></img>
            </div>

            <div className="links">
                <Link to ='/save-the-frogs'>Save the Frogs! </Link> <br/>
                <p> | </p>
                <Link to ='/dashboard' > Home</Link> <br/>
                <button className="signout" onClick={signoutUser} >Signout  </button> <br />
                <Link to ='/login'>Login</Link><br/>
                <Link to ='/register'>Register</Link>
        
                <a href="https://www.linkedin.com/in/christopherpdesmond/"> About </a>
                <button  id="lightDarkButton"> <img src={'assets/Light-Dark mode photos/sun-icon.png'} alt="light mode" width="30" height="30" /> </button>
            </div>
        </nav>
    )
}

