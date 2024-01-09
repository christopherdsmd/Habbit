import React from "react";
import { useState } from "react";
import axios from 'axios'
import {toast} from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: '', 
    })

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
               
                
            }
        } catch (error) {
         
        }
    }

    return (
    <div>    
        <form onSubmit={loginUser} type = 'login'>       
            <label>Email</label>
            <input type = 'email'value={data.email} onChange={(e) => setData({...data, email: e.target.value })}/>
            <br/>
            <label>Password</label>
            <input type = 'password'value={data.password} onChange={(e) => setData({...data, password: e.target.value })}/>
            <br/>
            <button type = 'submit'>Login</button>
            <br/>
        </form> 
    </div>
    )

}