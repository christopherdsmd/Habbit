import {Link } from "react-router-dom"
import { lightDarkmode } from '../functions/random_frog_img.js';
import  './Navbar.css'

export default function Navbar() {
    return (
        <nav> 
             <div className="logo-container">
            <p className="text">Habbit</p>
            <img src="assets/frog_hole.png" width="30" height="30"></img>
            </div>

            <div className="links">
                <Link to ='/'>Signout</Link> <br/>
                <Link to ='/login'>Login</Link><br/>
                <Link to ='/register'>Register</Link>
        
                <a href="https://www.linkedin.com/in/christopherpdesmond/"> About </a>
                <button id="lightDarkButton" onClick={lightDarkmode}> <img src={'assets/Light-Dark mode photos/sun-icon.png'} alt="light mode" width="30" height="30" /> </button>
            </div>
        </nav>
    )
}