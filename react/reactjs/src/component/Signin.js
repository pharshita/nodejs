import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [email, setEmail] = useState("");
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
            navigate("/mainpage");
        }).catch((err) => {
            console.log(err)
        })
    };

    // const handleforgot = (e)=>{
    //     debugger
    //     e.preventDefault();

    //     try {
    //         const response = axios.post("http://localhost:3001/forgot-password", {
    //             // email,
    //         });
    //         debugger
    //         // setMessage(response.data);
    //       } catch (error) {
    //         console.error("Error during forgot password request:", error);
    //         // setMessage("Error during forgot password request.");
    //       }
    // }

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
                <div>
                    <Link to="/forgot_pass"><button>Forgot Password</button></Link>
                </div>
                <button type="submit">Sign In</button>
                <p>Don't Have a Account <Link to="/signup"><span>Sign Up</span></Link></p>
            </form>
        </div>
    );
};

export default Signin;
