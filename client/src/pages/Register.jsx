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
        console.log(error)

    }
}

    return (
        <div>
            <form onSubmit={registerUser} type = 'register'>
                 <label>Name</label>
                 <input type = 'text' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                 <br/>
                 <label>Email</label>
                 <input type = 'email'value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                 <br/>
                 <label>Password</label>
                 <input type = 'password'value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                 <br/>
                 <button type = 'submit'>submit</button>
                 <br/>
            </form>
            </div>
    )
}