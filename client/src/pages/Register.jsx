import React from "react"
import { useState } from "react"
import axios from 'axios'
import {toast} from  'react-hot-toast'
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState ({
        name: '',
        email: '',
        password: '',
    })

    const  registerUser = async (event) => {
        event.preventDefault();
        const {name,email,password} = data
        try {
            const {data} = await axios.post('/register', {
                name, email, password
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Account Successfully Registered')
                navigate('/login')
            }
    }   catch(error) {
       

    }
}

    return (
        
        <div>
              <h2>Welcome to Habit! <br/> <br/>
              <img src="\assets\frog_login.png"  width="128"
            height="128"></img> <br/>Register</h2>
            <form onSubmit={registerUser} type = 'register'>
                 <label></label> 
                 <input type = 'text' value={data.name} placeholder="Name" onChange={(e) => setData({...data, name: e.target.value})}/>
                 <br/>
                 <label></label>
                 <input type = 'email'value={data.email}placeholder="Email" onChange={(e) => setData({...data, email: e.target.value})}/>
                 <br/>
                 <label></label>
                 <input type = 'password'value={data.password} placeholder="Password" onChange={(e) => setData({...data, password: e.target.value})}/>
                 <br/>
                 <button type = 'submit'>Create Account</button>
                 <br/>
            </form>
            </div>
    )
}