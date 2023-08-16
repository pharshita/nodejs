import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        axios.post("http://127.0.0.1:5000/signin", formData).then((res) => {
            alert(res.data)
            navigate("/");
        }).catch((err) => {
            console.log(err)
        })
    };

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Signin;
