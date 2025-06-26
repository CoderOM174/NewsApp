import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Signup = (props) => {
   
    const { mode } = props;
    let navigate = useNavigate();
    
    const [newCredentials, setNewCredentials] = useState({ name: "", email: "", password: "" })
    
    const handelSubmit = async (e) => {

        e.preventDefault();

        const response = await fetch("http://localhost:7000/api/auth/createuser", {
            method: 'Post',

            headers: {
                'Content-Type': 'application/json',

            },

            body: JSON.stringify({ name: newCredentials.name, email: newCredentials.email, password: newCredentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json()
        console.log(json);
        if (json.sucess) {
            localStorage.setItem('token', json.authtoken);  
            localStorage.setItem('name', newCredentials.name); 
            navigate("/login"); 
        }
       

    }
    const onChange = (e) => {
        setNewCredentials({ ...newCredentials, [e.target.name]: e.target.value })

    }
    return (
        <div>
            <div className="container">
                <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control input" id="name" name="name" onChange={onChange} style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control input" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control input" name="password" onChange={onChange} id="password" style={{
                  backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                  color: mode === 'light' ? 'black' : 'white'}}  required/>
                    </div>

                    <button type="submit" className={` btn-${mode==='dark'? 'secondary': 'primary'} btn-color`} >Submit</button>
                </form>
            </div>

        </div>
    )
}

export default Signup

