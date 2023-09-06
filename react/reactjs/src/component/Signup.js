import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Signup = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search).get('usedata');
  // const userData = searchParams.get('usedata');

  debugger
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:5000/signup", formData).then((res) => {
      alert(res.data)
      navigate("/mainpage")
    }).catch((err) => {
      console.log(err)
    })
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserName:</label>
          <input type='text' name='username' value={formData.username} onChange={handleInputChange} required></input>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>Already Have a Account <Link to="/"><span>SignIn</span></Link></p>
      </form>
    </div>
  );
};

export default Signup;
