import React from "react";
import { useState } from "react";
import axios from 'axios'
import {toast} from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '', 
    })

    const loginAsGuest = async (event) => {
        event.preventDefault()

        alert('Warning: Guest accounts are unable to save data');


        const guestData =  {
        email: 'guest@guest',
        password: 'guestPassword123'}

        try {
            // Send login request with guest account credentials
            await axios.post('/login', guestData );
            

            //if login error 
            if(data.error) {
                toast.error(data.error)     
            } else {
                setData({});
                await axios.delete(`/habits/guest`);
                navigate('/dashboard')  //send user to dashboard on successful login

                toast.success('Guest Login')

                
            }
        } catch (error) {
        }
    }


    const loginUser = async(event) => {
     event.preventDefault()
        const {email,password} = data
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            }); 
            //if login error 
            if(data.error) {
                toast.error(data.error)     
            } else {
                setData({});
                navigate('/dashboard')  //send user to dashboard on successful login
                toast.success('Login Success!')
            }
        } catch (error) {
        }
    }

    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to the Register page
    };

    return (
        <div className="form-box">
            <form onSubmit={loginUser} type="login">
                <h2>Welcome to Habit! <br /><br />
                    <img src="\assets\frog_login.png" width="128" height="128" alt="Frog_login" /> <br />Login</h2>
                <label></label>
                <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" /><br />
                <label></label>
                <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" /> <br />
    
    
                <button type="submit">Login</button>
            </form>
            <br /> <br /> <br />
            <hr className="solidline" />
            <h3>Don't have an Account? </h3>
            <button className="Register-button" onClick={handleRegisterClick}>Register</button> 
            
            <button type="button" className="Guest-button" onClick={loginAsGuest}>Continue as Guest</button>
    
        </div>
    );
    }    