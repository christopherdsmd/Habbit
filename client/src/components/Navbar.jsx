import React from "react";
import {Link } from "react-router-dom"
import  './Navbar.css'

export default function Navbar() {


    return (
        <nav> 
             <div className="logo-container">
            <p className="text">Habbit</p>
            <img src="assets/frog_hole.png" width="30" height="30"></img>
            </div>

            <div className="links">
                <Link to ='/save-the-frogs'>Save the Frogs! </Link> <br/>
                <p> | </p>
                <Link to ='/' >Signout</Link> <br/>
                <Link to ='/dashboard' >Home</Link> <br/>
                <Link to ='/login'>Login</Link><br/>
                <Link to ='/register'>Register</Link>
        
                <a href="https://www.linkedin.com/in/christopherpdesmond/"> About </a>
                <button id="lightDarkButton"> <img src={'assets/Light-Dark mode photos/sun-icon.png'} alt="light mode" width="30" height="30" /> </button>
            </div>
        </nav>
    )
}

