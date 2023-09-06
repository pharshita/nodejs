import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

export default function Forgot_pass() {
    const navigate = useNavigate()
    // const [email, setEmail] = useState("");
    const [state, setState] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleForgotPassword = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:5000/forgot-password", formData).then((res) => {
            if (res.data == "ok") {
                setState(true)
            }
            else{
                navigate('/')
                setState(false)
            }

        }).catch((err) => {


        })
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div>
            <h2>Forgot Password</h2>
            {
                state
                    ? <form onSubmit={handleForgotPassword}>
                        <div>
                            <label>New Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required
                            />
                        </div>
                        <button type="submit">Password Reset</button>
                    </form>
                    : <form onSubmit={handleForgotPassword}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            name="email"
                            // onChange={(e) => setEmail(e.target.value)}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit">Request Password Reset</button>
                    </form>

            }
        </div>
    )
}
