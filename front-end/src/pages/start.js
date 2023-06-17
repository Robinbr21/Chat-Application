import React, { useState } from "react";
// import axios from "axios";
import './css/start.css'
import APIConfiguration from "../api/api";
import { useNavigate } from 'react-router-dom'


function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [submitError, setSubmitError] = useState(false);
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIConfiguration.API.post("/login", credentials);
      console.log(response.data.status); // Handle the response data
      if (response.data.status) {
        navigate('/chat')
      } else {
        setSubmitError(true);
        alert("Invalid User ID or Passowrd")
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data); // Handle the error response data
        console.log(error.response.status); // Handle the error status code
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request); // Handle the request object
      } else {
        // Something else happened while setting up the request
        console.log("Error", error.message); // Handle the error message
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await APIConfiguration.API.post("/login/create", credentials)
      console.log(response.data);
      alert(response.data.message)
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(error.response.data); // Handle the error response data
        console.log(error.response.status); // Handle the error status code
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request); // Handle the request object
      } else {
        // Something else happened while setting up the request
        console.log("Error", error.message); // Handle the error message
      }
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      {/* <h2>Becka Beckaa Login ...!!</h2><br /> */}
      <label>User ID</label>
      <input type={submitError ? "text" : "text1"} placeholder="Enter Username" name="username" value={credentials.username} onChange={handleChange} required />
      <label>Password</label>
      <input type={submitError ? "password" : "password1"} placeholder="Enter Password" name="password" value={credentials.password} onChange={handleChange} required />
      <button onClick={handleSubmit} type="submit">Login</button>
      <button onClick={handleCreate} type="submit">Create Account</button>
    </div>
  )
}

export default Login;