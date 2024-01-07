import {Link  } from "react-router-dom"

export default function Navbar() {
    return (
        <nav> 
            <Link to ='/' >Home</Link> <br/>
            <Link to ='/login' >login</Link><br/>
            <Link to ='/register' >register</Link>
        </nav>
    )
}