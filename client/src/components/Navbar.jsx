import {Link } from "react-router-dom"
import { lightDarkmode } from '../functions/random_frog_img.js';
import  './Navbar.css'

export default function Navbar() {
    return (
        <nav> 
            <Link to ='/' >Signout</Link> <br/>
            <Link to ='/login' >Login</Link><br/>
            <Link to ='/register' >Register</Link>
            
            <a href="https://www.linkedin.com/in/christopherpdesmond/"> about </a>
                <button id="lightDarkButton" onClick={lightDarkmode}> <img src={'assets/Light-Dark mode photos/sun-icon.png'} alt="light mode" width="30" height="30" /> </button>
        </nav>
    )
}