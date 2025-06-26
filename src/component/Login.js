import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let {mode} = props;
  let navigate = useNavigate();
  
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      
      const json = await response.json();
      console.log("Response from server:", json); 

      if (json.sucess) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("email", credentials.email);
        
        const userName = localStorage.getItem("name");
        props.showAlert(`Welcome to TRENDY NEWS, ${userName}`, "success"); 
        navigate("/"); 
      } else {
        console.error("Login failed:", json.error); 
        props.showAlert("Error: Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Login error:", error); 
      props.showAlert("Error: Something went wrong. Please try again later.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control input" 
              value={credentials.email} 
              onChange={onChange} 
              id="email" 
              name="email" 
              aria-describedby="emailHelp"
              style={{
                backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                color: mode === 'light' ? 'black' : 'white'
              }} 
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control input" 
              value={credentials.password} 
              onChange={onChange} 
              name="password" 
              id="password"
              style={{
                backgroundColor: mode === 'light' ? 'white' : '#3b4044',
                color: mode === 'light' ? 'black' : 'white'
              }} 
            />
          </div>
          <button type="submit" className={`btn-${mode === 'dark' ? 'secondary' : 'primary'} btn-color`}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
